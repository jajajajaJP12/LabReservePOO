import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, addDoc, onSnapshot, query, orderBy, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import './App.css';

// ==================================================
// SISTEMA DE PERMISOS POR ROL
// ==================================================
const PERMISOS = {
  admin: {
    gestionAulas: true,
    gestionEquipos: true,
    verReservas: true,
    verSolicitudes: true,
    aprobarSolicitudes: true,
    reservarEquipos: true,
    solicitarEquipos: false
  },
  maestro: {
    gestionAulas: false,
    gestionEquipos: false,
    verReservas: true,
    verSolicitudes: false,
    aprobarSolicitudes: false,
    reservarEquipos: true,
    solicitarEquipos: false
  },
  alumno: {
    gestionAulas: false,
    gestionEquipos: false,
    verReservas: false,
    verSolicitudes: false,
    aprobarSolicitudes: false,
    reservarEquipos: false,
    solicitarEquipos: true
  }
};

function App() {
  // --- ESTADOS DE AUTENTICACIÓN ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('alumno');
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info');
  const [esRegistro, setEsRegistro] = useState(false);
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  // --- ESTADOS DE NAVEGACIÓN ---
  const [vistaActual, setVistaActual] = useState('inicio');
  
  // --- ESTADOS DE DATOS ---
  const [listaEquipos, setListaEquipos] = useState([]);
  const [listaAulas, setListaAulas] = useState([]);
  const [listaReservas, setListaReservas] = useState([]);
  const [listaSolicitudes, setListaSolicitudes] = useState([]);
  
  // --- ESTADOS DE FORMULARIO ---
  const [showFormAula, setShowFormAula] = useState(false);
  const [showFormReserva, setShowFormReserva] = useState(false);
  const [showFormSolicitud, setShowFormSolicitud] = useState(false);
  const [aulaSeleccionada, setAulaSeleccionada] = useState(null);

  // --- EFECTO: Cargar datos en tiempo real ---
  useEffect(() => {
    if (usuarioActivo) {
      // Cargar equipos
      const qEquipos = query(collection(db, "equipos"), orderBy("fecha", "desc"));
      const unsub1 = onSnapshot(qEquipos, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListaEquipos(docs);
      });

      // Cargar aulas
      const qAulas = query(collection(db, "aulas"), orderBy("nombre"));
      const unsub2 = onSnapshot(qAulas, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListaAulas(docs);
      });

      // Cargar reservas
      const qReservas = query(collection(db, "reservas"), orderBy("fecha", "desc"));
      const unsub3 = onSnapshot(qReservas, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListaReservas(docs);
      });

      // Cargar solicitudes
      const qSolicitudes = query(collection(db, "solicitudes"), orderBy("fechaSolicitud", "desc"));
      const unsub4 = onSnapshot(qSolicitudes, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListaSolicitudes(docs);
      });

      return () => {
        unsub1();
        unsub2();
        unsub3();
        unsub4();
      };
    }
  }, [usuarioActivo]);

  // --- FUNCIONES DE FIREBASE ---
  const mostrarMensaje = (texto, tipo = 'success') => {
    setMensaje(texto);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(''), 3000);
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setMensaje('Creando cuenta...');
    setTipoMensaje('info');
    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "usuarios", credencial.user.uid), { 
        correo: email, 
        rol: rolSeleccionado,
        fechaRegistro: new Date().toISOString()
      });
      setUsuarioActivo({ uid: credencial.user.uid, email: credencial.user.email, rol: rolSeleccionado });
      setEmail('');
      setPassword('');
      setMensaje('');
    } catch (error) { 
      mostrarMensaje('Error: ' + error.message, 'error');
    }
  };

  const manejarIngreso = async (e) => {
    e.preventDefault();
    setMensaje('Ingresando...');
    setTipoMensaje('info');
    try {
      const credencial = await signInWithEmailAndPassword(auth, email, password);
      const docSnap = await getDoc(doc(db, "usuarios", credencial.user.uid));
      const rolUsuario = docSnap.exists() ? docSnap.data().rol : 'alumno';
      setUsuarioActivo({ uid: credencial.user.uid, email: credencial.user.email, rol: rolUsuario });
      setEmail('');
      setPassword('');
      setMensaje('');
    } catch (error) { 
      mostrarMensaje('Error: Credenciales incorrectas.', 'error');
    }
  };

  const cerrarSesion = () => {
    signOut(auth).then(() => { 
      setUsuarioActivo(null); 
      setVistaActual('inicio');
      setEmail('');
      setPassword('');
    });
  };

  // --- FUNCIONES DE AULAS ---
  const guardarNuevaAula = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const capacidad = parseInt(e.target.capacidad.value);
    const equipo = e.target.equipo.value;
    try {
      await addDoc(collection(db, "aulas"), {
        nombre,
        capacidad,
        equipoDisponible: equipo,
        estado: 'Disponible',
        creada: new Date().toISOString()
      });
      e.target.reset();
      mostrarMensaje('Aula registrada correctamente', 'success');
      setShowFormAula(false);
    } catch (error) { 
      mostrarMensaje('Error al registrar aula: ' + error.message, 'error');
    }
  };

  const eliminarAula = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta aula?')) {
      try {
        await deleteDoc(doc(db, "aulas", id));
        mostrarMensaje('Aula eliminada', 'success');
      } catch (error) { 
        mostrarMensaje('Error al eliminar aula', 'error');
      }
    }
  };

  // --- FUNCIONES DE EQUIPOS ---
  const guardarNuevoEquipo = async (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const categoria = e.target.categoria.value;
    const estado = e.target.estado.value;
    const cantidad = parseInt(e.target.cantidad?.value || 1);
    try {
      await addDoc(collection(db, "equipos"), {
        nombre, 
        categoria, 
        estado,
        cantidad,
        registradoPor: usuarioActivo.email,
        fecha: new Date().toISOString()
      });
      e.target.reset();
      mostrarMensaje('Equipo registrado correctamente', 'success');
    } catch (error) { 
      mostrarMensaje('Error al registrar equipo', 'error');
    }
  };

  // --- FUNCIONES DE RESERVAS ---
  const guardarReserva = async (e) => {
    e.preventDefault();
    const aula = e.target.aula.value;
    const fecha = e.target.fecha.value;
    const horaInicio = e.target.horaInicio.value;
    const horaFin = e.target.horaFin.value;
    const descripcion = e.target.descripcion.value;

    try {
      const aulaSeleccionada = listaAulas.find(a => a.id === aula);
      await addDoc(collection(db, "reservas"), {
        aulaId: aula,
        aulaNombre: aulaSeleccionada?.nombre,
        aulaCapacidad: aulaSeleccionada?.capacidad,
        aulaEquipo: aulaSeleccionada?.equipoDisponible,
        fecha,
        horaInicio,
        horaFin,
        descripcion,
        reservadoPor: usuarioActivo.email,
        nombreReservador: usuarioActivo.email.split('@')[0],
        rol: usuarioActivo.rol,
        estado: 'Confirmada',
        fechaReserva: new Date().toISOString()
      });
      e.target.reset();
      mostrarMensaje('Aula reservada correctamente', 'success');
      setShowFormReserva(false);
    } catch (error) { 
      mostrarMensaje('Error al reservar aula', 'error');
    }
  };

  const cancelarReserva = async (id) => {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      try {
        await deleteDoc(doc(db, "reservas", id));
        mostrarMensaje('Reserva cancelada', 'success');
      } catch (error) { 
        mostrarMensaje('Error al cancelar reserva', 'error');
      }
    }
  };

  // --- FUNCIONES DE SOLICITUDES ---
  const crearSolicitud = async (e) => {
    e.preventDefault();
    const tipo = e.target.tipo.value;
    const descripcion = e.target.descripcion.value;
    const fechaSolicitada = e.target.fechaSolicitada?.value || '';

    try {
      await addDoc(collection(db, "solicitudes"), {
        tipo,
        descripcion,
        fechaSolicitada,
        solicitadoPor: usuarioActivo.email,
        rol: usuarioActivo.rol,
        estado: 'Pendiente',
        fechaSolicitud: new Date().toISOString()
      });
      e.target.reset();
      mostrarMensaje('Solicitud enviada. Espera la aprobación del administrador.', 'success');
      setShowFormSolicitud(false);
    } catch (error) { 
      mostrarMensaje('Error al crear solicitud', 'error');
    }
  };

  const aprobarSolicitud = async (id) => {
    try {
      await updateDoc(doc(db, "solicitudes", id), {
        estado: 'Aprobada',
        fechaAprobacion: new Date().toISOString()
      });
      mostrarMensaje('Solicitud aprobada', 'success');
    } catch (error) { 
      mostrarMensaje('Error al aprobar solicitud', 'error');
    }
  };

  const rechazarSolicitud = async (id) => {
    try {
      await updateDoc(doc(db, "solicitudes", id), {
        estado: 'Rechazada',
        fechaRechazo: new Date().toISOString()
      });
      mostrarMensaje('Solicitud rechazada', 'success');
    } catch (error) { 
      mostrarMensaje('Error al rechazar solicitud', 'error');
    }
  };

  // ====================================================
  // VISTA DEL DASHBOARD
  // ====================================================
  if (usuarioActivo) {
    const permisos = PERMISOS[usuarioActivo.rol];
    const rolBadgeClass = {
      admin: 'badge-admin',
      maestro: 'badge-maestro',
      alumno: 'badge-alumno'
    }[usuarioActivo.rol];

    return (
      <div className="dashboard-layout">
        <aside className="sidebar">
          <div className="sidebar-header">
            <h2>🏫 Lab Reserva</h2>
            <div className={`role-badge ${rolBadgeClass}`}>
              {usuarioActivo.rol.toUpperCase()}
            </div>
          </div>
          <nav className="sidebar-menu">
            <button 
              className={`menu-btn ${vistaActual === 'inicio' ? 'activo' : ''}`} 
              onClick={() => setVistaActual('inicio')}
            >
              📊 Inicio
            </button>
            
            {permisos.gestionAulas && (
              <button 
                className={`menu-btn ${vistaActual === 'aulas' ? 'activo' : ''}`} 
                onClick={() => setVistaActual('aulas')}
              >
                🚪 Aulas
              </button>
            )}
            
            {permisos.gestionEquipos && (
              <button 
                className={`menu-btn ${vistaActual === 'equipos' ? 'activo' : ''}`} 
                onClick={() => setVistaActual('equipos')}
              >
                🥽 Inventario
              </button>
            )}
            
            {permisos.verReservas && (
              <button 
                className={`menu-btn ${vistaActual === 'reservas' ? 'activo' : ''}`} 
                onClick={() => setVistaActual('reservas')}
              >
                📅 Mis Reservas
              </button>
            )}
            
            {permisos.solicitarEquipos && (
              <button 
                className={`menu-btn ${vistaActual === 'solicitudes' ? 'activo' : ''}`} 
                onClick={() => setVistaActual('solicitudes')}
              >
                📝 Mis Solicitudes
              </button>
            )}
            
            {permisos.verSolicitudes && (
              <button 
                className={`menu-btn ${vistaActual === 'solicitudesAdmin' ? 'activo' : ''}`} 
                onClick={() => setVistaActual('solicitudesAdmin')}
              >
                ✅ Solicitudes ({listaSolicitudes.filter(s => s.estado === 'Pendiente').length})
              </button>
            )}

            {permisos.verReservas && (
              <button 
                className={`menu-btn ${vistaActual === 'reservasAdmin' ? 'activo' : ''}`} 
                onClick={() => setVistaActual('reservasAdmin')}
              >
                📅 Todas las Reservas
              </button>
            )}

            <div className="sidebar-footer">
              <p>{usuarioActivo.email}</p>
              <button className="btn-logout" onClick={cerrarSesion}>Cerrar Sesión</button>
            </div>
          </nav>
        </aside>

        <main className="main-content">
          <header className="topbar">
            <div className="topbar-title">
              <h1 id="page-title">Inicio</h1>
            </div>
            <div className="topbar-info">
              <span>Sistema de Reservas del Laboratorio</span>
            </div>
          </header>

          {mensaje && (
            <div className={`alert alert-${tipoMensaje}`}>
              {mensaje}
            </div>
          )}

          <div className="content-area">
            {/* ============ VISTA INICIO ============ */}
            {vistaActual === 'inicio' && (
              <div>
                <h2>Bienvenido, {usuarioActivo.email.split('@')[0]}</h2>
                <div className="cards-grid">
                  <div className="card">
                    <div className="card-icon">🥽</div>
                    <h4>Equipos Disponibles</h4>
                    <p>{listaEquipos.filter(e => e.estado === 'Disponible').length}</p>
                  </div>
                  <div className="card">
                    <div className="card-icon">🚪</div>
                    <h4>Aulas Disponibles</h4>
                    <p>{listaAulas.filter(a => a.estado === 'Disponible').length}</p>
                  </div>
                  <div className="card">
                    <div className="card-icon">📅</div>
                    <h4>Reservas Activas</h4>
                    <p>{listaReservas.filter(r => r.estado === 'Confirmada').length}</p>
                  </div>
                  {permisos.verSolicitudes && (
                    <div className="card">
                      <div className="card-icon">📝</div>
                      <h4>Solicitudes Pendientes</h4>
                      <p>{listaSolicitudes.filter(s => s.estado === 'Pendiente').length}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ============ VISTA AULAS (ADMIN) ============ */}
            {permisos.gestionAulas && vistaActual === 'aulas' && (
              <div className="seccion-blanca">
                <div className="section-header">
                  <h2>Gestión de Aulas</h2>
                  <button className="btn-primary" onClick={() => setShowFormAula(!showFormAula)}>
                    {showFormAula ? '❌ Cancelar' : '➕ Nueva Aula'}
                  </button>
                </div>

                {showFormAula && (
                  <form onSubmit={guardarNuevaAula} className="form-grid-3">
                    <input 
                      name="nombre" 
                      className="input-formal" 
                      placeholder="Nombre del aula (ej: Laboratorio A)" 
                      required 
                    />
                    <input 
                      name="capacidad" 
                      type="number" 
                      className="input-formal" 
                      placeholder="Capacidad" 
                      required 
                    />
                    <select name="equipo" className="input-formal" required>
                      <option value="">Equipo principal</option>
                      <option value="Gafas RV">Gafas RV</option>
                      <option value="Cámaras">Cámaras</option>
                      <option value="Laptops">Laptops</option>
                      <option value="Múltiple">Múltiple</option>
                    </select>
                    <button type="submit" className="btn-primary">Registrar Aula</button>
                  </form>
                )}

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Capacidad</th>
                        <th>Equipo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaAulas.length === 0 ? (
                        <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No hay aulas registradas</td></tr>
                      ) : (
                        listaAulas.map((aula) => (
                          <tr key={aula.id}>
                            <td><strong>{aula.nombre}</strong></td>
                            <td>{aula.capacidad} personas</td>
                            <td>{aula.equipoDisponible}</td>
                            <td>
                              <span className={`badge ${aula.estado === 'Disponible' ? 'badge-success' : 'badge-warning'}`}>
                                {aula.estado}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn-small btn-danger" 
                                onClick={() => eliminarAula(aula.id)}
                              >
                                🗑️ Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============ VISTA EQUIPOS (ADMIN) ============ */}
            {permisos.gestionEquipos && vistaActual === 'equipos' && (
              <div className="seccion-blanca">
                <div className="section-header">
                  <h2>Gestión de Inventario</h2>
                  <button className="btn-primary" onClick={() => setShowFormReserva(!showFormReserva)}>
                    {showFormReserva ? '❌ Cancelar' : '➕ Nuevo Equipo'}
                  </button>
                </div>

                {showFormReserva && (
                  <form onSubmit={guardarNuevoEquipo} className="form-grid-4">
                    <input name="nombre" className="input-formal" placeholder="Nombre del equipo" required />
                    <select name="categoria" className="input-formal" required>
                      <option value="">Seleccionar categoría</option>
                      <option value="Gafas RV">Gafas RV</option>
                      <option value="Cámara">Cámara</option>
                      <option value="Laptop">Laptop</option>
                      <option value="Micrófono">Micrófono</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <input name="cantidad" type="number" className="input-formal" placeholder="Cantidad" defaultValue="1" />
                    <select name="estado" className="input-formal">
                      <option value="Disponible">Disponible</option>
                      <option value="Mantenimiento">Mantenimiento</option>
                      <option value="Inactivo">Inactivo</option>
                    </select>
                    <button type="submit" className="btn-primary" style={{gridColumn: 'span 4'}}>Registrar Equipo</button>
                  </form>
                )}

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Equipo</th>
                        <th>Categoría</th>
                        <th>Cantidad</th>
                        <th>Estado</th>
                        <th>Registrado por</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaEquipos.length === 0 ? (
                        <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No hay equipos registrados</td></tr>
                      ) : (
                        listaEquipos.map((eq) => (
                          <tr key={eq.id}>
                            <td><strong>{eq.nombre}</strong></td>
                            <td>{eq.categoria}</td>
                            <td>{eq.cantidad || 1}</td>
                            <td>
                              <span className={`badge ${eq.estado === 'Disponible' ? 'badge-success' : 'badge-warning'}`}>
                                {eq.estado}
                              </span>
                            </td>
                            <td style={{fontSize: '13px', color: '#64748b'}}>{eq.registradoPor}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============ VISTA RESERVAS (MAESTRO) ============ */}
            {permisos.verReservas && !permisos.solicitarEquipos && vistaActual === 'reservas' && (
              <div className="seccion-blanca">
                <div className="section-header">
                  <h2>Mis Reservas</h2>
                  <button className="btn-primary" onClick={() => setShowFormReserva(!showFormReserva)}>
                    {showFormReserva ? '❌ Cancelar' : '➕ Nueva Reserva'}
                  </button>
                </div>

                {showFormReserva && (
                  <form onSubmit={guardarReserva} className="form-grid-2">
                    <select name="aula" className="input-formal" required>
                      <option value="">Selecciona aula</option>
                      {listaAulas.filter(a => a.estado === 'Disponible').map(a => (
                        <option key={a.id} value={a.id}>
                          {a.nombre} ({a.capacidad} personas - {a.equipoDisponible})
                        </option>
                      ))}
                    </select>
                    <input name="fecha" type="date" className="input-formal" required />
                    <input name="horaInicio" type="time" className="input-formal" placeholder="Hora inicio" required />
                    <input name="horaFin" type="time" className="input-formal" placeholder="Hora fin" required />
                    <textarea 
                      name="descripcion" 
                      className="input-formal" 
                      placeholder="Descripción de la clase o actividad..." 
                      required 
                      style={{gridColumn: 'span 2'}}
                      rows="4"
                    ></textarea>
                    <button type="submit" className="btn-primary" style={{gridColumn: 'span 2'}}>Confirmar Reserva</button>
                  </form>
                )}

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Aula</th>
                        <th>Fecha</th>
                        <th>Horario</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaReservas.filter(r => r.reservadoPor === usuarioActivo.email).length === 0 ? (
                        <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>No tienes reservas activas</td></tr>
                      ) : (
                        listaReservas.filter(r => r.reservadoPor === usuarioActivo.email).map((res) => (
                          <tr key={res.id}>
                            <td>
                              <div style={{fontWeight: 'bold'}}>{res.aulaNombre}</div>
                              <div style={{fontSize: '12px', color: '#94a3b8'}}>Cap: {res.aulaCapacidad} | {res.aulaEquipo}</div>
                            </td>
                            <td style={{fontWeight: '500'}}>{new Date(res.fecha).toLocaleDateString('es-ES')}</td>
                            <td style={{fontWeight: '500'}}>{res.horaInicio} - {res.horaFin}</td>
                            <td style={{fontSize: '13px', color: '#475569', maxWidth: '250px'}}>
                              {res.descripcion}
                            </td>
                            <td>
                              <span className={`badge ${res.estado === 'Confirmada' ? 'badge-success' : 'badge-warning'}`}>
                                {res.estado}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn-small btn-danger" 
                                onClick={() => cancelarReserva(res.id)}
                              >
                                ❌ Cancelar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============ VISTA SOLICITUDES (ALUMNO) ============ */}
            {permisos.solicitarEquipos && vistaActual === 'solicitudes' && (
              <div className="seccion-blanca">
                <div className="section-header">
                  <h2>Mis Solicitudes</h2>
                  <button className="btn-primary" onClick={() => setShowFormSolicitud(!showFormSolicitud)}>
                    {showFormSolicitud ? '❌ Cancelar' : '➕ Nueva Solicitud'}
                  </button>
                </div>

                {showFormSolicitud && (
                  <form onSubmit={crearSolicitud} className="form-grid-2">
                    <select name="tipo" className="input-formal" required>
                      <option value="">Tipo de solicitud</option>
                      <option value="Aula">Reserva de Aula</option>
                      <option value="Equipo">Solicitud de Equipo</option>
                      <option value="Otro">Otro</option>
                    </select>
                    <input name="fechaSolicitada" type="date" className="input-formal" placeholder="Fecha solicitada" />
                    <textarea name="descripcion" className="input-formal" placeholder="Describe tu solicitud con detalle..." required style={{gridColumn: 'span 2'}}></textarea>
                    <button type="submit" className="btn-primary" style={{gridColumn: 'span 2'}}>Enviar Solicitud</button>
                  </form>
                )}

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Fecha Solicitada</th>
                        <th>Estado</th>
                        <th>Fecha Solicitud</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).length === 0 ? (
                        <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No tienes solicitudes</td></tr>
                      ) : (
                        listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).map((sol) => (
                          <tr key={sol.id}>
                            <td><strong>{sol.tipo}</strong></td>
                            <td style={{fontSize: '13px'}}>{sol.descripcion}</td>
                            <td>{sol.fechaSolicitada ? new Date(sol.fechaSolicitada).toLocaleDateString('es-ES') : '-'}</td>
                            <td>
                              <span className={`badge ${
                                sol.estado === 'Aprobada' ? 'badge-success' : 
                                sol.estado === 'Rechazada' ? 'badge-danger' : 
                                'badge-warning'
                              }`}>
                                {sol.estado}
                              </span>
                            </td>
                            <td style={{fontSize: '12px'}}>{new Date(sol.fechaSolicitud).toLocaleDateString('es-ES')}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============ VISTA RESERVAS ADMIN ============ */}
            {permisos.verReservas && vistaActual === 'reservasAdmin' && (
              <div className="seccion-blanca">
                <div className="section-header">
                  <h2>Todas las Reservas</h2>
                  <span className="badge badge-info">
                    {listaReservas.filter(r => r.estado === 'Confirmada').length} Activas
                  </span>
                </div>

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Aula</th>
                        <th>Reservado por</th>
                        <th>Fecha</th>
                        <th>Horario</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaReservas.length === 0 ? (
                        <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>No hay reservas</td></tr>
                      ) : (
                        listaReservas.map((res) => (
                          <tr key={res.id}>
                            <td>
                              <div style={{fontWeight: 'bold'}}>{res.aulaNombre}</div>
                              <div style={{fontSize: '11px', color: '#94a3b8'}}>Cap: {res.aulaCapacidad}</div>
                            </td>
                            <td>
                              <div style={{fontWeight: '500'}}>{res.nombreReservador}</div>
                              <div style={{fontSize: '11px', color: '#94a3b8'}}>{res.reservadoPor}</div>
                            </td>
                            <td style={{fontWeight: '500'}}>{new Date(res.fecha).toLocaleDateString('es-ES')}</td>
                            <td style={{fontWeight: '500'}}>{res.horaInicio} - {res.horaFin}</td>
                            <td style={{fontSize: '12px', color: '#475569', maxWidth: '200px'}}>
                              {res.descripcion}
                            </td>
                            <td>
                              <span className={`badge ${res.estado === 'Confirmada' ? 'badge-success' : 'badge-warning'}`}>
                                {res.estado}
                              </span>
                            </td>
                            <td>
                              <button 
                                className="btn-small btn-danger" 
                                onClick={() => cancelarReserva(res.id)}
                              >
                                ❌ Cancelar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ============ VISTA SOLICITUDES ADMIN ============ */}
            {permisos.verSolicitudes && vistaActual === 'solicitudesAdmin' && (
              <div className="seccion-blanca">
                <div className="section-header">
                  <h2>Gestión de Solicitudes</h2>
                  <span className="badge badge-warning">
                    {listaSolicitudes.filter(s => s.estado === 'Pendiente').length} Pendientes
                  </span>
                </div>

                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Solicitado por</th>
                        <th>Tipo</th>
                        <th>Descripción</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listaSolicitudes.length === 0 ? (
                        <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No hay solicitudes</td></tr>
                      ) : (
                        listaSolicitudes.map((sol) => (
                          <tr key={sol.id} className={sol.estado === 'Pendiente' ? 'row-highlight' : ''}>
                            <td><strong>{sol.solicitadoPor}</strong></td>
                            <td>{sol.tipo}</td>
                            <td style={{fontSize: '13px', maxWidth: '300px'}}>{sol.descripcion}</td>
                            <td>
                              <span className={`badge ${
                                sol.estado === 'Aprobada' ? 'badge-success' : 
                                sol.estado === 'Rechazada' ? 'badge-danger' : 
                                'badge-warning'
                              }`}>
                                {sol.estado}
                              </span>
                            </td>
                            <td>
                              {sol.estado === 'Pendiente' && (
                                <>
                                  <button 
                                    className="btn-small btn-success" 
                                    onClick={() => aprobarSolicitud(sol.id)}
                                  >
                                    ✅ Aprobar
                                  </button>
                                  <button 
                                    className="btn-small btn-danger" 
                                    onClick={() => rechazarSolicitud(sol.id)}
                                  >
                                    ❌ Rechazar
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ====================================================
  // VISTA LOGIN
  // ====================================================
  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>🏫 Lab Reserva</h1>
            <p>Sistema de Reservas del Laboratorio</p>
          </div>
          
          {mensaje && <div className={`alert alert-${tipoMensaje}`}>{mensaje}</div>}

          <form onSubmit={esRegistro ? manejarRegistro : manejarIngreso}>
            <input 
              className="input-formal" 
              type="email" 
              placeholder="Correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              className="input-formal" 
              type="password" 
              placeholder="Contraseña" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            
            {esRegistro && (
              <select 
                className="input-formal" 
                value={rolSeleccionado}
                onChange={(e) => setRolSeleccionado(e.target.value)}
              >
                <option value="alumno">Estudiante</option>
                <option value="maestro">Profesor/Maestro</option>
                <option value="admin">Administrador</option>
              </select>
            )}
            
            <button className="btn-primary" type="submit" style={{width: '100%', marginTop: '15px'}}>
              {esRegistro ? 'Registrarse' : 'Ingresar'}
            </button>
          </form>

          <div className="login-toggle">
            <button 
              onClick={() => {
                setEsRegistro(!esRegistro);
                setMensaje('');
              }} 
              className="toggle-btn"
            >
              {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
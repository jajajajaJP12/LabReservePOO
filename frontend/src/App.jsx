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
  
  // --- ESTADOS DE AULAS PÚBLICAS ---
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date().toISOString().split('T')[0]);
  const [aulaActual, setAulaActual] = useState(null);
  const [reservaDetalle, setReservaDetalle] = useState(null);
  const [showSolicitudDesdeAula, setShowSolicitudDesdeAula] = useState(false);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

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
    const aulaNombre = e.target.aulaNombre?.value || '';
    const aulaId = e.target.aulaId?.value || '';
    const horaInicio = e.target.horaInicio?.value || '';
    const horaFin = e.target.horaFin?.value || '';

    console.log('Creando solicitud con:', {
      tipo, descripcion, fechaSolicitada, aulaNombre, aulaId, horaInicio, horaFin, 
      email: usuarioActivo.email
    });

    try {
      const docRef = await addDoc(collection(db, "solicitudes"), {
        tipo,
        descripcion,
        fechaSolicitada,
        aulaNombre,
        aulaId,
        horaInicio,
        horaFin,
        solicitadoPor: usuarioActivo.email,
        nombreSolicitador: usuarioActivo.email.split('@')[0],
        rol: usuarioActivo.rol,
        estado: 'Pendiente',
        fechaSolicitud: new Date().toISOString()
      });
      
      // Actualizar el estado local inmediatamente
      const nuevaSolicitud = {
        id: docRef.id,
        tipo,
        descripcion,
        fechaSolicitada,
        aulaNombre,
        aulaId,
        horaInicio,
        horaFin,
        solicitadoPor: usuarioActivo.email,
        nombreSolicitador: usuarioActivo.email.split('@')[0],
        rol: usuarioActivo.rol,
        estado: 'Pendiente',
        fechaSolicitud: new Date().toISOString()
      };
      setListaSolicitudes([nuevaSolicitud, ...listaSolicitudes]);
      
      e.target.reset();
      mostrarMensaje('Solicitud enviada. Espera la aprobación del administrador.', 'success');
      setShowFormSolicitud(false);
    } catch (error) { 
      console.error('Error al crear solicitud:', error);
      mostrarMensaje('Error al crear solicitud', 'error');
    }
  };

  const aprobarSolicitud = async (id) => {
    try {
      // Obtener los datos de la solicitud
      const solicitudDoc = await getDoc(doc(db, "solicitudes", id));
      const solicitud = solicitudDoc.data();
      
      // Si es una solicitud de aula, crear una reserva
      if (solicitud.tipo === 'Aula') {
        const nuevaReserva = {
          aulaNombre: solicitud.aulaNombre,
          aulaId: solicitud.aulaId,
          fecha: solicitud.fechaSolicitada,
          horaInicio: solicitud.horaInicio,
          horaFin: solicitud.horaFin,
          descripcion: solicitud.descripcion,
          aulaCapacidad: solicitud.aulaCapacidad || 0,
          aulaEquipo: solicitud.aulaEquipo || '',
          reservadoPor: solicitud.solicitadoPor,
          nombreReservador: solicitud.nombreSolicitador,
          rol: solicitud.rol,
          estado: 'Confirmada',
          fechaReserva: new Date().toISOString()
        };
        
        console.log('Creando reserva desde solicitud aprobada:', nuevaReserva);
        
        // Crear la reserva
        const reservaRef = await addDoc(collection(db, "reservas"), nuevaReserva);
        
        // Actualizar la solicitud a 'Aprobada'
        await updateDoc(doc(db, "solicitudes", id), {
          estado: 'Aprobada',
          fechaAprobacion: new Date().toISOString(),
          reservaId: reservaRef.id
        });
        
        // Actualizar el estado local con el ID
        setListaReservas([{...nuevaReserva, id: reservaRef.id}, ...listaReservas]);
        setListaSolicitudes(listaSolicitudes.map(s => 
          s.id === id ? {...s, estado: 'Aprobada'} : s
        ));
        
        mostrarMensaje('✅ Solicitud aprobada y reserva creada', 'success');
      }
    } catch (error) { 
      console.error('Error al aprobar solicitud:', error);
      mostrarMensaje('Error al aprobar solicitud: ' + error.message, 'error');
    }
  };

  // --- FUNCIONES DE UTILIDAD ---
  const generarHorarios = (aula, fecha) => {
    // Generar bloques de horarios de 7am a 6pm
    const horarios = [];
    const horas = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
    
    // Obtener hora actual y fecha actual
    const ahora = new Date();
    const horaActual = ahora.getHours();
    const fechaActual = new Date().toISOString().split('T')[0];
    const esHoy = fecha === fechaActual;
    
    console.log('Generando horarios para aula:', aula, 'fecha:', fecha);
    console.log('Solicitudes disponibles:', listaSolicitudes.filter(s => s.estado === 'Pendiente'));
    
    horas.forEach((hora) => {
      const horaInicio = `${String(hora).padStart(2, '0')}:00`;
      const horaSiguiente = hora + 1;
      const horaFin = `${String(horaSiguiente).padStart(2, '0')}:00`;
      
      // Buscar si hay reserva en este horario
      const reserva = listaReservas.find(r => 
        r.aulaId === aula &&
        r.fecha === fecha &&
        r.horaInicio === horaInicio
      );
      
      // Buscar si hay solicitud pendiente en este horario
      const solicitud = listaSolicitudes.find(s =>
        s.aulaId === aula &&
        s.fechaSolicitada === fecha &&
        s.horaInicio === horaInicio &&
        s.estado === 'Pendiente'
      );
      
      if (solicitud) {
        console.log(`✅ Encontrada solicitud para ${horaInicio}:`, solicitud);
      }
      
      // Verificar si el horario ya pasó
      const horaPasada = esHoy && hora <= horaActual;
      
      horarios.push({
        horaInicio,
        horaFin,
        ocupado: !!reserva,
        reserva: reserva || null,
        conSolicitud: !!solicitud,
        solicitud: solicitud || null,
        pasado: horaPasada
      });
    });
    
    return horarios;
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
            
            <button 
              className={`menu-btn ${vistaActual === 'aulasReservadas' ? 'activo' : ''}`} 
              onClick={() => setVistaActual('aulasReservadas')}
            >
              📍 Aulas Reservadas
            </button>



            <button 
              className={`menu-btn ${vistaActual === 'aulasPúblicas' ? 'activo' : ''}`} 
              onClick={() => setVistaActual('aulasPúblicas')}
            >
              🏢 Aulas Disponibles
            </button>
            
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

            {/* ============ VISTA AULAS RESERVADAS (TODOS) ============ */}
            {vistaActual === 'aulasReservadas' && (
              <div className="seccion-blanca">
                <div className="section-header">
                  <h2>📍 Aulas y Reservas del Sistema</h2>
                  <span className="badge badge-info">
                    {listaReservas.filter(r => r.estado === 'Confirmada').length} Reservadas
                  </span>
                </div>

                <div className="aulas-grid">
                  {listaAulas.length === 0 ? (
                    <div style={{gridColumn: 'span 100%', textAlign: 'center', padding: '40px'}}>
                      <p style={{fontSize: '18px', color: '#94a3b8'}}>No hay aulas registradas</p>
                    </div>
                  ) : (
                    listaAulas.map((aula) => {
                      const reservasAula = listaReservas.filter(r => r.aulaId === aula.id && r.estado === 'Confirmada');
                      
                      return (
                        <div key={aula.id} className="aula-card">
                          <div className="aula-header">
                            <h3>{aula.nombre}</h3>
                            <span className={`badge ${aula.estado === 'Disponible' ? 'badge-success' : 'badge-warning'}`}>
                              {aula.estado}
                            </span>
                          </div>

                          <div className="aula-info">
                            <div className="info-item">
                              <span className="label">👥 Capacidad:</span>
                              <span className="value">{aula.capacidad} personas</span>
                            </div>
                            <div className="info-item">
                              <span className="label">🖥️ Equipo:</span>
                              <span className="value">{aula.equipoDisponible}</span>
                            </div>
                          </div>

                          {reservasAula.length > 0 ? (
                            <div className="reservas-aula">
                              <h4 style={{marginBottom: '12px', fontSize: '13px', color: '#64748b', textTransform: 'uppercase'}}>
                                📅 Reservas Confirmadas
                              </h4>
                              {reservasAula.map((res) => (
                                <div key={res.id} className="reserva-item">
                                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px'}}>
                                    <div style={{flex: 1}}>
                                      <div className="reservador-info">
                                        <strong>{res.nombreReservador}</strong>
                                        <span> ({res.nombreReservador === 'Sistema' ? 'Admin' : res.rol})</span>
                                      </div>
                                      <div className="fecha-hora">
                                        📅 {new Date(res.fecha).toLocaleDateString('es-ES')} 
                                        <br />
                                        🕐 {res.horaInicio} - {res.horaFin}
                                      </div>
                                      <div className="descripcion-reserva">
                                        <strong>Descripción:</strong>
                                        <p>{res.descripcion}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="sin-reservas">
                              <p>✅ Disponible para reservar</p>
                            </div>
                          )}

                          {permisos.solicitarEquipos && (
                            <button 
                              className="btn-primary" 
                              style={{width: '100%', marginTop: '12px'}}
                              onClick={() => {
                                setVistaActual('solicitudes');
                                setShowFormSolicitud(true);
                              }}
                            >
                              ➕ Solicitar esta Aula
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}



            {/* ============ VISTA SOLICITUDES (ALUMNO) ============ */}
            {permisos.solicitarEquipos && vistaActual === 'solicitudes' && (
              <div className="seccion-blanca">
                <div className="section-header">
                  <h2>Mis Solicitudes de Aulas</h2>
                  <button className="btn-primary" onClick={() => setShowFormSolicitud(!showFormSolicitud)}>
                    {showFormSolicitud ? '❌ Cancelar' : '➕ Nueva Solicitud'}
                  </button>
                </div>

                {showFormSolicitud && (
                  <form onSubmit={crearSolicitud} className="form-grid-2">
                    <select name="tipo" className="input-formal" required>
                      <option value="">Tipo de solicitud</option>
                      <option value="Aula">Solicitar Aula</option>
                    </select>
                    <input name="fechaSolicitada" type="date" className="input-formal" placeholder="Fecha solicitada" />
                    <textarea 
                      name="descripcion" 
                      className="input-formal" 
                      placeholder="Describe tu necesidad: qué aula necesitas, para qué actividad, cuántas personas, equipos necesarios, duración aproximada..." 
                      required 
                      style={{gridColumn: 'span 2'}}
                      rows="6"
                    ></textarea>
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

            {vistaActual === 'aulasPúblicas' && (
              <div className="seccion-blanca">
                <div className="section-header">
                  <h2>🏢 Aulas Disponibles - Horarios</h2>
                  <input 
                    type="date" 
                    className="input-formal" 
                    style={{width: '200px', padding: '10px'}}
                    value={fechaSeleccionada}
                    onChange={(e) => {
                      setFechaSeleccionada(e.target.value);
                      setReservaDetalle(null);
                      setAulaActual(null);
                    }}
                  />
                </div>

                <div style={{marginBottom: '30px'}}>
                  <div style={{marginBottom: '15px'}}>
                    <label style={{fontWeight: '600', color: '#1e293b', display: 'block', marginBottom: '10px'}}>
                      Selecciona un aula:
                    </label>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px'}}>
                      {listaAulas.map(aula => (
                        <button
                          key={aula.id}
                          onClick={() => {
                            setAulaActual(aula);
                            setReservaDetalle(null);
                            setHorarioSeleccionado(null);
                            setShowSolicitudDesdeAula(false);
                          }}
                          className={`btn-aula ${aulaActual?.id === aula.id ? 'activo' : ''}`}
                        >
                          <div style={{fontWeight: '600'}}>{aula.nombre}</div>
                          <div style={{fontSize: '12px', color: '#64748b', marginTop: '5px'}}>
                            Cap: {aula.capacidad} | {aula.equipoDisponible}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {aulaActual && (
                  <div className="horarios-container">
                    <h3 style={{marginBottom: '20px', color: '#1e293b'}}>
                      📅 {aulaActual.nombre} - {new Date(fechaSeleccionada).toLocaleDateString('es-ES', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                    </h3>

                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '25px'}}>
                      {generarHorarios(aulaActual.id, fechaSeleccionada).map((horario, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            // No permitir click en horarios pasados o con solicitud
                            if (horario.pasado || horario.conSolicitud) return;
                            
                            if (horario.ocupado) {
                              setReservaDetalle(horario.reserva);
                              setHorarioSeleccionado(null);
                            } else {
                              // Seleccionar horario disponible
                              if (horarioSeleccionado?.horaInicio === horario.horaInicio) {
                                // Deseleccionar si ya está seleccionado
                                setHorarioSeleccionado(null);
                                setShowSolicitudDesdeAula(false);
                              } else {
                                // Seleccionar nuevo horario
                                setHorarioSeleccionado(horario);
                                setReservaDetalle(null);
                                setShowSolicitudDesdeAula(true);
                              }
                            }
                          }}
                          disabled={horario.pasado || horario.conSolicitud}
                          className={`bloque-horario ${horario.ocupado ? 'ocupado' : 'disponible'}`}
                          style={{
                            padding: '15px',
                            borderRadius: '8px',
                            border: horarioSeleccionado?.horaInicio === horario.horaInicio ? '3px solid #2563eb' : 'none',
                            cursor: horario.pasado || horario.conSolicitud ? 'not-allowed' : 'pointer',
                            backgroundColor: horario.pasado ? '#f1f5f9' : (horario.conSolicitud ? '#fef3c7' : (horario.ocupado ? '#fee2e2' : (horarioSeleccionado?.horaInicio === horario.horaInicio ? '#dbeafe' : '#dcfce7'))),
                            borderLeft: `5px solid ${horario.pasado ? '#cbd5e1' : (horario.conSolicitud ? '#ea580c' : (horario.ocupado ? '#dc2626' : (horarioSeleccionado?.horaInicio === horario.horaInicio ? '#2563eb' : '#16a34a')))}`,
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            opacity: horario.pasado ? 0.6 : 1
                          }}
                        >
                          <div style={{fontWeight: '600', color: horario.pasado ? '#94a3b8' : (horario.conSolicitud ? '#92400e' : '#1e293b')}}>
                            {horario.horaInicio} - {horario.horaFin}
                          </div>
                          <div style={{fontSize: '12px', marginTop: '5px', color: horario.pasado ? '#64748b' : (horario.conSolicitud ? '#b45309' : (horario.ocupado ? '#991b1b' : '#166534')), fontWeight: '500'}}>
                            {horario.pasado ? '⏰ PASADO' : (horario.conSolicitud ? '⏳ EN SOLICITUD' : (horario.ocupado ? '❌ OCUPADO' : (horarioSeleccionado?.horaInicio === horario.horaInicio ? '✅ SELECCIONADO' : '✅ Disponible')))}
                          </div>
                          {horario.ocupado && !horario.pasado && !horario.conSolicitud && (
                            <div style={{fontSize: '11px', marginTop: '8px', color: '#7f1d1d', backgroundColor: 'rgba(220, 38, 38, 0.1)', padding: '8px', borderRadius: '4px'}}>
                              Reservado por: <strong>{horario.reserva?.nombreReservador}</strong>
                              <br/>
                              Toca para ver detalles
                            </div>
                          )}
                          {!horario.ocupado && horarioSeleccionado?.horaInicio === horario.horaInicio && (
                            <div style={{fontSize: '11px', marginTop: '8px', color: '#1e40af', backgroundColor: 'rgba(37, 99, 235, 0.1)', padding: '8px', borderRadius: '4px'}}>
                              Toca de nuevo para deseleccionar
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Detalles de la reserva OCUPADA */}
                    {reservaDetalle && (
                      <div style={{
                        backgroundColor: '#fee2e2',
                        border: '2px solid #dc2626',
                        borderRadius: '8px',
                        padding: '20px',
                        marginTop: '20px'
                      }}>
                        <h4 style={{color: '#991b1b', marginBottom: '15px'}}>📋 Detalles de la Reserva</h4>
                        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px'}}>
                          <div>
                            <label style={{fontWeight: '600', color: '#7f1d1d', fontSize: '12px', textTransform: 'uppercase'}}>
                              Reservado por:
                            </label>
                            <p style={{color: '#1e293b', fontWeight: '500', marginTop: '5px'}}>{reservaDetalle.nombreReservador}</p>
                            <p style={{color: '#64748b', fontSize: '12px'}}>{reservaDetalle.reservadoPor}</p>
                          </div>
                          <div>
                            <label style={{fontWeight: '600', color: '#7f1d1d', fontSize: '12px', textTransform: 'uppercase'}}>
                              Horario:
                            </label>
                            <p style={{color: '#1e293b', fontWeight: '500', marginTop: '5px'}}>
                              {reservaDetalle.horaInicio} - {reservaDetalle.horaFin}
                            </p>
                          </div>
                          <div style={{gridColumn: 'span 2'}}>
                            <label style={{fontWeight: '600', color: '#7f1d1d', fontSize: '12px', textTransform: 'uppercase'}}>
                              Descripción:
                            </label>
                            <p style={{color: '#475569', marginTop: '8px', lineHeight: '1.6', whiteSpace: 'pre-wrap'}}>
                              {reservaDetalle.descripcion}
                            </p>
                          </div>
                          <div style={{gridColumn: 'span 2'}}>
                            <label style={{fontWeight: '600', color: '#7f1d1d', fontSize: '12px', textTransform: 'uppercase'}}>
                              Rol:
                            </label>
                            <p style={{color: '#1e293b', marginTop: '5px'}}>
                              <span className={`badge badge-${reservaDetalle.rol === 'maestro' ? 'maestro' : 'info'}`}>
                                {reservaDetalle.rol.charAt(0).toUpperCase() + reservaDetalle.rol.slice(1)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Formulario de solicitud para horario SELECCIONADO */}
                    {horarioSeleccionado && usuarioActivo.rol === 'alumno' && !reservaDetalle && (
                      <div style={{
                        backgroundColor: '#dbeafe',
                        border: '2px solid #2563eb',
                        borderRadius: '8px',
                        padding: '20px',
                        marginTop: '20px'
                      }}>
                        <h4 style={{color: '#1e40af', marginBottom: '15px'}}>📝 Solicitar Este Horario</h4>
                        
                        <div style={{backgroundColor: 'rgba(37, 99, 235, 0.05)', padding: '15px', borderRadius: '6px', marginBottom: '15px', borderLeft: '4px solid #2563eb'}}>
                          <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px'}}>
                            <div>
                              <label style={{fontWeight: '600', color: '#1e40af', fontSize: '11px', textTransform: 'uppercase'}}>Aula:</label>
                              <p style={{color: '#1e293b', fontWeight: '600', marginTop: '5px'}}>{aulaActual.nombre}</p>
                            </div>
                            <div>
                              <label style={{fontWeight: '600', color: '#1e40af', fontSize: '11px', textTransform: 'uppercase'}}>Fecha:</label>
                              <p style={{color: '#1e293b', fontWeight: '600', marginTop: '5px'}}>
                                {new Date(fechaSeleccionada).toLocaleDateString('es-ES')}
                              </p>
                            </div>
                            <div>
                              <label style={{fontWeight: '600', color: '#1e40af', fontSize: '11px', textTransform: 'uppercase'}}>Horario:</label>
                              <p style={{color: '#1e293b', fontWeight: '600', marginTop: '5px'}}>
                                {horarioSeleccionado.horaInicio} - {horarioSeleccionado.horaFin}
                              </p>
                            </div>
                          </div>
                        </div>

                        <form 
                          onSubmit={async (e) => {
                            e.preventDefault();
                            await crearSolicitud(e);
                            setHorarioSeleccionado(null);
                            setShowSolicitudDesdeAula(false);
                          }}
                          style={{
                            display: 'grid',
                            gap: '10px'
                          }}
                        >
                          <input type="hidden" name="tipo" value="Aula" />
                          <input type="hidden" name="fechaSolicitada" value={fechaSeleccionada} />
                          <input type="hidden" name="aulaNombre" value={aulaActual.nombre} />
                          <input type="hidden" name="aulaId" value={aulaActual.id} />
                          <input type="hidden" name="horaInicio" value={horarioSeleccionado.horaInicio} />
                          <input type="hidden" name="horaFin" value={horarioSeleccionado.horaFin} />
                          
                          <textarea
                            name="descripcion"
                            className="input-formal"
                            placeholder="Describe el motivo de tu solicitud. ¿Qué actividad realizarás? ¿Cuántos compañeros serán?"
                            required
                            rows="5"
                          ></textarea>

                          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                            <button type="submit" className="btn-primary">
                              ✅ Enviar Solicitud
                            </button>
                            <button 
                              type="button"
                              className="btn-primary"
                              onClick={() => {
                                setHorarioSeleccionado(null);
                                setShowSolicitudDesdeAula(false);
                              }}
                              style={{backgroundColor: '#ef4444'}}
                            >
                              ❌ Cancelar
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {usuarioActivo.rol !== 'alumno' && horarioSeleccionado && (
                      <div style={{
                        backgroundColor: '#fef3c7',
                        border: '2px solid #ea580c',
                        borderRadius: '8px',
                        padding: '20px',
                        marginTop: '20px',
                        textAlign: 'center'
                      }}>
                        <p style={{color: '#92400e', fontSize: '14px'}}>
                          ℹ️ Solo los estudiantes pueden hacer solicitudes. Los maestros pueden reservar directamente.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {!aulaActual && (
                  <div style={{textAlign: 'center', padding: '40px', color: '#64748b'}}>
                    <p>Selecciona un aula para ver sus horarios disponibles</p>
                  </div>
                )}
              </div>
            )}
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
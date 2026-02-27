  import { useState, useEffect } from 'react';
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
  import { doc, setDoc, getDoc, collection, addDoc, onSnapshot, query, orderBy, updateDoc, deleteDoc, getDocs, where } from 'firebase/firestore';
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
      solicitarEquipos: false,
      verInventario: false
    },
    maestro: {
      gestionAulas: false,
      gestionEquipos: false,
      verReservas: true,
      verSolicitudes: false,
      aprobarSolicitudes: false,
      reservarEquipos: true,
      solicitarEquipos: true, // ¡CAMBIADO A TRUE! Ahora pueden pedir material
      verInventario: true
    },
    alumno: {
      gestionAulas: false,
      gestionEquipos: false,
      verReservas: false,
      verSolicitudes: false,
      aprobarSolicitudes: false,
      reservarEquipos: false,
      solicitarEquipos: true,
      verInventario: true
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
    const [listaSolicitudesMaterial, setListaSolicitudesMaterial] = useState([]);
    const [listaNotificaciones, setListaNotificaciones] = useState([]);
    const [listaUsuarios, setListaUsuarios] = useState([]);
    
    // --- ESTADOS DE FORMULARIO ---
    const [showFormAula, setShowFormAula] = useState(false);
    const [showFormReserva, setShowFormReserva] = useState(false);
    const [showFormSolicitud, setShowFormSolicitud] = useState(false);
    const [showFormSolicitudMaterial, setShowFormSolicitudMaterial] = useState(false);
    const [aulaSeleccionada, setAulaSeleccionada] = useState(null);
    const [showModalNotificaciones, setShowModalNotificaciones] = useState(false);
    const [tabSolicitudesAdmin, setTabSolicitudesAdmin] = useState('aulas');
    
    // --- ESTADOS DE AULAS PÚBLICAS ---
    const [fechaSeleccionada, setFechaSeleccionada] = useState(() => {
      const hoy = new Date();
      return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${String(hoy.getDate()).padStart(2, '0')}`;
    });
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

        // Cargar solicitudes de material
        const qSolicitudesMaterial = query(collection(db, "solicitudes_material"), orderBy("fechaSolicitud", "desc"));
        const unsub5 = onSnapshot(qSolicitudesMaterial, (snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setListaSolicitudesMaterial(docs);
        });

  // Cargar notificaciones (Ya lo tienes)
        const qNotificaciones = query(collection(db, "notificaciones"), orderBy("fecha", "desc"));
        const unsub6 = onSnapshot(qNotificaciones, (snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setListaNotificaciones(docs);
        });

        // --- NUEVO: Cargar usuarios ---
        const qUsuarios = query(collection(db, "usuarios"), orderBy("correo"));
        const unsub7 = onSnapshot(qUsuarios, (snapshot) => {
          const docs = [];
          snapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
          });
          setListaUsuarios(docs);
        });

        return () => {
          unsub1();
          unsub2();
          unsub3();
          unsub4();
          unsub5();
          unsub6();
          unsub7(); // <--- NUEVO
        };
      }
    }, [usuarioActivo]);

  // --- FUNCIONES DE FIREBASE ---
    const mostrarMensaje = (texto, tipo = 'success') => {
      setMensaje(texto);
      setTipoMensaje(tipo);
      setTimeout(() => setMensaje(''), 3000);
    };

    // --- NUEVA LÓGICA DE REGISTRO SEGURO ---
    const manejarRegistro = async (e) => {
      e.preventDefault();
      setMensaje('Creando cuenta y verificando permisos...');
      setTipoMensaje('info');
      try {
        const correoNormalizado = email.toLowerCase();
        
        const rolDoc = await getDoc(doc(db, "roles_asignados", correoNormalizado));
        let rolFinal = 'alumno'; 
        
        if (rolDoc.exists()) {
          rolFinal = rolDoc.data().rol; 
        }

        const credencial = await createUserWithEmailAndPassword(auth, email, password);
        
        await setDoc(doc(db, "usuarios", credencial.user.uid), { 
          correo: correoNormalizado, 
          rol: rolFinal,
          fechaRegistro: new Date().toISOString()
        });
        
        setUsuarioActivo({ uid: credencial.user.uid, email: credencial.user.email, rol: rolFinal });
        setEmail('');
        setPassword('');
        setMensaje('');
      } catch (error) { 
        mostrarMensaje('Error: ' + error.message, 'error');
      }
    };

    // --- FUNCIÓN RECUPERADA: INICIAR SESIÓN ---
    const manejarIngreso = async (e) => {
      e.preventDefault();
      setMensaje('Ingresando...');
      setTipoMensaje('info');
      try {
        const credencial = await signInWithEmailAndPassword(auth, email, password);
        const docSnap = await getDoc(doc(db, "usuarios", credencial.user.uid));
        
        // Escudo protector: forzamos minúsculas
        const rolUsuario = docSnap.exists() ? docSnap.data().rol.toLowerCase() : 'alumno';
        
        setUsuarioActivo({ uid: credencial.user.uid, email: credencial.user.email, rol: rolUsuario });
        setEmail('');
        setPassword('');
        setMensaje('');
      } catch (error) { 
        mostrarMensaje('Error: Credenciales incorrectas.', 'error');
      }
    };

    // --- NUEVA FUNCIÓN: EL ADMIN ASIGNA UN ROL ---
    const asignarRolAdmin = async (e) => {
      e.preventDefault();
      const emailAsignar = e.target.emailAsignar.value.toLowerCase();
      const rolAsignar = e.target.rolAsignar.value;

      try {
        await setDoc(doc(db, "roles_asignados", emailAsignar), {
          correo: emailAsignar,
          rol: rolAsignar,
          asignadoPor: usuarioActivo.email,
          fecha: new Date().toISOString()
        });

        const q = query(collection(db, "usuarios"), where("correo", "==", emailAsignar));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(async (documento) => {
          await updateDoc(doc(db, "usuarios", documento.id), {
            rol: rolAsignar
          });
        });

        mostrarMensaje(`Rol ${rolAsignar.toUpperCase()} asignado a ${emailAsignar}`, 'success');
        e.target.reset();
      } catch (error) {
        mostrarMensaje('Error al asignar rol: ' + error.message, 'error');
      }
    };

  // --- FUNCIÓN: ACTUALIZAR ROL DIRECTO EN LA TABLA ---
    const actualizarRolUsuario = async (userId, nuevoRol, correo) => {
      try {
        await updateDoc(doc(db, "usuarios", userId), { rol: nuevoRol });

        await setDoc(doc(db, "roles_asignados", correo), {
          correo: correo,
          rol: nuevoRol,
          asignadoPor: usuarioActivo.email,
          fecha: new Date().toISOString()
        });

        // ¡NUEVO! Notificamos al usuario del cambio en su cuenta
        await crearNotificacion(
          correo,
          '🛡️ Permisos Actualizados',
          `Un administrador ha cambiado tu nivel de acceso a: ${nuevoRol.toUpperCase()}. Cierra sesión y vuelve a entrar para ver los cambios.`
        );

        mostrarMensaje(`Permisos de ${correo} actualizados a ${nuevoRol.toUpperCase()}`, 'success');
      } catch (error) {
        mostrarMensaje('Error al actualizar: ' + error.message, 'error');
      }
    };

    // --- FUNCIÓN: ELIMINAR USUARIO DEL SISTEMA ---
    const eliminarUsuarioDB = async (userId, correo) => {
      if (confirm(`¿Estás seguro de que deseas revocar el acceso a ${correo}?\n\nEsto borrará sus permisos de la base de datos.`)) {
        try {
          await deleteDoc(doc(db, "usuarios", userId));
          // Opcional: También borrar de la lista de roles asignados
          await deleteDoc(doc(db, "roles_asignados", correo)); 
          mostrarMensaje(`Acceso revocado a ${correo}`, 'success');
        } catch (error) {
          mostrarMensaje('Error al eliminar: ' + error.message, 'error');
        }
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

  // --- FUNCIONES DE NOTIFICACIONES ---
    const crearNotificacion = async (para, titulo, descripcion) => {
      try {
        await addDoc(collection(db, "notificaciones"), {
          para,
          titulo,
          descripcion,
          leida: false,
          fecha: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error al crear notificación:', error);
      }
    };

    // --- NUEVA FUNCIÓN: MARCAR COMO LEÍDA ---
    const marcarNotificacionLeida = async (id) => {
      try {
        await updateDoc(doc(db, "notificaciones", id), {
          leida: true
        });
        // El estado local se actualiza solo gracias al onSnapshot que ya tienes configurado
      } catch (error) {
        console.error('Error al marcar notificación:', error);
      }
    };

    // --- FUNCIÓN PARA CANCELAR SOLICITUDES PENDIENTES PROPIAS ---
    const cancelarSolicitudPropia = async (id, coleccion, detalle) => {
      if (confirm('¿Deseas cancelar esta solicitud?')) {
        try {
          await deleteDoc(doc(db, coleccion, id));
          // Le avisamos al admin que el usuario se arrepintió
          await crearNotificacion(
            'admin', 
            '❌ Solicitud Retirada', 
            `${usuarioActivo.email} canceló su solicitud de: ${detalle}`
          );
          mostrarMensaje('Solicitud cancelada correctamente', 'success');
        } catch (error) { 
          mostrarMensaje('Error al cancelar', 'error'); 
        }
      }
    };


  // --- FUNCIONES DE MATERIALES ---
    const crearSolicitudMaterial = async (e) => {
      e.preventDefault();
      try {
        const equipoId = e.target.equipoId.value;
        const cantidad = parseInt(e.target.cantidad.value);
        const tiempoUso = e.target.tiempoUso.value;
        const motivo = e.target.motivo.value; 
        
        const equipo = listaEquipos.find(eq => eq.id === equipoId);

        if (equipo.cantidad < cantidad) {
          mostrarMensaje(`Error: Solo hay ${equipo.cantidad} unidades de ${equipo.nombre}.`, 'error');
          return;
        }
        
        const ahora = new Date();
        const fechaDevolucion = new Date(ahora.getTime() + parseInt(tiempoUso) * 60 * 60 * 1000);
        
        await addDoc(collection(db, "solicitudes_material"), {
          equipoId,
          equipoNombre: equipo.nombre,
          cantidad,
          tiempoUso: parseInt(tiempoUso),
          motivo: motivo, 
          solicitadoPor: usuarioActivo.email,
          estado: 'Pendiente',
          devuelto: false,
          fechaSolicitud: ahora.toISOString(),
          fechaDevolucionEsperada: fechaDevolucion.toISOString()
        });
        
        await crearNotificacion(
          'admin',
          ' Nueva Solicitud de Material',
          `${usuarioActivo.email} solicitó ${cantidad}x ${equipo.nombre}. Motivo: ${motivo}`
        );
        
        e.target.reset();
        mostrarMensaje(' Solicitud enviada al administrador.', 'success');
        setShowFormSolicitudMaterial(false);
      } catch (error) {
        console.error('Error al crear solicitud:', error);
        mostrarMensaje('Error al crear solicitud de material', 'error');
      }
    };

    const aprobarSolicitudMaterial = async (id) => {
      try {
        const solicitud = listaSolicitudesMaterial.find(s => s.id === id);
        const equipo = listaEquipos.find(e => e.id === solicitud.equipoId);
        
        if (equipo.cantidad < solicitud.cantidad) {
          mostrarMensaje(`No hay suficiente stock. Disponibles: ${equipo.cantidad}`, 'error');
          return;
        }

        // Restar stock
        const nuevaCantidad = equipo.cantidad - solicitud.cantidad;
        await updateDoc(doc(db, "equipos", equipo.id), {
          cantidad: nuevaCantidad,
          estado: nuevaCantidad === 0 ? 'Sin Stock' : equipo.estado
        });

        await updateDoc(doc(db, "solicitudes_material", id), {
          estado: 'Aprobada',
          fechaAprobacion: new Date().toISOString()
        });
        
        await crearNotificacion(
          solicitud.solicitadoPor,
          ' Material Aprobado',
          `Tu solicitud para ${solicitud.cantidad}x ${equipo.nombre} fue aprobada.`
        );
        
        mostrarMensaje('Solicitud aprobada y stock restado.', 'success');
      } catch (error) {
        console.error('Error al aprobar:', error);
        mostrarMensaje('Error al aprobar solicitud', 'error');
      }
    };

    const rechazarSolicitudMaterial = async (id) => {
      try {
        const solicitud = listaSolicitudesMaterial.find(s => s.id === id);
        const equipo = listaEquipos.find(e => e.id === solicitud.equipoId);
        
        await updateDoc(doc(db, "solicitudes_material", id), {
          estado: 'Rechazada',
          fechaRechazo: new Date().toISOString()
        });
        
        await crearNotificacion(
          solicitud.solicitadoPor,
          ' Material Rechazado',
          `Tu solicitud para ${equipo?.nombre || 'el material'} fue rechazada.`
        );
        
        mostrarMensaje(' Solicitud rechazada', 'warning');
      } catch (error) {
        console.error('Error al rechazar:', error);
        mostrarMensaje('Error al rechazar solicitud', 'error');
      }
    };

    const registrarDevolucionMaterial = async (id) => {
      try {
        const solicitud = listaSolicitudesMaterial.find(s => s.id === id);
        const equipo = listaEquipos.find(e => e.id === solicitud.equipoId);
        
        // Sumar stock de regreso
        const nuevaCantidad = (equipo.cantidad || 0) + solicitud.cantidad;
        await updateDoc(doc(db, "equipos", equipo.id), {
          cantidad: nuevaCantidad,
          estado: 'Disponible' 
        });

        await updateDoc(doc(db, "solicitudes_material", id), {
          devuelto: true,
          fechaDevolucionReal: new Date().toISOString()
        });
        
        await crearNotificacion(
          solicitud.solicitadoPor,
          ' Devolución Exitosa',
          `El admin confirmó la devolución de ${solicitud.cantidad}x ${equipo.nombre}.`
        );
        
        mostrarMensaje('Material devuelto y stock actualizado.', 'success');
      } catch (error) {
        console.error('Error en devolución:', error);
        mostrarMensaje('Error al registrar devolución', 'error');
      }
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
        if (confirm('¿Estás seguro de cancelar esta reserva? El horario quedará liberado.')) {
          try {
            const reserva = listaReservas.find(r => r.id === id);
            await deleteDoc(doc(db, "reservas", id));
            
            // Notificación inteligente: Si el dueño cancela -> avisa al admin. Si admin cancela -> avisa al dueño.
            const destinatario = usuarioActivo.email === reserva.reservadoPor ? 'admin' : reserva.reservadoPor;
            await crearNotificacion(
              destinatario,
              ' Horario Liberado / Cancelación',
              `Se canceló la reserva de ${reserva.aulaNombre} el ${reserva.fecha} (${reserva.horaInicio} - ${reserva.horaFin}).`
            );
            mostrarMensaje('Reserva cancelada y horario liberado', 'success');
          } catch (error) { 
            mostrarMensaje('Error al cancelar reserva', 'error');
          }
        }
      };

    // --- FUNCIONES DE INVENTARIO ---
    const eliminarEquipo = async (equipoId) => {
      if (!window.confirm('¿Estás seguro que deseas eliminar este equipo del inventario?')) return;
      try {
        await deleteDoc(doc(db, "equipos", equipoId));
        setListaEquipos(listaEquipos.filter(eq => eq.id !== equipoId));
        mostrarMensaje('Equipo eliminado correctamente', 'success');
      } catch (error) {
        console.error('Error al eliminar equipo:', error);
        mostrarMensaje('Error al eliminar equipo', 'error');
      }
    };

    const actualizarCantidadEquipo = async (equipoId, nuevaCantidad) => {
      try {
        await updateDoc(doc(db, "equipos", equipoId), {
          cantidad: nuevaCantidad
        });
        setListaEquipos(listaEquipos.map(eq =>
          eq.id === equipoId ? {...eq, cantidad: nuevaCantidad} : eq
        ));
        mostrarMensaje('Cantidad actualizada', 'success');
      } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        mostrarMensaje('Error al actualizar cantidad', 'error');
      }
    };

    const enviarNotificacionesPorAtrasos = async () => {
        const ahora = new Date();
        
        // CORRECCIÓN: Buscamos en 'listaSolicitudesMaterial', no en 'listaReservas'
        const atrasados = listaSolicitudesMaterial.filter(s => 
          s.estado === 'Aprobada' && !s.devuelto && new Date(s.fechaDevolucionEsperada) < ahora
        );
        
        if (atrasados.length === 0) {
          mostrarMensaje('No hay materiales atrasados', 'info');
          return;
        }

        try {
          for (const material of atrasados) {
            // Usamos tu función crearNotificacion para que use el formato correcto
            await crearNotificacion(
              material.solicitadoPor,
              '⚠️ Material Atrasado',
              `Atención: No has devuelto el material "${material.equipoNombre}" (x${material.cantidad}). Su préstamo venció el ${new Date(material.fechaDevolucionEsperada).toLocaleString('es-ES', {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}.`
            );
          }
          mostrarMensaje(`Se enviaron ${atrasados.length} recordatorios a los alumnos morosos`, 'success');
        } catch (error) {
          console.error('Error al enviar notificaciones:', error);
          mostrarMensaje('Error al enviar notificaciones', 'error');
        }
      };

    // --- FUNCIONES DE SOLICITUDES DE AULAS (Con auto-reserva) ---
      const crearSolicitud = async (e) => {
        e.preventDefault();
        const tipo = e.target.tipo.value;
        const descripcion = e.target.descripcion.value;
        const fechaSolicitada = e.target.fechaSolicitada?.value || '';
        const aulaNombre = e.target.aulaNombre?.value || '';
        const aulaId = e.target.aulaId?.value || '';
        const horaInicio = e.target.horaInicio?.value || '';
        const horaFin = e.target.horaFin?.value || '';

        try {
          // Si es Maestro o Admin -> ¡Reserva Directa sin pedir permiso!
          if (usuarioActivo.rol === 'maestro' || usuarioActivo.rol === 'admin') {
            const aulaSeleccionada = listaAulas.find(a => a.id === aulaId);
            await addDoc(collection(db, "reservas"), {
              aulaId, aulaNombre, fecha: fechaSolicitada, horaInicio, horaFin, descripcion,
              aulaCapacidad: aulaSeleccionada?.capacidad || 0,
              aulaEquipo: aulaSeleccionada?.equipoDisponible || '',
              reservadoPor: usuarioActivo.email, nombreReservador: usuarioActivo.email.split('@')[0],
              rol: usuarioActivo.rol, estado: 'Confirmada', fechaReserva: new Date().toISOString()
            });
            await crearNotificacion('admin', ' Reserva Directa Creada', `${usuarioActivo.email} reservó el aula ${aulaNombre} para el ${fechaSolicitada} (${horaInicio} - ${horaFin}).`);
            mostrarMensaje('Reserva confirmada exitosamente.', 'success');
          } 
          // Si es Alumno -> Crea Solicitud Pendiente
          else {
            await addDoc(collection(db, "solicitudes"), {
              tipo, descripcion, fechaSolicitada, aulaNombre, aulaId, horaInicio, horaFin,
              solicitadoPor: usuarioActivo.email, nombreSolicitador: usuarioActivo.email.split('@')[0],
              rol: usuarioActivo.rol, estado: 'Pendiente', fechaSolicitud: new Date().toISOString()
            });
            await crearNotificacion('admin', '  Nueva Solicitud de Aula', `${usuarioActivo.email} pide el aula ${aulaNombre} para el ${fechaSolicitada} (${horaInicio} - ${horaFin}).`);
            mostrarMensaje('Solicitud enviada al administrador.', 'success');
          }
          
          e.target.reset();
          setShowSolicitudDesdeAula(false);
          setHorarioSeleccionado(null);
        } catch (error) { 
          mostrarMensaje('Error al procesar la petición', 'error');
        }
      };

    const aprobarSolicitud = async (id) => {
      try {
        const solicitudDoc = await getDoc(doc(db, "solicitudes", id));
        const solicitud = solicitudDoc.data();
        
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
          
          const reservaRef = await addDoc(collection(db, "reservas"), nuevaReserva);
          
          await updateDoc(doc(db, "solicitudes", id), {
            estado: 'Aprobada',
            fechaAprobacion: new Date().toISOString(),
            reservaId: reservaRef.id
          });
          
          // NOTIFICACIÓN AL USUARIO
          await crearNotificacion(
            solicitud.solicitadoPor,
            ' Reserva Confirmada',
            `¡Listo! Tu reserva para el aula ${solicitud.aulaNombre} el día ${solicitud.fechaSolicitada} (${solicitud.horaInicio} - ${solicitud.horaFin}) ha sido aprobada.`
          );
          
          setListaReservas([{...nuevaReserva, id: reservaRef.id}, ...listaReservas]);
          setListaSolicitudes(listaSolicitudes.map(s => 
            s.id === id ? {...s, estado: 'Aprobada'} : s
          ));
          
          mostrarMensaje('Solicitud aprobada y reserva creada', 'success');
        }
      } catch (error) { 
        console.error('Error al aprobar solicitud:', error);
        mostrarMensaje('Error al aprobar solicitud: ' + error.message, 'error');
      }
    };

    const rechazarSolicitud = async (id) => {
      try {
        const solicitudDoc = await getDoc(doc(db, "solicitudes", id));
        const solicitud = solicitudDoc.data();

        await updateDoc(doc(db, "solicitudes", id), {
          estado: 'Rechazada',
          fechaRechazo: new Date().toISOString()
        });
        
        // NOTIFICACIÓN AL USUARIO
        await crearNotificacion(
          solicitud.solicitadoPor,
          ' Reserva Rechazada',
          `Lo sentimos, tu solicitud para el aula ${solicitud.aulaNombre} el ${solicitud.fechaSolicitada} fue rechazada por el administrador.`
        );
        
        setListaSolicitudes(listaSolicitudes.map(s => 
          s.id === id ? {...s, estado: 'Rechazada'} : se
        ));
        
        mostrarMensaje('Solicitud rechazada', 'success');
      } catch (error) { 
        console.error('Error al rechazar solicitud:', error);
        mostrarMensaje('Error al rechazar solicitud', 'error');
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
      // SOLUCION: Generamos la fecha exacta de tu zona horaria local
      const fechaActual = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
      const esHoy = fecha === fechaActual;
      
      console.log('Generando horarios para aula:', aula, 'fecha:', fecha);
      
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
          console.log(` Encontrada solicitud para ${horaInicio}:`, solicitud);
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
      // Escudo de seguridad recuperado
      const rolNormalizado = usuarioActivo.rol?.toLowerCase() || 'alumno';
      const permisos = PERMISOS[rolNormalizado] || PERMISOS.alumno;
      
      const rolBadgeClass = {
        admin: 'badge-admin',
        maestro: 'badge-maestro',
        alumno: 'badge-alumno'
      }[rolNormalizado] || 'badge-alumno';
      // --- NUEVO RADAR DE ATRASOS EN PANTALLA ---
      const ahoraMismo = new Date();
      const materialesAtrasadosMios = listaSolicitudesMaterial.filter(s => 
        s.solicitadoPor === usuarioActivo.email && 
        s.estado === 'Aprobada' && 
        !s.devuelto && 
        new Date(s.fechaDevolucionEsperada) < ahoraMismo
      );

      // --- MAGIA DINÁMICA: FILTRO INTELIGENTE DE NOTIFICACIONES ---
      // Si soy admin, veo las mías Y las que van dirigidas al rol 'admin'
      const misNotificaciones = listaNotificaciones.filter(n => 
        n.para === usuarioActivo.email || (rolNormalizado === 'admin' && n.para === 'admin')
      );
      const notificacionesNoLeidas = misNotificaciones.filter(n => !n.leida).length;

      return (
        <div className="dashboard-layout">
          <aside className="sidebar">
            <div className="sidebar-header">
              <h2> LabReserve </h2>
              <div className={`role-badge ${rolBadgeClass}`}>
                {usuarioActivo.rol.toUpperCase()}
              </div>
            </div>
            <nav className="sidebar-menu">
              <button className={`menu-btn ${vistaActual === 'inicio' ? 'activo' : ''}`} onClick={() => setVistaActual('inicio')}>Inicio</button>
              {usuarioActivo.rol === 'admin' && (<button className={`menu-btn ${vistaActual === 'roles' ? 'activo' : ''}`} onClick={() => setVistaActual('roles')}>Gestión de Roles</button>)}
              {permisos.gestionAulas && (<button className={`menu-btn ${vistaActual === 'aulas' ? 'activo' : ''}`} onClick={() => setVistaActual('aulas')}>Aulas</button>)}
              {permisos.gestionEquipos && (<button className={`menu-btn ${vistaActual === 'equipos' ? 'activo' : ''}`} onClick={() => setVistaActual('equipos')}>Inventario</button>)}
              <button className={`menu-btn ${vistaActual === 'aulasReservadas' ? 'activo' : ''}`} onClick={() => setVistaActual('aulasReservadas')}>Aulas Reservadas</button>
              <button className={`menu-btn ${vistaActual === 'aulasPúblicas' ? 'activo' : ''}`} onClick={() => setVistaActual('aulasPúblicas')}>Aulas Disponibles</button>
              {permisos.solicitarEquipos && (<button className={`menu-btn ${vistaActual === 'solicitudes' ? 'activo' : ''}`} onClick={() => setVistaActual('solicitudes')}>Mis Solicitudes</button>)}
              {(permisos.verInventario || permisos.solicitarEquipos) && (<button className={`menu-btn ${vistaActual === 'inventario' ? 'activo' : ''}`} onClick={() => setVistaActual('inventario')}>Inventario</button>)}
              {permisos.verSolicitudes && (<button className={`menu-btn ${vistaActual === 'solicitudesAdmin' ? 'activo' : ''}`} onClick={() => setVistaActual('solicitudesAdmin')}>Solicitudes ({listaSolicitudes.filter(s => s.estado === 'Pendiente').length})</button>)}
              {permisos.verReservas && (<button className={`menu-btn ${vistaActual === 'reservasAdmin' ? 'activo' : ''}`} onClick={() => setVistaActual('reservasAdmin')}>Todas las Reservas</button>)}

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
                {usuarioActivo && (
                  <div style={{position: 'relative'}}>
                    <button 
                      onClick={() => setShowModalNotificaciones(!showModalNotificaciones)}
                      style={{
                        background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', 
                        padding: '5px', transition: 'transform 0.2s',
                        transform: showModalNotificaciones ? 'scale(1.1)' : 'scale(1)'
                      }}
                    >
                      🔔
                      {notificacionesNoLeidas > 0 && (
                        <span style={{
                          position: 'absolute', top: '0', right: '-5px',
                          backgroundColor: '#ef4444', color: 'white', borderRadius: '50%',
                          width: '20px', height: '20px', display: 'flex', alignItems: 'center', 
                          justifyContent: 'center', fontSize: '12px', fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}>
                          {notificacionesNoLeidas}
                        </span>
                      )}
                    </button>

                    {/* EL NUEVO PANEL DE NOTIFICACIONES */}
                    {showModalNotificaciones && (
                      <div style={{
                        position: 'absolute', top: '50px', right: '0', width: '350px',
                        backgroundColor: 'white', borderRadius: '12px',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.15)', zIndex: 1000,
                        overflow: 'hidden', border: '1px solid #e2e8f0',
                        maxHeight: '500px', display: 'flex', flexDirection: 'column'
                      }}>
                        <div style={{padding: '15px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                          <h3 style={{margin: 0, fontSize: '16px', color: '#1e293b'}}>Mis Notificaciones</h3>
                          <button onClick={() => setShowModalNotificaciones(false)} style={{background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 'bold'}}>✕</button>
                        </div>
                        
                        <div style={{flex: 1, overflowY: 'auto', padding: '0'}}>
                          {misNotificaciones.length === 0 ? (
                            <div style={{textAlign: 'center', padding: '40px 20px', color: '#94a3b8'}}>
                              <p style={{fontSize: '30px', margin: '0 0 10px 0'}}>📭</p>
                              <p style={{margin: 0}}>Bandeja vacía</p>
                            </div>
                          ) : (
                            misNotificaciones.map(notif => (
                              <div key={notif.id} style={{
                                padding: '15px 20px', 
                                borderBottom: '1px solid #f1f5f9',
                                backgroundColor: notif.leida ? '#ffffff' : '#f0f9ff',
                                transition: 'background-color 0.3s'
                              }}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                  <div>
                                    <h4 style={{margin: '0 0 5px 0', fontSize: '14px', color: notif.leida ? '#475569' : '#0369a1', fontWeight: notif.leida ? 'normal' : 'bold'}}>
                                      {notif.titulo}
                                    </h4>
                                    <p style={{margin: '0 0 8px 0', fontSize: '13px', color: '#64748b', lineHeight: '1.4'}}>
                                      {notif.descripcion}
                                    </p>
                                    <small style={{color: '#94a3b8', fontSize: '11px'}}>
                                      {notif.fecha ? new Date(notif.fecha).toLocaleString('es-ES') : ''}
                                    </small>
                                  </div>
                                  {!notif.leida && (
                                    <button 
                                      onClick={() => marcarNotificacionLeida(notif.id)}
                                      style={{
                                        background: 'none', border: 'none', color: '#3b82f6', 
                                        cursor: 'pointer', fontSize: '12px', fontWeight: 'bold',
                                        padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap'
                                      }}
                                    >
                                      ✔ Leída
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
  </header>

            {/* --- ALERTA GIGANTE DE MATERIAL VENCIDO (NUEVO) --- */}
            {materialesAtrasadosMios.length > 0 && (
              <div style={{
                backgroundColor: '#fef2f2', border: '2px solid #ef4444', color: '#991b1b',
                padding: '20px', margin: '20px 30px 0 30px', borderRadius: '8px',
                display: 'flex', alignItems: 'center', gap: '20px',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
              }}>
                <div style={{fontSize: '40px'}}>⚠️</div>
                <div>
                  <h3 style={{margin: '0 0 5px 0', fontSize: '18px', color: '#7f1d1d', fontWeight: 'bold'}}>¡ATENCIÓN! Tienes material vencido</h3>
                  <p style={{margin: '0 0 10px 0', fontSize: '14px'}}>Debes devolver el siguiente material al administrador inmediatamente:</p>
                  <ul style={{margin: 0, paddingLeft: '20px', fontSize: '13px'}}>
                    {materialesAtrasadosMios.map(mat => (
                      <li key={mat.id}>
                        <strong>{mat.equipoNombre} (x{mat.cantidad})</strong> - Debió entregarse el {new Date(mat.fechaDevolucionEsperada).toLocaleString('es-ES', {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute:'2-digit'})}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {mensaje && (
              <div className={`alert alert-${tipoMensaje}`} style={{margin: '20px 30px 0 30px'}}>
                {mensaje}
              </div>
            )}

            <div className="content-area">
  {/* ============ VISTA INICIO (DASHBOARD) ============ */}
              {vistaActual === 'inicio' && (
                <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                  <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

                    @keyframes slideUp {
                      from { opacity: 0; transform: translateY(20px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes expandBar {
                      from { width: 0; }
                    }
                    @keyframes fadeInItem {
                      from { opacity: 0; transform: translateX(-8px); }
                      to   { opacity: 1; transform: translateX(0); }
                    }

                    .lab-stat-card {
                      background: #ffffff;
                      border-radius: 6px;
                      padding: 28px 28px 24px;
                      border: 1px solid #e4e8ef;
                      position: relative;
                      overflow: hidden;
                      transition: box-shadow 0.25s ease, transform 0.25s ease;
                    }
                    .lab-stat-card:hover {
                      box-shadow: 0 8px 28px rgba(15,23,42,0.09);
                      transform: translateY(-3px);
                    }
                    .lab-stat-card .accent-line {
                      position: absolute;
                      left: 0; top: 0; bottom: 0;
                      width: 3px;
                      background: var(--line-color);
                    }

                    .lab-action-row {
                      display: flex;
                      align-items: center;
                      gap: 14px;
                      padding: 13px 16px;
                      border-radius: 6px;
                      border: 1px solid #e9edf3;
                      background: #fafbfc;
                      cursor: pointer;
                      transition: all 0.2s ease;
                      width: 100%;
                      text-align: left;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .lab-action-row:hover {
                      background: #ffffff;
                      border-color: #94a3b8;
                      box-shadow: 0 2px 12px rgba(15,23,42,0.07);
                    }

                    .lab-activity-row {
                      display: flex;
                      align-items: flex-start;
                      gap: 12px;
                      padding: 13px 0;
                      border-bottom: 1px solid #f1f5f9;
                      opacity: 0;
                      animation: fadeInItem 0.4s ease forwards;
                    }
                    .lab-activity-row:last-child {
                      border-bottom: none;
                    }

                    .lab-dot-unread {
                      width: 6px; height: 6px; border-radius: 50%;
                      background: #2563eb; flex-shrink: 0; margin-top: 6px;
                    }
                    .lab-dot-read {
                      width: 6px; height: 6px; border-radius: 50%;
                      background: #e2e8f0; flex-shrink: 0; margin-top: 6px;
                    }
                    
                    .lab-section-label {
                      font-size: 10px;
                      font-weight: 600;
                      letter-spacing: 1.4px;
                      text-transform: uppercase;
                      color: #94a3b8;
                      margin: 0 0 16px 0;
                      font-family: 'DM Sans', sans-serif;
                    }
                  `}</style>

                  {/* ── HEADER BANNER ── */}
                  <div style={{
                    background: 'linear-gradient(100deg, #0f172a 0%, #1e293b 60%, #1e3a5f 100%)',
                    borderRadius: '6px',
                    padding: '36px 40px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    flexWrap: 'wrap',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'slideUp 0.5s ease forwards',
                  }}>
                    {/* Subtle grid texture */}
                    <div style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                      backgroundSize: '40px 40px'
                    }} />
                    {/* Glow accent */}
                    <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: '"DM Sans", sans-serif' }}>
                        Panel de Control
                      </p>
                      <h2 style={{
                        margin: '0 0 10px 0',
                        fontSize: '26px',
                        fontWeight: '400',
                        color: '#ffffff',
                        fontFamily: '"DM Serif Display", serif',
                        letterSpacing: '0.2px',
                        lineHeight: '1.25'
                      }}>
                        Bienvenido, <span style={{ fontStyle: 'italic' }}>{usuarioActivo.email.split('@')[0]}</span>
                      </h2>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '13.5px', fontFamily: '"DM Sans", sans-serif' }}>
                        Sistema de Gestión de Laboratorio — LabReserve
                      </p>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Sans", sans-serif' }}>
                        Nivel de Acceso
                      </span>
                      <div style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '4px',
                        padding: '8px 20px',
                      }}>
                        <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>
                          {usuarioActivo.rol}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}>Sistema en línea</span>
                      </div>
                    </div>
                  </div>

                  {/* ── STATS GRID ── */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', marginBottom: '20px' }}>

                    {/* Aulas */}
                    <div className="lab-stat-card" style={{ '--line-color': '#2563eb', animation: 'slideUp 0.4s ease 0.1s forwards', opacity: 0 }}>
                      <div className="accent-line" />
                      <div style={{ paddingLeft: '4px' }}>
                        <p className="lab-section-label">Aulas Registradas</p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
                          <span style={{ fontSize: '40px', fontWeight: '300', color: '#0f172a', lineHeight: 1, fontFamily: '"DM Serif Display", serif' }}>
                            {listaAulas.length}
                          </span>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                          </svg>
                        </div>
                        <div style={{ height: '2px', background: '#f1f5f9', borderRadius: '1px' }}>
                          <div style={{ height: '100%', background: '#2563eb', borderRadius: '1px', width: `${Math.min((listaAulas.length / 10) * 100, 100)}%`, animation: 'expandBar 1s ease 0.4s both' }} />
                        </div>
                        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>espacios disponibles</p>
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="lab-stat-card" style={{ '--line-color': '#059669', animation: 'slideUp 0.4s ease 0.18s forwards', opacity: 0 }}>
                      <div className="accent-line" />
                      <div style={{ paddingLeft: '4px' }}>
                        <p className="lab-section-label">Unidades en Stock</p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
                          <span style={{ fontSize: '40px', fontWeight: '300', color: '#0f172a', lineHeight: 1, fontFamily: '"DM Serif Display", serif' }}>
                            {listaEquipos.reduce((t, eq) => t + (eq.cantidad || 0), 0)}
                          </span>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                          </svg>
                        </div>
                        <div style={{ height: '2px', background: '#f1f5f9', borderRadius: '1px' }}>
                          <div style={{ height: '100%', background: '#059669', borderRadius: '1px', width: '72%', animation: 'expandBar 1s ease 0.5s both' }} />
                        </div>
                        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>equipos y materiales</p>
                      </div>
                    </div>

                    {/* Reservas */}
                    <div className="lab-stat-card" style={{ '--line-color': '#d97706', animation: 'slideUp 0.4s ease 0.26s forwards', opacity: 0 }}>
                      <div className="accent-line" />
                      <div style={{ paddingLeft: '4px' }}>
                        <p className="lab-section-label">Reservas Confirmadas</p>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
                          <span style={{ fontSize: '40px', fontWeight: '300', color: '#0f172a', lineHeight: 1, fontFamily: '"DM Serif Display", serif' }}>
                            {listaReservas.filter(r => r.estado === 'Confirmada').length}
                          </span>
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                          </svg>
                        </div>
                        <div style={{ height: '2px', background: '#f1f5f9', borderRadius: '1px' }}>
                          <div style={{ height: '100%', background: '#d97706', borderRadius: '1px', width: `${Math.min((listaReservas.filter(r => r.estado === 'Confirmada').length / 20) * 100, 100)}%`, animation: 'expandBar 1s ease 0.6s both' }} />
                        </div>
                        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>reservas activas</p>
                      </div>
                    </div>

                    {/* 4ta tarjeta dinámica */}
                    {(rolNormalizado === 'admin' || rolNormalizado === 'maestro') ? (
                      <div className="lab-stat-card" style={{ '--line-color': '#dc2626', animation: 'slideUp 0.4s ease 0.34s forwards', opacity: 0 }}>
                        <div className="accent-line" />
                        <div style={{ paddingLeft: '4px' }}>
                          <p className="lab-section-label">Solicitudes Pendientes</p>
                          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
                            <span style={{ fontSize: '40px', fontWeight: '300', lineHeight: 1, fontFamily: '"DM Serif Display", serif', color: listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length > 0 ? '#dc2626' : '#0f172a' }}>
                              {listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length}
                            </span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                            </svg>
                          </div>
                          <div style={{ height: '2px', background: '#f1f5f9', borderRadius: '1px' }}>
                            <div style={{ height: '100%', background: '#dc2626', borderRadius: '1px', width: `${Math.min(((listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length) / 10) * 100, 100)}%`, animation: 'expandBar 1s ease 0.7s both' }} />
                          </div>
                          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>requieren atención</p>
                        </div>
                      </div>
                    ) : (
                      <div className="lab-stat-card" style={{ '--line-color': '#7c3aed', animation: 'slideUp 0.4s ease 0.34s forwards', opacity: 0 }}>
                        <div className="accent-line" />
                        <div style={{ paddingLeft: '4px' }}>
                          <p className="lab-section-label">Mis Solicitudes</p>
                          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '18px' }}>
                            <span style={{ fontSize: '40px', fontWeight: '300', color: '#0f172a', lineHeight: 1, fontFamily: '"DM Serif Display", serif' }}>
                              {listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).length + listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).length}
                            </span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                            </svg>
                          </div>
                          <div style={{ height: '2px', background: '#f1f5f9', borderRadius: '1px' }}>
                            <div style={{ height: '100%', background: '#7c3aed', borderRadius: '1px', width: '45%', animation: 'expandBar 1s ease 0.7s both' }} />
                          </div>
                          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>trámites enviados</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── BOTTOM ROW ── */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px', animation: 'slideUp 0.4s ease 0.42s forwards', opacity: 0 }}>

                    {/* Acciones rápidas */}
                    <div style={{ background: '#ffffff', borderRadius: '6px', padding: '26px', border: '1px solid #e4e8ef' }}>
                      <p className="lab-section-label">Acceso Directo</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                        <button className="lab-action-row" onClick={() => setVistaActual('aulasPúblicas')}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>Consultar Disponibilidad</div>
                            <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>Ver horarios de aulas</div>
                          </div>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>

                        {permisos.solicitarEquipos && (
                          <button className="lab-action-row" onClick={() => setVistaActual('inventario')}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: '#f0fdf6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                              </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>Solicitar Material</div>
                              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>Préstamo de equipos</div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        )}

                        {permisos.verSolicitudes && (
                          <button className="lab-action-row" onClick={() => setVistaActual('solicitudesAdmin')}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: '#fff5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                              </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>Gestionar Solicitudes</div>
                              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                                {listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length} pendiente(s) de revisión
                              </div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        )}

                        {rolNormalizado === 'admin' && (
                          <button className="lab-action-row" onClick={() => setVistaActual('roles')}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                              </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>Gestión de Usuarios</div>
                              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{listaUsuarios.length} usuario(s) registrado(s)</div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        )}

                        {permisos.verReservas && (
                          <button className="lab-action-row" onClick={() => setVistaActual('reservasAdmin')}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                              </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>Todas las Reservas</div>
                              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>Historial completo</div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Actividad reciente */}
                    <div style={{ background: '#ffffff', borderRadius: '6px', padding: '26px', border: '1px solid #e4e8ef' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <p className="lab-section-label" style={{ margin: 0 }}>Actividad Reciente</p>
                        {misNotificaciones.filter(n => !n.leida).length > 0 && (
                          <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '600', fontFamily: '"DM Sans", sans-serif' }}>
                            {misNotificaciones.filter(n => !n.leida).length} sin leer
                          </span>
                        )}
                      </div>

                      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {misNotificaciones.length === 0 ? (
                          <div style={{ padding: '40px 0', textAlign: 'center' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                            </div>
                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>Sin actividad reciente</p>
                          </div>
                        ) : (
                          misNotificaciones.slice(0, 7).map((notif, idx) => (
                            <div className="lab-activity-row" key={notif.id} style={{ animationDelay: `${0.5 + idx * 0.07}s` }}>
                              <div className={notif.leida ? 'lab-dot-read' : 'lab-dot-unread'} />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                  fontSize: '13px',
                                  fontWeight: notif.leida ? '400' : '600',
                                  color: notif.leida ? '#64748b' : '#1e293b',
                                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                  fontFamily: '"DM Sans", sans-serif',
                                  marginBottom: '2px'
                                }}>
                                  {(notif.titulo || '').replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{1F300}-\u{1F9FF}]/gu, '').trim()}
                                </div>
                                <div style={{
                                  fontSize: '11.5px', color: '#94a3b8',
                                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                                  fontFamily: '"DM Sans", sans-serif'
                                }}>
                                  {(notif.descripcion || '').replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{1F300}-\u{1F9FF}]/gu, '').trim()}
                                </div>
                              </div>
                              <div style={{ fontSize: '11px', color: '#cbd5e1', flexShrink: 0, marginLeft: '12px', fontFamily: '"DM Sans", sans-serif', whiteSpace: 'nowrap' }}>
                                {notif.fecha ? new Date(notif.fecha).toLocaleString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}
  {/* ============ VISTA GESTIÓN DE ROLES (ADMIN) ============ */}
              {usuarioActivo.rol === 'admin' && vistaActual === 'roles' && (
                <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                  <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

                    @keyframes rolesSlideUp {
                      from { opacity: 0; transform: translateY(20px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes rolesFadeInRow {
                      from { opacity: 0; transform: translateX(-6px); }
                      to   { opacity: 1; transform: translateX(0); }
                    }

                    .roles-input {
                      width: 100%;
                      padding: 10px 14px;
                      border: 1px solid #dde2ea;
                      border-radius: 4px;
                      font-size: 13px;
                      font-family: 'DM Sans', sans-serif;
                      color: #1e293b;
                      background: #ffffff;
                      transition: border-color 0.2s ease, box-shadow 0.2s ease;
                      outline: none;
                      box-sizing: border-box;
                    }
                    .roles-input:focus {
                      border-color: #2563eb;
                      box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
                    }
                    .roles-input::placeholder {
                      color: #b0b8c8;
                    }

                    .roles-submit-btn {
                      padding: 10px 24px;
                      background: #0f172a;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      font-size: 13px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      letter-spacing: 0.3px;
                      transition: background 0.2s ease, transform 0.15s ease;
                      white-space: nowrap;
                      height: 40px;
                    }
                    .roles-submit-btn:hover {
                      background: #1e293b;
                      transform: translateY(-1px);
                    }

                    .roles-table {
                      width: 100%;
                      border-collapse: collapse;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .roles-table thead tr {
                      background: #f8fafc;
                      border-bottom: 1px solid #e4e8ef;
                    }
                    .roles-table thead th {
                      padding: 11px 16px;
                      text-align: left;
                      font-size: 10px;
                      font-weight: 600;
                      letter-spacing: 1.2px;
                      text-transform: uppercase;
                      color: #94a3b8;
                    }
                    .roles-table tbody tr {
                      border-bottom: 1px solid #f1f5f9;
                      transition: background 0.15s ease;
                      opacity: 0;
                      animation: rolesFadeInRow 0.35s ease forwards;
                    }
                    .roles-table tbody tr:hover {
                      background: #fafbfc;
                    }
                    .roles-table tbody tr:last-child {
                      border-bottom: none;
                    }
                    .roles-table td {
                      padding: 13px 16px;
                      font-size: 13px;
                      color: #334155;
                      vertical-align: middle;
                    }

                    .roles-select {
                      padding: 6px 10px;
                      border: 1px solid #e4e8ef;
                      border-radius: 4px;
                      font-size: 12px;
                      font-family: 'DM Sans', sans-serif;
                      color: #334155;
                      background: #fafbfc;
                      cursor: pointer;
                      transition: border-color 0.2s ease;
                      outline: none;
                      min-width: 130px;
                    }
                    .roles-select:focus {
                      border-color: #2563eb;
                      box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
                    }
                    .roles-select:disabled {
                      opacity: 0.5;
                      cursor: not-allowed;
                    }

                    .roles-revoke-btn {
                      padding: 6px 14px;
                      background: transparent;
                      color: #dc2626;
                      border: 1px solid #fca5a5;
                      border-radius: 4px;
                      font-size: 11px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      letter-spacing: 0.3px;
                      transition: all 0.2s ease;
                    }
                    .roles-revoke-btn:hover {
                      background: #fef2f2;
                      border-color: #dc2626;
                    }
                    .roles-revoke-btn:disabled {
                      opacity: 0.4;
                      cursor: not-allowed;
                    }

                    .roles-badge {
                      display: inline-block;
                      padding: 3px 10px;
                      border-radius: 3px;
                      font-size: 10px;
                      font-weight: 700;
                      letter-spacing: 0.8px;
                      text-transform: uppercase;
                    }
                    .roles-badge-admin   { background: #fef2f2; color: #dc2626; }
                    .roles-badge-maestro { background: #eff6ff; color: #2563eb; }
                    .roles-badge-alumno  { background: #f0fdf4; color: #16a34a; }
                  `}</style>

                  {/* ── PAGE HEADER ── */}
                  <div style={{
                    background: 'linear-gradient(100deg, #0f172a 0%, #1e293b 60%, #1e3a5f 100%)',
                    borderRadius: '6px',
                    padding: '32px 40px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    flexWrap: 'wrap',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'rolesSlideUp 0.5s ease forwards',
                  }}>
                    {/* Grid texture */}
                    <div style={{
                      position: 'absolute', inset: 0, pointerEvents: 'none',
                      backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                      backgroundSize: '40px 40px'
                    }} />
                    <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: '"DM Sans", sans-serif' }}>
                        Administración del Sistema
                      </p>
                      <h2 style={{
                        margin: '0 0 8px 0',
                        fontSize: '24px',
                        fontWeight: '400',
                        color: '#ffffff',
                        fontFamily: '"DM Serif Display", serif',
                        lineHeight: '1.25'
                      }}>
                        Gestión de <span style={{ fontStyle: 'italic' }}>Usuarios y Roles</span>
                      </h2>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
                        Asigna niveles de acceso y administra los permisos del sistema
                      </p>
                    </div>

                    {/* Stats mini */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Total usuarios', value: listaUsuarios.length },
                        { label: 'Administradores', value: listaUsuarios.filter(u => u.rol === 'admin').length },
                        { label: 'Maestros', value: listaUsuarios.filter(u => u.rol === 'maestro').length },
                        { label: 'Alumnos', value: listaUsuarios.filter(u => u.rol === 'alumno').length },
                      ].map((stat, i) => (
                        <div key={i} style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          padding: '10px 16px',
                          textAlign: 'center',
                          minWidth: '80px',
                        }}>
                          <div style={{ fontSize: '20px', fontWeight: '300', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '4px' }}>
                            {stat.value}
                          </div>
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── ASSIGN ROLE FORM ── */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e4e8ef',
                    borderRadius: '6px',
                    marginBottom: '20px',
                    overflow: 'hidden',
                    animation: 'rolesSlideUp 0.4s ease 0.1s forwards',
                    opacity: 0,
                  }}>
                    {/* Form header */}
                    <div style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      background: '#fafbfc'
                    }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                          <line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>Asignar Nivel de Acceso</div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                          Si el usuario ya tiene cuenta, su rol se actualiza de inmediato. Si aún no se registra, el rol se aplicará al momento de crear su cuenta.
                        </div>
                      </div>
                    </div>

                    {/* Form body */}
                    <div style={{ padding: '20px 24px' }}>
                      <form onSubmit={asignarRolAdmin}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px auto', gap: '12px', alignItems: 'flex-end' }}>
                          <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                              Correo Electrónico
                            </label>
                            <input
                              name="emailAsignar"
                              type="email"
                              className="roles-input"
                              placeholder="usuario@institucion.edu"
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                              Nivel de Acceso
                            </label>
                            <select name="rolAsignar" className="roles-input" required style={{ cursor: 'pointer' }}>
                              <option value="">Seleccionar rol...</option>
                              <option value="maestro">Maestro / Profesor</option>
                              <option value="admin">Administrador</option>
                              <option value="alumno">Alumno (sin privilegios)</option>
                            </select>
                          </div>
                          <button type="submit" className="roles-submit-btn">
                            Asignar Permisos
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* ── USERS TABLE ── */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e4e8ef',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    animation: 'rolesSlideUp 0.4s ease 0.2s forwards',
                    opacity: 0,
                  }}>
                    {/* Table header */}
                    <div style={{
                      padding: '16px 24px',
                      borderBottom: '1px solid #f1f5f9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#fafbfc'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                          </svg>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>Usuarios Registrados</div>
                          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{listaUsuarios.length} cuenta(s) en el sistema</div>
                        </div>
                      </div>

                      {/* Role filter pills */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[
                          { rol: 'admin',   label: 'Admin',   color: '#dc2626', bg: '#fef2f2' },
                          { rol: 'maestro', label: 'Maestro', color: '#2563eb', bg: '#eff6ff' },
                          { rol: 'alumno',  label: 'Alumno',  color: '#16a34a', bg: '#f0fdf4' },
                        ].map(({ rol, label, color, bg }) => {
                          const count = listaUsuarios.filter(u => u.rol === rol).length;
                          return (
                            <div key={rol} style={{ background: bg, border: `1px solid ${color}22`, borderRadius: '4px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: color, display: 'inline-block' }} />
                              <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {label}{count !== 1 ? 's' : ''}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Table */}
                    <div style={{ overflowX: 'auto' }}>
                      <table className="roles-table">
                        <thead>
                          <tr>
                            <th>Usuario</th>
                            <th>Nivel de Acceso</th>
                            <th>Registro</th>
                            <th style={{ textAlign: 'right' }}>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaUsuarios.length === 0 ? (
                            <tr style={{ opacity: 1 }}>
                              <td colSpan="4" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                                  </svg>
                                </div>
                                Cargando usuarios...
                              </td>
                            </tr>
                          ) : (
                            listaUsuarios.map((user, idx) => {
                              const esSelf = user.correo === usuarioActivo.email;
                              const rolClass = user.rol === 'admin' ? 'roles-badge-admin' : user.rol === 'maestro' ? 'roles-badge-maestro' : 'roles-badge-alumno';
                              return (
                                <tr key={user.id} style={{ animationDelay: `${0.25 + idx * 0.04}s` }}>
                                  {/* Usuario */}
                                  <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        background: user.rol === 'admin' ? '#fef2f2' : user.rol === 'maestro' ? '#eff6ff' : '#f0fdf4',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0,
                                        border: `1px solid ${user.rol === 'admin' ? '#fca5a5' : user.rol === 'maestro' ? '#93c5fd' : '#86efac'}`
                                      }}>
                                        <span style={{ fontSize: '12px', fontWeight: '700', color: user.rol === 'admin' ? '#dc2626' : user.rol === 'maestro' ? '#2563eb' : '#16a34a', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
                                          {user.correo.charAt(0)}
                                        </span>
                                      </div>
                                      <div>
                                        <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
                                          {user.correo.split('@')[0]}
                                          {esSelf && <span style={{ marginLeft: '6px', fontSize: '10px', color: '#94a3b8', fontWeight: '400' }}>(tú)</span>}
                                        </div>
                                        <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{user.correo}</div>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Rol */}
                                  <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <select
                                        value={user.rol}
                                        onChange={(e) => actualizarRolUsuario(user.id, e.target.value, user.correo)}
                                        className="roles-select"
                                        disabled={esSelf}
                                      >
                                        <option value="admin">Administrador</option>
                                        <option value="maestro">Maestro</option>
                                        <option value="alumno">Alumno</option>
                                      </select>
                                      <span className={`roles-badge ${rolClass}`}>{user.rol}</span>
                                    </div>
                                  </td>

                                  {/* Fecha */}
                                  <td style={{ color: '#64748b', fontSize: '12px', fontFamily: '"DM Sans", sans-serif' }}>
                                    {user.fechaRegistro
                                      ? new Date(user.fechaRegistro).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
                                      : <span style={{ color: '#cbd5e1' }}>—</span>}
                                  </td>

                                  {/* Acciones */}
                                  <td style={{ textAlign: 'right' }}>
                                    <button
                                      className="roles-revoke-btn"
                                      onClick={() => eliminarUsuarioDB(user.id, user.correo)}
                                      disabled={esSelf}
                                    >
                                      Revocar acceso
                                    </button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Table footer */}
                    {listaUsuarios.length > 0 && (
                      <div style={{ padding: '12px 24px', borderTop: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                          Mostrando {listaUsuarios.length} usuario(s)
                        </span>
                        <span style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif' }}>
                          Los cambios de rol se aplican de inmediato
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}



{permisos.gestionAulas && vistaActual === 'aulas' && (
  <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

      /* ── Keyframes ── */
      @keyframes auSlideUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes auFadeRow {
        from { opacity: 0; transform: translateX(-5px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes auExpandBar {
        from { width: 0; }
      }
      @keyframes auPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(5,150,105,0.4); }
        50%       { box-shadow: 0 0 0 6px rgba(5,150,105,0); }
      }

      /* ── Inputs ── */
      .au-input {
        width: 100%;
        padding: 9px 13px;
        border: 1px solid #dde2ea;
        border-radius: 4px;
        font-size: 13px;
        font-family: 'DM Sans', sans-serif;
        color: #1e293b;
        background: #ffffff;
        transition: border-color 0.2s, box-shadow 0.2s;
        outline: none;
        box-sizing: border-box;
      }
      .au-input:focus {
        border-color: #059669;
        box-shadow: 0 0 0 3px rgba(5,150,105,0.09);
      }
      .au-input::placeholder { color: #b8c0cc; }

      /* ── Buttons ── */
      .au-btn-dark {
        padding: 9px 20px;
        background: #0f172a;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        letter-spacing: 0.3px;
        transition: background 0.2s, transform 0.15s;
        white-space: nowrap;
      }
      .au-btn-dark:hover { background: #1e293b; transform: translateY(-1px); }

      .au-btn-green {
        padding: 9px 20px;
        background: #059669;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s;
        white-space: nowrap;
      }
      .au-btn-green:hover { background: #047857; transform: translateY(-1px); }

      .au-btn-ghost {
        padding: 6px 14px;
        background: transparent;
        border: 1px solid #e4e8ef;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        color: #64748b;
        transition: all 0.2s;
      }
      .au-btn-ghost:hover { border-color: #94a3b8; background: #f8fafc; color: #334155; }

      .au-btn-danger {
        padding: 6px 14px;
        background: transparent;
        border: 1px solid #fca5a5;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        color: #dc2626;
        transition: all 0.2s;
      }
      .au-btn-danger:hover { border-color: #dc2626; background: #fef2f2; }

      /* ── Cards ── */
      .au-card {
        background: #fff;
        border: 1px solid #e4e8ef;
        border-radius: 6px;
        overflow: hidden;
        opacity: 0;
        animation: auSlideUp 0.4s ease forwards;
      }
      .au-card-header {
        padding: 14px 20px;
        border-bottom: 1px solid #f1f5f9;
        background: #fafbfc;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      /* ── Table ── */
      .au-table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'DM Sans', sans-serif;
      }
      .au-table thead tr {
        background: #f8fafc;
        border-bottom: 1px solid #e4e8ef;
      }
      .au-table thead th {
        padding: 10px 16px;
        text-align: left;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: #94a3b8;
      }
      .au-table tbody tr {
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.15s;
        opacity: 0;
        animation: auFadeRow 0.3s ease forwards;
      }
      .au-table tbody tr:last-child { border-bottom: none; }
      .au-table tbody tr:hover { background: #fafbfc; }
      .au-table td {
        padding: 12px 16px;
        font-size: 13px;
        color: #334155;
        vertical-align: middle;
      }

      /* ── Badges ── */
      .au-badge {
        display: inline-block;
        padding: 3px 9px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-transform: uppercase;
        font-family: 'DM Sans', sans-serif;
      }
      .au-badge-green  { background: #f0fdf4; color: #16a34a; }
      .au-badge-red    { background: #fef2f2; color: #dc2626; }
      .au-badge-amber  { background: #fffbeb; color: #b45309; }
      .au-badge-blue   { background: #eff6ff; color: #2563eb; }
      .au-badge-slate  { background: #f1f5f9; color: #475569; }

      /* ── Icon circle ── */
      .au-icon-box {
        width: 30px;
        height: 30px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      /* ── Labels ── */
      .au-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.3px;
        text-transform: uppercase;
        color: #94a3b8;
        margin: 0 0 6px 0;
        font-family: 'DM Sans', sans-serif;
        display: block;
      }

      /* ── Capacity bar ── */
      .au-bar-track {
        height: 3px;
        background: #f1f5f9;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 5px;
        width: 72px;
      }
      .au-bar-fill {
        height: 100%;
        border-radius: 2px;
        animation: auExpandBar 0.9s ease both;
      }

      /* ── Empty state ── */
      .au-empty {
        text-align: center;
        padding: 44px 20px;
        color: #94a3b8;
        font-family: 'DM Sans', sans-serif;
      }
    `}</style>

    {/* ══════════════════════════════════════
        HEADER BANNER
    ══════════════════════════════════════ */}
    <div style={{
      background: 'linear-gradient(105deg, #0f172a 0%, #064e3b 50%, #065f46 100%)',
      borderRadius: '6px',
      padding: '32px 40px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      flexWrap: 'wrap',
      position: 'relative',
      overflow: 'hidden',
      animation: 'auSlideUp 0.5s ease forwards',
    }}>
      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Glow accents */}
      <div style={{ position: 'absolute', top: '-50px', right: '-30px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-40px', left: '30%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}>
          Gestión de Espacios
        </p>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
          Control de <span style={{ fontStyle: 'italic' }}>Aulas</span>
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.42)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
          Registra espacios, define capacidad y administra el equipamiento disponible
        </p>
      </div>

      {/* Mini stat cards */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {[
          { label: 'Aulas totales',    value: listaAulas.length,                                                warn: false },
          { label: 'Disponibles',      value: listaAulas.filter(a => a.estado === 'Disponible').length,         warn: false },
          { label: 'Mantenimiento',    value: listaAulas.filter(a => a.estado === 'Mantenimiento').length,      warn: listaAulas.filter(a => a.estado === 'Mantenimiento').length > 0 },
          { label: 'Reservas activas', value: listaReservas.filter(r => r.estado === 'Confirmada').length,      warn: false },
        ].map((stat, i) => (
          <div key={i} style={{
            background: stat.warn ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.07)',
            border: `1px solid ${stat.warn ? 'rgba(220,38,38,0.35)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '4px',
            padding: '10px 14px',
            textAlign: 'center',
            minWidth: '76px',
          }}>
            <div style={{ fontSize: '20px', fontWeight: '300', color: stat.warn ? '#fca5a5' : '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '10px', color: stat.warn ? 'rgba(252,165,165,0.8)' : 'rgba(255,255,255,0.38)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ══════════════════════════════════════
        FORM CARD: NUEVA AULA
    ══════════════════════════════════════ */}
    <div className="au-card" style={{ marginBottom: '16px', animationDelay: '0.08s' }}>
      <div className="au-card-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="au-icon-box" style={{ background: '#f0fdf4' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>Registrar Nueva Aula</div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
              Agrega un nuevo espacio al sistema con su equipamiento y capacidad
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowFormAula(!showFormAula)}
          style={{
            padding: '7px 16px',
            background: showFormAula ? '#f1f5f9' : '#0f172a',
            color: showFormAula ? '#64748b' : '#fff',
            border: '1px solid ' + (showFormAula ? '#e4e8ef' : 'transparent'),
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: '"DM Sans", sans-serif',
            cursor: 'pointer',
            transition: 'all 0.2s',
            letterSpacing: '0.2px',
          }}
        >
          {showFormAula ? '× Cancelar' : '+ Nueva Aula'}
        </button>
      </div>

      {showFormAula && (
        <div style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', background: '#ffffff' }}>
          <form onSubmit={guardarNuevaAula}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px 200px', gap: '14px', alignItems: 'flex-end', marginBottom: '14px' }}>
              <div>
                <label className="au-label">Nombre del aula</label>
                <input
                  name="nombre"
                  className="au-input"
                  placeholder="Ej: Laboratorio A / Sala de Videoconferencia"
                  required
                />
              </div>
              <div>
                <label className="au-label">Capacidad</label>
                <input
                  name="capacidad"
                  type="number"
                  min="1"
                  className="au-input"
                  placeholder="30"
                  required
                />
              </div>
              <div>
                <label className="au-label">Equipo principal</label>
                <select name="equipo" className="au-input" required style={{ cursor: 'pointer' }}>
                  <option value="">Seleccionar...</option>
                  <option value="Gafas RV">Gafas RV</option>
                  <option value="Cámaras">Cámaras</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Proyector">Proyector</option>
                  <option value="Pantalla interactiva">Pantalla interactiva</option>
                  <option value="Múltiple">Múltiple</option>
                  <option value="Sin equipo">Sin equipo especial</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" className="au-btn-ghost" onClick={() => setShowFormAula(false)}>Cancelar</button>
              <button type="submit" className="au-btn-green">Registrar aula</button>
            </div>
          </form>
        </div>
      )}
    </div>

    {/* ══════════════════════════════════════
        TABLE CARD: LISTADO DE AULAS
    ══════════════════════════════════════ */}
    <div className="au-card" style={{ animationDelay: '0.14s' }}>

      {/* Sub-header */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <span style={{ fontSize: '11.5px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
          <span style={{ fontWeight: '600', color: '#1e293b' }}>{listaAulas.length}</span> aula(s) registrada(s) · capacidad total:{' '}
          <span style={{ fontWeight: '600', color: '#059669' }}>
            {listaAulas.reduce((t, a) => t + (parseInt(a.capacidad) || 0), 0)}
          </span> personas
        </span>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { label: 'Disponibles',   count: listaAulas.filter(a => a.estado === 'Disponible').length,    color: '#059669', bg: '#f0fdf4' },
            { label: 'Mantenimiento', count: listaAulas.filter(a => a.estado === 'Mantenimiento').length, color: '#b45309', bg: '#fffbeb' },
          ].map(({ label, count, color, bg }) => (
            <div key={label} style={{ background: bg, border: `1px solid ${color}20`, borderRadius: '4px', padding: '4px 11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="au-table">
          <thead>
            <tr>
              <th>Aula</th>
              <th>Capacidad</th>
              <th>Equipo disponible</th>
              <th>Estado</th>
              <th>Reservas activas</th>
              <th>Creada</th>
              <th style={{ textAlign: 'right' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaAulas.length === 0 ? (
              <tr style={{ opacity: 1 }}>
                <td colSpan="7">
                  <div className="au-empty">
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                      </svg>
                    </div>
                    <p style={{ margin: 0, fontSize: '13px' }}>Sin aulas registradas</p>
                    <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>Usa el formulario de arriba para agregar la primera aula</p>
                  </div>
                </td>
              </tr>
            ) : (
              listaAulas.map((aula, idx) => {
                const enMantenimiento = aula.estado === 'Mantenimiento';
                const reservasAula   = listaReservas.filter(r => r.aulaId === aula.id && r.estado === 'Confirmada').length;
                const maxCap         = Math.max(...listaAulas.map(a => parseInt(a.capacidad) || 0), 1);
                const pct            = Math.min(((parseInt(aula.capacidad) || 0) / maxCap) * 100, 100);
                const barColor       = enMantenimiento ? '#b45309' : '#059669';

                return (
                  <tr key={aula.id} style={{ animationDelay: `${0.18 + idx * 0.035}s` }}>

                    {/* Nombre */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '34px', height: '34px', borderRadius: '5px', flexShrink: 0,
                          background: enMantenimiento ? '#fffbeb' : '#f0fdf4',
                          border: `1px solid ${enMantenimiento ? '#fde68a' : '#86efac'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={enMantenimiento ? '#b45309' : '#059669'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                          </svg>
                        </div>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>{aula.nombre}</div>
                          <div style={{ fontSize: '10.5px', color: '#b0bac9', fontFamily: '"DM Sans", sans-serif' }}>
                            {aula.creada ? new Date(aula.creada).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Capacidad */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
                            <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: '18px', fontWeight: '300', color: '#0f172a', lineHeight: 1 }}>
                              {aula.capacidad}
                            </span>
                            <span style={{ fontSize: '10.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>personas</span>
                          </div>
                          <div className="au-bar-track">
                            <div className="au-bar-fill" style={{ width: `${pct}%`, background: barColor, animationDelay: `${0.3 + idx * 0.04}s` }} />
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Equipo */}
                    <td>
                      <span className="au-badge au-badge-slate">{aula.equipoDisponible || '—'}</span>
                    </td>

                    {/* Estado */}
                    <td>
                      <span className={`au-badge ${enMantenimiento ? 'au-badge-amber' : 'au-badge-green'}`}>
                        {aula.estado || 'Disponible'}
                      </span>
                    </td>

                    {/* Reservas activas */}
                    <td>
                      {reservasAula > 0 ? (
                        <span className="au-badge au-badge-blue">{reservasAula} reserva{reservasAula !== 1 ? 's' : ''}</span>
                      ) : (
                        <span style={{ fontSize: '12px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif' }}>—</span>
                      )}
                    </td>

                    {/* Fecha creación */}
                    <td>
                      <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
                        {aula.creada
                          ? new Date(aula.creada).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
                          : <span style={{ color: '#cbd5e1' }}>—</span>}
                      </div>
                    </td>

                    {/* Acciones */}
                    <td style={{ textAlign: 'right' }}>
                      <button className="au-btn-danger" onClick={() => eliminarAula(aula.id)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {listaAulas.length > 0 && (
        <div style={{ padding: '10px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
            {listaAulas.length} aula(s) · {listaAulas.reduce((t, a) => t + (parseInt(a.capacidad) || 0), 0)} personas en total
          </span>
          <span style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Los cambios son inmediatos y se reflejan para todos los usuarios
          </span>
        </div>
      )}
    </div>
  </div>
)}

{/* ============ VISTA GESTIÓN DE INVENTARIO (ADMIN) ============ */}
            {permisos.gestionEquipos && vistaActual === 'equipos' && (
              <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                <style>{`
                  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

                  @keyframes giSlideUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to   { opacity: 1; transform: translateY(0); }
                  }
                  @keyframes giFadeRow {
                    from { opacity: 0; transform: translateX(-5px); }
                    to   { opacity: 1; transform: translateX(0); }
                  }
                  @keyframes giExpandBar {
                    from { width: 0; }
                  }
                  @keyframes giPulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                  }

                  /* ── Inputs & Controls ── */
                  .gi-input {
                    width: 100%;
                    padding: 9px 13px;
                    border: 1px solid #dde2ea;
                    border-radius: 4px;
                    font-size: 13px;
                    font-family: 'DM Sans', sans-serif;
                    color: #1e293b;
                    background: #ffffff;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    outline: none;
                    box-sizing: border-box;
                  }
                  .gi-input:focus {
                    border-color: #059669;
                    box-shadow: 0 0 0 3px rgba(5,150,105,0.09);
                  }
                  .gi-input::placeholder { color: #b8c0cc; }

                  /* ── Buttons ── */
                  .gi-btn-dark {
                    padding: 9px 20px;
                    background: #0f172a;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 13px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    letter-spacing: 0.3px;
                    transition: background 0.2s, transform 0.15s;
                    white-space: nowrap;
                  }
                  .gi-btn-dark:hover { background: #1e293b; transform: translateY(-1px); }

                  .gi-btn-green {
                    padding: 9px 20px;
                    background: #059669;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 13px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    transition: background 0.2s, transform 0.15s;
                    white-space: nowrap;
                  }
                  .gi-btn-green:hover { background: #047857; transform: translateY(-1px); }

                  .gi-btn-ghost {
                    padding: 6px 14px;
                    background: transparent;
                    border: 1px solid #e4e8ef;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    color: #64748b;
                    transition: all 0.2s;
                  }
                  .gi-btn-ghost:hover { border-color: #94a3b8; background: #f8fafc; color: #334155; }

                  .gi-btn-danger {
                    padding: 6px 14px;
                    background: transparent;
                    border: 1px solid #fca5a5;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    color: #dc2626;
                    transition: all 0.2s;
                  }
                  .gi-btn-danger:hover { border-color: #dc2626; background: #fef2f2; }

                  .gi-btn-approve {
                    padding: 6px 14px;
                    background: transparent;
                    border: 1px solid #86efac;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    color: #16a34a;
                    transition: all 0.2s;
                  }
                  .gi-btn-approve:hover { border-color: #16a34a; background: #f0fdf4; }

                  .gi-btn-return {
                    padding: 6px 14px;
                    background: #f0fdf4;
                    border: 1px solid #86efac;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    color: #16a34a;
                    transition: all 0.2s;
                  }
                  .gi-btn-return:hover { background: #dcfce7; border-color: #16a34a; }

                  /* ── Tabs ── */
                  .gi-tab-bar {
                    display: flex;
                    gap: 2px;
                    background: #f1f5f9;
                    padding: 4px;
                    border-radius: 6px;
                    width: fit-content;
                  }
                  .gi-tab {
                    padding: 7px 18px;
                    border: none;
                    border-radius: 4px;
                    font-size: 12px;
                    font-weight: 600;
                    font-family: 'DM Sans', sans-serif;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: transparent;
                    color: #64748b;
                    white-space: nowrap;
                    letter-spacing: 0.2px;
                  }
                  .gi-tab:hover { color: #334155; background: rgba(255,255,255,0.6); }
                  .gi-tab.active {
                    background: #ffffff;
                    color: #0f172a;
                    box-shadow: 0 1px 4px rgba(15,23,42,0.1);
                  }

                  /* ── Tables ── */
                  .gi-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-family: 'DM Sans', sans-serif;
                  }
                  .gi-table thead tr {
                    background: #f8fafc;
                    border-bottom: 1px solid #e4e8ef;
                  }
                  .gi-table thead th {
                    padding: 10px 16px;
                    text-align: left;
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 1.2px;
                    text-transform: uppercase;
                    color: #94a3b8;
                  }
                  .gi-table tbody tr {
                    border-bottom: 1px solid #f1f5f9;
                    transition: background 0.15s;
                    opacity: 0;
                    animation: giFadeRow 0.3s ease forwards;
                  }
                  .gi-table tbody tr:last-child { border-bottom: none; }
                  .gi-table tbody tr:hover { background: #fafbfc; }
                  .gi-table td {
                    padding: 12px 16px;
                    font-size: 13px;
                    color: #334155;
                    vertical-align: middle;
                  }

                  /* ── Badges ── */
                  .gi-badge {
                    display: inline-block;
                    padding: 3px 9px;
                    border-radius: 3px;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.7px;
                    text-transform: uppercase;
                    font-family: 'DM Sans', sans-serif;
                  }
                  .gi-badge-green  { background: #f0fdf4; color: #16a34a; }
                  .gi-badge-red    { background: #fef2f2; color: #dc2626; }
                  .gi-badge-amber  { background: #fffbeb; color: #b45309; }
                  .gi-badge-blue   { background: #eff6ff; color: #2563eb; }
                  .gi-badge-gray   { background: #f8fafc; color: #64748b; border: 1px solid #e4e8ef; }
                  .gi-badge-slate  { background: #f1f5f9; color: #475569; }

                  /* ── Cards ── */
                  .gi-card {
                    background: #fff;
                    border: 1px solid #e4e8ef;
                    border-radius: 6px;
                    overflow: hidden;
                    opacity: 0;
                    animation: giSlideUp 0.4s ease forwards;
                  }
                  .gi-card-header {
                    padding: 14px 20px;
                    border-bottom: 1px solid #f1f5f9;
                    background: #fafbfc;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                  }

                  /* ── Qty input ── */
                  .gi-qty {
                    width: 66px;
                    padding: 5px 8px;
                    border: 1px solid #e4e8ef;
                    border-radius: 4px;
                    font-size: 13px;
                    font-family: 'DM Sans', sans-serif;
                    text-align: center;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    background: #fafbfc;
                  }
                  .gi-qty:focus {
                    border-color: #059669;
                    box-shadow: 0 0 0 3px rgba(5,150,105,0.08);
                    background: #fff;
                  }

                  /* ── Stock bar ── */
                  .gi-bar-track {
                    height: 3px;
                    background: #f1f5f9;
                    border-radius: 2px;
                    overflow: hidden;
                    margin-top: 5px;
                    width: 72px;
                  }
                  .gi-bar-fill {
                    height: 100%;
                    border-radius: 2px;
                    animation: giExpandBar 0.9s ease both;
                  }

                  /* ── Icon circle ── */
                  .gi-icon-circle {
                    width: 30px;
                    height: 30px;
                    border-radius: 6px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                  }

                  /* ── Section label ── */
                  .gi-label {
                    font-size: 10px;
                    font-weight: 600;
                    letter-spacing: 1.3px;
                    text-transform: uppercase;
                    color: #94a3b8;
                    margin: 0 0 6px 0;
                    font-family: 'DM Sans', sans-serif;
                    display: block;
                  }

                  /* ── Overdue row highlight ── */
                  .gi-overdue {
                    background: #fef2f2 !important;
                    border-left: 3px solid #dc2626;
                  }
                  .gi-ontime {
                    background: #f0fdf4 !important;
                    border-left: 3px solid #22c55e;
                  }

                  /* ── Empty state ── */
                  .gi-empty {
                    text-align: center;
                    padding: 44px 20px;
                    color: #94a3b8;
                    font-family: 'DM Sans', sans-serif;
                  }
                `}</style>

                {/* ══════════════════════════════════════
                    HEADER BANNER
                ══════════════════════════════════════ */}
                <div style={{
                  background: 'linear-gradient(105deg, #0f172a 0%, #064e3b 50%, #065f46 100%)',
                  borderRadius: '6px',
                  padding: '32px 40px',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                  flexWrap: 'wrap',
                  position: 'relative',
                  overflow: 'hidden',
                  animation: 'giSlideUp 0.5s ease forwards',
                }}>
                  {/* Grid texture */}
                  <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                  {/* Glow */}
                  <div style={{ position: 'absolute', top: '-50px', right: '-30px', width: '260px', height: '260px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', bottom: '-40px', left: '30%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}>
                      Gestión de Recursos
                    </p>
                    <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
                      Control de <span style={{ fontStyle: 'italic' }}>Inventario</span>
                    </h2>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.42)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
                      Registra equipos, administra stock y gestiona préstamos
                    </p>
                  </div>

                  {/* Mini stat cards */}
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {[
                      {
                        label: 'Tipos de equipo',
                        value: listaEquipos.length,
                        warn: false,
                      },
                      {
                        label: 'Unidades en stock',
                        value: listaEquipos.reduce((t, eq) => t + (eq.cantidad || 0), 0),
                        warn: false,
                      },
                      {
                        label: 'Sin stock',
                        value: listaEquipos.filter(eq => (eq.cantidad || 0) === 0).length,
                        warn: listaEquipos.filter(eq => (eq.cantidad || 0) === 0).length > 0,
                      },
                      {
                        label: 'Préstamos activos',
                        value: listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto).length,
                        warn: false,
                      },
                      {
                        label: 'Atrasados',
                        value: listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto && new Date(s.fechaDevolucionEsperada) < new Date()).length,
                        warn: listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto && new Date(s.fechaDevolucionEsperada) < new Date()).length > 0,
                      },
                    ].map((stat, i) => (
                      <div key={i} style={{
                        background: stat.warn ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.07)',
                        border: `1px solid ${stat.warn ? 'rgba(220,38,38,0.35)' : 'rgba(255,255,255,0.1)'}`,
                        borderRadius: '4px',
                        padding: '10px 14px',
                        textAlign: 'center',
                        minWidth: '76px',
                      }}>
                        <div style={{ fontSize: '20px', fontWeight: '300', color: stat.warn ? '#fca5a5' : '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '4px' }}>
                          {stat.value}
                        </div>
                        <div style={{ fontSize: '10px', color: stat.warn ? 'rgba(252,165,165,0.8)' : 'rgba(255,255,255,0.38)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ══════════════════════════════════════
                    ADD EQUIPMENT FORM CARD
                ══════════════════════════════════════ */}
                <div className="gi-card" style={{ marginBottom: '16px', animationDelay: '0.08s' }}>
                  <div className="gi-card-header" style={{ justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="gi-icon-circle" style={{ background: '#f0fdf4' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>Registrar Nuevo Equipo</div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                          Agrega equipos o materiales al inventario del laboratorio
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowFormReserva(!showFormReserva)}
                      style={{
                        padding: '7px 16px',
                        background: showFormReserva ? '#f1f5f9' : '#0f172a',
                        color: showFormReserva ? '#64748b' : '#fff',
                        border: '1px solid ' + (showFormReserva ? '#e4e8ef' : 'transparent'),
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        fontFamily: '"DM Sans", sans-serif',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        letterSpacing: '0.2px',
                      }}
                    >
                      {showFormReserva ? '× Cancelar' : '+ Agregar equipo'}
                    </button>
                  </div>

                  {showFormReserva && (
                    <div style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', background: '#ffffff' }}>
                      <form onSubmit={guardarNuevoEquipo}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 120px 160px', gap: '14px', alignItems: 'flex-end', marginBottom: '14px' }}>
                          <div>
                            <label className="gi-label">Nombre del equipo</label>
                            <input name="nombre" className="gi-input" placeholder="Ej: Cámara Sony ZV-E10" required />
                          </div>
                          <div>
                            <label className="gi-label">Categoría</label>
                            <select name="categoria" className="gi-input" required style={{ cursor: 'pointer' }}>
                              <option value="">Seleccionar...</option>
                              <option value="Gafas RV">Gafas RV</option>
                              <option value="Cámara">Cámara</option>
                              <option value="Laptop">Laptop</option>
                              <option value="Micrófono">Micrófono</option>
                              <option value="Trípode">Trípode</option>
                              <option value="Iluminación">Iluminación</option>
                              <option value="Otro">Otro</option>
                            </select>
                          </div>
                          <div>
                            <label className="gi-label">Cantidad</label>
                            <input name="cantidad" type="number" min="1" className="gi-input" placeholder="1" defaultValue="1" />
                          </div>
                          <div>
                            <label className="gi-label">Estado inicial</label>
                            <select name="estado" className="gi-input" style={{ cursor: 'pointer' }}>
                              <option value="Disponible">Disponible</option>
                              <option value="Mantenimiento">Mantenimiento</option>
                              <option value="Inactivo">Inactivo</option>
                            </select>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button type="button" className="gi-btn-ghost" onClick={() => setShowFormReserva(false)}>Cancelar</button>
                          <button type="submit" className="gi-btn-green">Registrar en inventario</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>

                {/* ══════════════════════════════════════
                    TABBED CONTENT AREA
                ══════════════════════════════════════ */}
                {(() => {
                  // Local tab state using a ref trick — we'll use a state declared at the top
                  // We'll reuse tabSolicitudesAdmin but scoped differently. Instead let's use
                  // a separate state. Since we can't add new useState here, we'll build the
                  // tab UI around tabSolicitudesAdmin but prefix values with 'gi-'
                  // to avoid collision. We set initial to 'gi-catalogo'.
                  const tabActual = tabSolicitudesAdmin.startsWith('gi-') ? tabSolicitudesAdmin : 'gi-catalogo';
                  const pendientesMat = listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length;
                  const devolucionesPend = listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto).length;
                  const atrasadosCount = listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto && new Date(s.fechaDevolucionEsperada) < new Date()).length;

                  return (
                    <div className="gi-card" style={{ animationDelay: '0.14s' }}>

                      {/* Tab bar header */}
                      <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                        <div className="gi-tab-bar">
                          {[
                            { key: 'gi-catalogo',    label: 'Catálogo de Equipos' },
                            { key: 'gi-solicitudes', label: `Solicitudes${pendientesMat > 0 ? ` · ${pendientesMat}` : ''}` },
                            { key: 'gi-prestamos',   label: `Préstamos Activos${devolucionesPend > 0 ? ` · ${devolucionesPend}` : ''}` },
                          ].map(({ key, label }) => (
                            <button
                              key={key}
                              className={`gi-tab ${tabActual === key ? 'active' : ''}`}
                              onClick={() => setTabSolicitudesAdmin(key)}
                            >
                              {label}
                              {key === 'gi-prestamos' && atrasadosCount > 0 && (
                                <span style={{ marginLeft: '6px', background: '#dc2626', color: '#fff', borderRadius: '3px', padding: '1px 6px', fontSize: '10px', fontWeight: '700' }}>
                                  {atrasadosCount}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>

                        {/* Contextual right-side actions */}
                        {tabActual === 'gi-prestamos' && atrasadosCount > 0 && (
                          <button
                            onClick={enviarNotificacionesPorAtrasos}
                            style={{ padding: '6px 14px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '4px', fontSize: '11px', fontWeight: '600', color: '#dc2626', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.2px' }}
                          >
                            Enviar recordatorios de atraso
                          </button>
                        )}
                      </div>

                      {/* ─────────────────────────────────────
                          TAB 1: CATÁLOGO
                      ───────────────────────────────────── */}
                      {tabActual === 'gi-catalogo' && (
                        <>
                          {/* Sub-header with pills */}
                          <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                            <span style={{ fontSize: '11.5px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
                              <span style={{ fontWeight: '600', color: '#1e293b' }}>{listaEquipos.length}</span> tipo(s) registrado(s) · <span style={{ fontWeight: '600', color: '#059669' }}>{listaEquipos.reduce((t, eq) => t + (eq.cantidad || 0), 0)}</span> unidades en total
                            </span>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {[
                                { label: 'Con stock',      count: listaEquipos.filter(e => (e.cantidad || 0) > 0).length,                    color: '#059669', bg: '#f0fdf4' },
                                { label: 'Sin stock',      count: listaEquipos.filter(e => (e.cantidad || 0) === 0).length,                   color: '#dc2626', bg: '#fef2f2' },
                                { label: 'Mantenimiento',  count: listaEquipos.filter(e => e.estado === 'Mantenimiento').length,               color: '#b45309', bg: '#fffbeb' },
                              ].map(({ label, count, color, bg }) => (
                                <div key={label} style={{ background: bg, border: `1px solid ${color}20`, borderRadius: '4px', padding: '4px 11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                                  <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {label}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div style={{ overflowX: 'auto' }}>
                            <table className="gi-table">
                              <thead>
                                <tr>
                                  <th>Equipo</th>
                                  <th>Categoría</th>
                                  <th>Stock actual</th>
                                  <th>En préstamo</th>
                                  <th>Estado</th>
                                  <th>Registrado por</th>
                                  <th style={{ textAlign: 'right' }}>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listaEquipos.length === 0 ? (
                                  <tr style={{ opacity: 1 }}>
                                    <td colSpan="7">
                                      <div className="gi-empty">
                                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                          </svg>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '13px' }}>Sin equipos registrados</p>
                                        <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>Usa el formulario de arriba para agregar el primer equipo</p>
                                      </div>
                                    </td>
                                  </tr>
                                ) : (
                                  listaEquipos.map((eq, idx) => {
                                    const sinStock = (eq.cantidad || 0) === 0;
                                    const enMantenimiento = eq.estado === 'Mantenimiento';
                                    const prestamosActivos = listaSolicitudesMaterial.filter(s => s.equipoId === eq.id && s.estado === 'Aprobada' && !s.devuelto).reduce((t, s) => t + s.cantidad, 0);
                                    const maxRef = Math.max(...listaEquipos.map(e => e.cantidad || 0), 1);
                                    const pct = Math.min(((eq.cantidad || 0) / maxRef) * 100, 100);
                                    const barColor = sinStock ? '#dc2626' : enMantenimiento ? '#b45309' : '#059669';

                                    return (
                                      <tr key={eq.id} style={{ animationDelay: `${0.18 + idx * 0.035}s` }}>
                                        {/* Equipo */}
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{
                                              width: '34px', height: '34px', borderRadius: '5px', flexShrink: 0,
                                              background: sinStock ? '#fef2f2' : '#f0fdf4',
                                              border: `1px solid ${sinStock ? '#fca5a5' : '#86efac'}`,
                                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}>
                                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sinStock ? '#dc2626' : '#059669'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                              </svg>
                                            </div>
                                            <div>
                                              <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>{eq.nombre}</div>
                                              <div style={{ fontSize: '10.5px', color: '#b0bac9', fontFamily: '"DM Sans", sans-serif' }}>
                                                {eq.fecha ? new Date(eq.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                                              </div>
                                            </div>
                                          </div>
                                        </td>

                                        {/* Categoría */}
                                        <td>
                                          <span className="gi-badge gi-badge-slate">{eq.categoria || '—'}</span>
                                        </td>

                                        {/* Stock editable */}
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div>
                                              <input
                                                type="number"
                                                className="gi-qty"
                                                defaultValue={eq.cantidad || 0}
                                                min="0"
                                                title="Edita la cantidad y presiona Enter o haz clic fuera"
                                                onBlur={(e) => {
                                                  const val = parseInt(e.target.value);
                                                  if (!isNaN(val) && val !== (eq.cantidad || 0)) {
                                                    actualizarCantidadEquipo(eq.id, val);
                                                  }
                                                }}
                                                onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
                                              />
                                              <div className="gi-bar-track">
                                                <div className="gi-bar-fill" style={{ width: `${pct}%`, background: barColor, animationDelay: `${0.3 + idx * 0.04}s` }} />
                                              </div>
                                            </div>
                                            <span style={{ fontSize: '10.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', whiteSpace: 'nowrap' }}>uds.</span>
                                          </div>
                                        </td>

                                        {/* En préstamo */}
                                        <td>
                                          {prestamosActivos > 0 ? (
                                            <span className="gi-badge gi-badge-blue">{prestamosActivos} uds.</span>
                                          ) : (
                                            <span style={{ fontSize: '12px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif' }}>—</span>
                                          )}
                                        </td>

                                        {/* Estado */}
                                        <td>
                                          <span className={`gi-badge ${sinStock ? 'gi-badge-red' : enMantenimiento ? 'gi-badge-amber' : 'gi-badge-green'}`}>
                                            {sinStock ? 'Sin stock' : enMantenimiento ? 'Mantenimiento' : 'Disponible'}
                                          </span>
                                        </td>

                                        {/* Registrado por */}
                                        <td>
                                          <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
                                            {eq.registradoPor?.split('@')[0] || '—'}
                                          </div>
                                        </td>

                                        {/* Acciones */}
                                        <td style={{ textAlign: 'right' }}>
                                          <button className="gi-btn-danger" onClick={() => eliminarEquipo(eq.id)}>
                                            Eliminar
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })
                                )}
                              </tbody>
                            </table>
                          </div>

                          {listaEquipos.length > 0 && (
                            <div style={{ padding: '10px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                                {listaEquipos.length} tipo(s) · {listaEquipos.reduce((t, eq) => t + (eq.cantidad || 0), 0)} unidades totales
                              </span>
                              <span style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                                Click en la cantidad para editar · Enter para guardar
                              </span>
                            </div>
                          )}
                        </>
                      )}

                      {/* ─────────────────────────────────────
                          TAB 2: SOLICITUDES
                      ───────────────────────────────────── */}
                      {tabActual === 'gi-solicitudes' && (
                        <>
                          <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {pendientesMat > 0 ? (
                              <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '4px', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#b45309', flexShrink: 0, animation: 'giPulse 1.5s ease infinite' }} />
                                <span style={{ fontSize: '11px', fontWeight: '600', color: '#b45309', fontFamily: '"DM Sans", sans-serif' }}>
                                  {pendientesMat} solicitud(es) pendiente(s) de revisión
                                </span>
                              </div>
                            ) : (
                              <span style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Sin solicitudes pendientes</span>
                            )}
                          </div>

                          <div style={{ overflowX: 'auto' }}>
                            <table className="gi-table">
                              <thead>
                                <tr>
                                  <th>Solicitante</th>
                                  <th>Material</th>
                                  <th>Cantidad</th>
                                  <th>Motivo</th>
                                  <th>Duración</th>
                                  <th>Devolución esperada</th>
                                  <th>Estado</th>
                                  <th style={{ textAlign: 'right' }}>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listaSolicitudesMaterial.length === 0 ? (
                                  <tr style={{ opacity: 1 }}>
                                    <td colSpan="8">
                                      <div className="gi-empty">
                                        <p style={{ margin: 0, fontSize: '13px' }}>No hay solicitudes de material</p>
                                      </div>
                                    </td>
                                  </tr>
                                ) : (
                                  listaSolicitudesMaterial
                                    .filter(s => s.estado !== 'Rechazada')
                                    .map((sol, idx) => {
                                      const equipo = listaEquipos.find(e => e.id === sol.equipoId);
                                      const ahora = new Date();
                                      const venc = new Date(sol.fechaDevolucionEsperada);
                                      const esAtrasado = sol.estado === 'Aprobada' && !sol.devuelto && ahora > venc;

                                      return (
                                        <tr
                                          key={sol.id}
                                          style={{
                                            animationDelay: `${0.1 + idx * 0.03}s`,
                                            background: esAtrasado ? '#fef2f2' : '',
                                          }}
                                        >
                                          {/* Solicitante */}
                                          <td>
                                            <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
                                              {sol.solicitadoPor?.split('@')[0]}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{sol.solicitadoPor}</div>
                                          </td>

                                          {/* Material */}
                                          <td>
                                            <div style={{ fontWeight: '500', color: '#334155', fontFamily: '"DM Sans", sans-serif' }}>
                                              {equipo?.nombre || sol.equipoNombre || 'Desconocido'}
                                            </div>
                                          </td>

                                          {/* Cantidad */}
                                          <td>
                                            <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: '17px', fontWeight: '300', color: '#0f172a' }}>×{sol.cantidad}</span>
                                          </td>

                                          {/* Motivo */}
                                          <td style={{ maxWidth: '160px' }}>
                                            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif', lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                              {sol.motivo || <span style={{ color: '#cbd5e1' }}>—</span>}
                                            </div>
                                          </td>

                                          {/* Duración */}
                                          <td>
                                            <span style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>{sol.tiempoUso}h</span>
                                          </td>

                                          {/* Devolución esperada */}
                                          <td>
                                            <div style={{ fontSize: '12px', fontFamily: '"DM Sans", sans-serif', color: esAtrasado ? '#dc2626' : '#475569', fontWeight: esAtrasado ? '600' : '400' }}>
                                              {esAtrasado && <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#dc2626', marginBottom: '2px' }}>Vencido</div>}
                                              {new Date(sol.fechaDevolucionEsperada).toLocaleString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                          </td>

                                          {/* Estado */}
                                          <td>
                                            <span className={`gi-badge ${sol.estado === 'Aprobada' ? 'gi-badge-green' : sol.estado === 'Rechazada' ? 'gi-badge-red' : 'gi-badge-amber'}`}>
                                              {sol.estado}
                                            </span>
                                          </td>

                                          {/* Acciones */}
                                          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                            {sol.estado === 'Pendiente' && (
                                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                                <button className="gi-btn-approve" onClick={() => aprobarSolicitudMaterial(sol.id)}>Aprobar</button>
                                                <button className="gi-btn-danger"  onClick={() => rechazarSolicitudMaterial(sol.id)}>Rechazar</button>
                                              </div>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })
                                )}
                              </tbody>
                            </table>
                          </div>
                        </>
                      )}

                      {/* ─────────────────────────────────────
                          TAB 3: PRÉSTAMOS ACTIVOS / DEVOLUCIONES
                      ───────────────────────────────────── */}
                      {tabActual === 'gi-prestamos' && (
                        <>
                          {/* Sub-header with status counts */}
                          <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            {[
                              { label: 'En tiempo', count: devolucionesPend - atrasadosCount, color: '#059669', bg: '#f0fdf4' },
                              { label: 'Atrasados',  count: atrasadosCount,                    color: '#dc2626', bg: '#fef2f2' },
                            ].map(({ label, count, color, bg }) => (
                              <div key={label} style={{ background: bg, border: `1px solid ${color}20`, borderRadius: '4px', padding: '4px 11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                                <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {label}</span>
                              </div>
                            ))}
                          </div>

                          <div style={{ overflowX: 'auto' }}>
                            <table className="gi-table">
                              <thead>
                                <tr>
                                  <th>Prestado a</th>
                                  <th>Material</th>
                                  <th>Cantidad</th>
                                  <th>Motivo</th>
                                  <th>Vencimiento</th>
                                  <th>Estado de entrega</th>
                                  <th style={{ textAlign: 'right' }}>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {devolucionesPend === 0 ? (
                                  <tr style={{ opacity: 1 }}>
                                    <td colSpan="7">
                                      <div className="gi-empty">
                                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #dcfce7', background: '#f0fdf4', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                          </svg>
                                        </div>
                                        <p style={{ margin: 0, fontSize: '13px', color: '#16a34a', fontWeight: '600' }}>Todo devuelto</p>
                                        <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#94a3b8' }}>No hay materiales en préstamo activo</p>
                                      </div>
                                    </td>
                                  </tr>
                                ) : (
                                  listaSolicitudesMaterial
                                    .filter(s => s.estado === 'Aprobada' && !s.devuelto)
                                    .sort((a, b) => new Date(a.fechaDevolucionEsperada) - new Date(b.fechaDevolucionEsperada))
                                    .map((sol, idx) => {
                                      const equipo = listaEquipos.find(e => e.id === sol.equipoId);
                                      const ahora = new Date();
                                      const venc = new Date(sol.fechaDevolucionEsperada);
                                      const esAtrasado = ahora > venc;
                                      const horasAtraso = esAtrasado ? Math.floor((ahora - venc) / 3600000) : null;
                                      const diasAtraso = horasAtraso !== null ? Math.floor(horasAtraso / 24) : null;

                                      return (
                                        <tr
                                          key={sol.id}
                                          className={esAtrasado ? 'gi-overdue' : 'gi-ontime'}
                                          style={{ animationDelay: `${0.1 + idx * 0.035}s` }}
                                        >
                                          {/* Prestado a */}
                                          <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                              <div style={{
                                                width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                                                background: esAtrasado ? '#fef2f2' : '#f0fdf4',
                                                border: `1px solid ${esAtrasado ? '#fca5a5' : '#86efac'}`,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                              }}>
                                                <span style={{ fontSize: '12px', fontWeight: '700', color: esAtrasado ? '#dc2626' : '#16a34a', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
                                                  {(sol.solicitadoPor || '?').charAt(0)}
                                                </span>
                                              </div>
                                              <div>
                                                <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '12.5px', fontFamily: '"DM Sans", sans-serif' }}>
                                                  {sol.solicitadoPor?.split('@')[0]}
                                                </div>
                                                <div style={{ fontSize: '10.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{sol.solicitadoPor}</div>
                                              </div>
                                            </div>
                                          </td>

                                          {/* Material */}
                                          <td>
                                            <div style={{ fontWeight: '500', color: '#334155', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
                                              {equipo?.nombre || sol.equipoNombre || 'Desconocido'}
                                            </div>
                                          </td>

                                          {/* Cantidad */}
                                          <td>
                                            <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: '17px', fontWeight: '300', color: '#0f172a' }}>×{sol.cantidad}</span>
                                          </td>

                                          {/* Motivo */}
                                          <td style={{ maxWidth: '150px' }}>
                                            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif', lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                              {sol.motivo || <span style={{ color: '#cbd5e1' }}>—</span>}
                                            </div>
                                          </td>

                                          {/* Vencimiento */}
                                          <td>
                                            <div>
                                              <div style={{ fontSize: '12px', fontWeight: '600', color: esAtrasado ? '#dc2626' : '#059669', fontFamily: '"DM Sans", sans-serif' }}>
                                                {esAtrasado
                                                  ? diasAtraso > 0
                                                    ? `${diasAtraso}d ${horasAtraso % 24}h de atraso`
                                                    : `${horasAtraso}h de atraso`
                                                  : 'En tiempo'}
                                              </div>
                                              <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', marginTop: '2px' }}>
                                                {venc.toLocaleString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                              </div>
                                            </div>
                                          </td>

                                          {/* Estado */}
                                          <td>
                                            <span className={`gi-badge ${esAtrasado ? 'gi-badge-red' : 'gi-badge-green'}`}>
                                              {esAtrasado ? 'Atrasado' : 'En tiempo'}
                                            </span>
                                          </td>

                                          {/* Acción */}
                                          <td style={{ textAlign: 'right' }}>
                                            <button className="gi-btn-return" onClick={() => registrarDevolucionMaterial(sol.id)}>
                                              Confirmar devolución
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })
                                )}
                              </tbody>
                            </table>
                          </div>

                          {devolucionesPend > 0 && (
                            <div style={{ padding: '10px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                                {devolucionesPend} préstamo(s) activo(s)
                              </span>
                              {atrasadosCount > 0 && (
                                <button
                                  onClick={enviarNotificacionesPorAtrasos}
                                  style={{ padding: '5px 12px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '4px', fontSize: '11px', fontWeight: '600', color: '#dc2626', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}
                                >
                                  Notificar a {atrasadosCount} usuario(s) atrasado(s)
                                </button>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
{/* ============ VISTA AULAS RESERVADAS ============ */}
{vistaActual === 'aulasReservadas' && (
  <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

      /* ── Keyframes ── */
      @keyframes arSlideUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes arFadeRow {
        from { opacity: 0; transform: translateX(-5px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes arExpandBar {
        from { width: 0; }
      }
      @keyframes arPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.35); }
        50%       { box-shadow: 0 0 0 5px rgba(37,99,235,0); }
      }
      @keyframes arSpin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }

      /* ── Cards ── */
      .ar-card {
        background: #fff;
        border: 1px solid #e4e8ef;
        border-radius: 6px;
        overflow: hidden;
        opacity: 0;
        animation: arSlideUp 0.4s ease forwards;
      }
      .ar-card-header {
        padding: 14px 20px;
        border-bottom: 1px solid #f1f5f9;
        background: #fafbfc;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      /* ── Aula grid cards ── */
      .ar-aula-card {
        background: #ffffff;
        border: 1px solid #e4e8ef;
        border-radius: 6px;
        overflow: hidden;
        transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.2s;
        cursor: default;
        opacity: 0;
        animation: arSlideUp 0.4s ease forwards;
      }
      .ar-aula-card:hover {
        box-shadow: 0 8px 28px rgba(15,23,42,0.09);
        transform: translateY(-2px);
        border-color: #cbd5e1;
      }

      /* ── Table ── */
      .ar-table {
        width: 100%;
        border-collapse: collapse;
        font-family: 'DM Sans', sans-serif;
      }
      .ar-table thead tr {
        background: #f8fafc;
        border-bottom: 1px solid #e4e8ef;
      }
      .ar-table thead th {
        padding: 10px 16px;
        text-align: left;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.2px;
        text-transform: uppercase;
        color: #94a3b8;
      }
      .ar-table tbody tr {
        border-bottom: 1px solid #f1f5f9;
        transition: background 0.15s;
        opacity: 0;
        animation: arFadeRow 0.3s ease forwards;
      }
      .ar-table tbody tr:last-child { border-bottom: none; }
      .ar-table tbody tr:hover { background: #fafbfc; }
      .ar-table td {
        padding: 12px 16px;
        font-size: 13px;
        color: #334155;
        vertical-align: middle;
      }

      /* ── Badges ── */
      .ar-badge {
        display: inline-block;
        padding: 3px 9px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-transform: uppercase;
        font-family: 'DM Sans', sans-serif;
      }
      .ar-badge-green  { background: #f0fdf4; color: #16a34a; }
      .ar-badge-red    { background: #fef2f2; color: #dc2626; }
      .ar-badge-amber  { background: #fffbeb; color: #b45309; }
      .ar-badge-blue   { background: #eff6ff; color: #2563eb; }
      .ar-badge-slate  { background: #f1f5f9; color: #475569; }
      .ar-badge-indigo { background: #eef2ff; color: #4338ca; }

      /* ── Buttons ── */
      .ar-btn-danger {
        padding: 5px 13px;
        background: transparent;
        border: 1px solid #fca5a5;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        color: #dc2626;
        transition: all 0.2s;
        white-space: nowrap;
      }
      .ar-btn-danger:hover { border-color: #dc2626; background: #fef2f2; }

      .ar-btn-reserve {
        padding: 7px 16px;
        background: #0f172a;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        letter-spacing: 0.2px;
        transition: background 0.2s, transform 0.15s;
        width: 100%;
      }
      .ar-btn-reserve:hover { background: #1e293b; transform: translateY(-1px); }

      .ar-btn-green {
        padding: 7px 16px;
        background: #059669;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s;
        width: 100%;
      }
      .ar-btn-green:hover { background: #047857; transform: translateY(-1px); }

      /* ── View toggle tabs ── */
      .ar-tab-bar {
        display: flex;
        gap: 2px;
        background: #f1f5f9;
        padding: 4px;
        border-radius: 6px;
        width: fit-content;
      }
      .ar-tab {
        padding: 6px 16px;
        border: none;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: all 0.2s;
        background: transparent;
        color: #64748b;
        white-space: nowrap;
      }
      .ar-tab:hover { color: #334155; }
      .ar-tab.ar-active {
        background: #ffffff;
        color: #0f172a;
        box-shadow: 0 1px 4px rgba(15,23,42,0.1);
      }

      /* ── Search input ── */
      .ar-search {
        padding: 7px 12px 7px 34px;
        border: 1px solid #e4e8ef;
        border-radius: 4px;
        font-size: 12.5px;
        font-family: 'DM Sans', sans-serif;
        color: #1e293b;
        background: #ffffff;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
        width: 220px;
      }
      .ar-search:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37,99,235,0.08);
      }
      .ar-search::placeholder { color: #b8c0cc; }

      /* ── Timeline item ── */
      .ar-timeline-item {
        display: flex;
        gap: 14px;
        padding: 12px 0;
        border-bottom: 1px solid #f1f5f9;
        opacity: 0;
        animation: arFadeRow 0.3s ease forwards;
      }
      .ar-timeline-item:last-child { border-bottom: none; }

      /* ── Bar track ── */
      .ar-bar-track {
        height: 3px;
        background: #f1f5f9;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 5px;
      }
      .ar-bar-fill {
        height: 100%;
        border-radius: 2px;
        animation: arExpandBar 1s ease both;
      }

      /* ── Label ── */
      .ar-label {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 1.3px;
        text-transform: uppercase;
        color: #94a3b8;
        font-family: 'DM Sans', sans-serif;
      }

      /* ── Occupancy ring ── */
      .ar-ring-wrap {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      /* ── Empty state ── */
      .ar-empty {
        text-align: center;
        padding: 44px 20px;
        color: #94a3b8;
        font-family: 'DM Sans', sans-serif;
      }
    `}</style>

    {/* ══════════════════════════════════════
        HEADER BANNER
    ══════════════════════════════════════ */}
    <div style={{
      background: 'linear-gradient(105deg, #0f172a 0%, #064e3b 50%, #065f46 100%)',
      borderRadius: '6px',
      padding: '32px 40px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      flexWrap: 'wrap',
      position: 'relative',
      overflow: 'hidden',
      animation: 'arSlideUp 0.5s ease forwards',
    }}>
      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Glow accents */}
      <div style={{ position: 'absolute', top: '-50px', right: '-30px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-40px', left: '25%', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}>
          Gestión de Reservas
        </p>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
          Aulas <span style={{ fontStyle: 'italic' }}>Reservadas</span>
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.42)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
          Consulta el estado de ocupación, horarios activos y reservas del sistema
        </p>
      </div>

      {/* Mini stats */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {[
          { label: 'Aulas totales',    value: listaAulas.length,                                                                    warn: false },
          { label: 'Con reservas',     value: listaAulas.filter(a => listaReservas.some(r => r.aulaId === a.id && r.estado === 'Confirmada')).length, warn: false },
          { label: 'Sin reservas',     value: listaAulas.filter(a => !listaReservas.some(r => r.aulaId === a.id && r.estado === 'Confirmada')).length, warn: false },
          { label: 'Total confirmadas',value: listaReservas.filter(r => r.estado === 'Confirmada').length,                          warn: false },
        ].map((stat, i) => (
          <div key={i} style={{
            background: stat.warn ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.07)',
            border: `1px solid ${stat.warn ? 'rgba(220,38,38,0.35)' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '4px',
            padding: '10px 14px',
            textAlign: 'center',
            minWidth: '78px',
          }}>
            <div style={{ fontSize: '20px', fontWeight: '300', color: stat.warn ? '#fca5a5' : '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '4px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.38)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* ══════════════════════════════════════
        CONTROLS BAR
    ══════════════════════════════════════ */}
    {(() => {
      // We use tabSolicitudesAdmin with 'ar-' prefix to avoid collision
      const vistaTab = tabSolicitudesAdmin.startsWith('ar-') ? tabSolicitudesAdmin : 'ar-tarjetas';

      return (
        <>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '10px',
            opacity: 0,
            animation: 'arSlideUp 0.4s ease 0.08s forwards',
          }}>
            {/* View toggle */}
            <div className="ar-tab-bar">
              <button
                className={`ar-tab ${vistaTab === 'ar-tarjetas' ? 'ar-active' : ''}`}
                onClick={() => setTabSolicitudesAdmin('ar-tarjetas')}
              >
                Vista por Aulas
              </button>
              <button
                className={`ar-tab ${vistaTab === 'ar-lista' ? 'ar-active' : ''}`}
                onClick={() => setTabSolicitudesAdmin('ar-lista')}
              >
                Lista de Reservas
              </button>
            </div>

            {/* Right side: summary pills + reserve action */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { label: 'Confirmadas', count: listaReservas.filter(r => r.estado === 'Confirmada').length, color: '#059669', bg: '#f0fdf4' },
                { label: 'Canceladas',  count: listaReservas.filter(r => r.estado !== 'Confirmada').length, color: '#dc2626', bg: '#fef2f2' },
              ].map(({ label, count, color, bg }) => (
                <div key={label} style={{ background: bg, border: `1px solid ${color}20`, borderRadius: '4px', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {label}</span>
                </div>
              ))}
              <button
                onClick={() => setVistaActual('aulasPúblicas')}
                style={{
                  padding: '7px 16px',
                  background: '#0f172a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: '600',
                  fontFamily: '"DM Sans", sans-serif',
                  cursor: 'pointer',
                  transition: 'background 0.2s, transform 0.15s',
                  letterSpacing: '0.2px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0f172a'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                Nueva reserva
              </button>
            </div>
          </div>

          {/* ════════════════════════════
              VIEW: CARDS BY AULA
          ════════════════════════════ */}
          {vistaTab === 'ar-tarjetas' && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '14px',
            }}>
              {listaAulas.length === 0 ? (
                <div style={{ gridColumn: '1 / -1' }}>
                  <div className="ar-card" style={{ animationDelay: '0.1s' }}>
                    <div className="ar-empty">
                      <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                        </svg>
                      </div>
                      <p style={{ margin: 0, fontSize: '13px' }}>No hay aulas registradas</p>
                      <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>Ve a "Aulas" para agregar espacios al sistema</p>
                    </div>
                  </div>
                </div>
              ) : (
                listaAulas.map((aula, idx) => {
                  const reservasAula = listaReservas.filter(r => r.aulaId === aula.id && r.estado === 'Confirmada');
                  const tieneReservas = reservasAula.length > 0;
                  const enMantenimiento = aula.estado === 'Mantenimiento';

                  // Sort reservations by date
                  const reservasOrdenadas = [...reservasAula].sort((a, b) => {
                    if (a.fecha !== b.fecha) return a.fecha.localeCompare(b.fecha);
                    return a.horaInicio.localeCompare(b.horaInicio);
                  });

                  // Count occupancy percentage (of today's 11 slots)
                  const hoy = (() => {
                    const d = new Date();
                    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                  })();
                  const reservasHoy = reservasAula.filter(r => r.fecha === hoy).length;
                  const pctHoy = Math.min((reservasHoy / 11) * 100, 100);
                  const pctColor = pctHoy >= 70 ? '#dc2626' : pctHoy >= 40 ? '#d97706' : '#059669';

                  return (
                    <div
                      key={aula.id}
                      className="ar-aula-card"
                      style={{ animationDelay: `${0.1 + idx * 0.06}s` }}
                    >
                      {/* Card top bar */}
                      <div style={{
                        height: '3px',
                        background: enMantenimiento
                          ? 'linear-gradient(90deg, #d97706, #b45309)'
                          : tieneReservas
                            ? 'linear-gradient(90deg, #2563eb, #059669)'
                            : 'linear-gradient(90deg, #059669, #10b981)',
                      }} />

                      {/* Header */}
                      <div style={{ padding: '16px 18px 12px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '36px', height: '36px', borderRadius: '6px', flexShrink: 0,
                              background: enMantenimiento ? '#fffbeb' : '#f0fdf4',
                              border: `1px solid ${enMantenimiento ? '#fde68a' : '#86efac'}`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={enMantenimiento ? '#b45309' : '#059669'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                              </svg>
                            </div>
                            <div>
                              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', lineHeight: 1.2 }}>{aula.nombre}</div>
                              <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', marginTop: '2px' }}>
                                Cap. {aula.capacidad} · {aula.equipoDisponible || 'Sin equipo especial'}
                              </div>
                            </div>
                          </div>
                          <span className={`ar-badge ${enMantenimiento ? 'ar-badge-amber' : tieneReservas ? 'ar-badge-blue' : 'ar-badge-green'}`}>
                            {enMantenimiento ? 'Mantenimiento' : tieneReservas ? `${reservasAula.length} reserva${reservasAula.length !== 1 ? 's' : ''}` : 'Libre'}
                          </span>
                        </div>

                        {/* Occupancy bar */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span className="ar-label">Ocupación hoy</span>
                            <span style={{ fontSize: '11px', fontWeight: '600', color: pctColor, fontFamily: '"DM Sans", sans-serif' }}>
                              {reservasHoy} de 11 bloques
                            </span>
                          </div>
                          <div className="ar-bar-track">
                            <div className="ar-bar-fill" style={{ width: `${pctHoy}%`, background: pctColor, animationDelay: `${0.3 + idx * 0.06}s` }} />
                          </div>
                        </div>
                      </div>

                      {/* Reservations list */}
                      <div style={{ padding: '0', maxHeight: '220px', overflowY: 'auto' }}>
                        {reservasOrdenadas.length === 0 ? (
                          <div style={{ padding: '20px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#86efac' }} />
                              <span style={{ fontSize: '12.5px', color: '#16a34a', fontFamily: '"DM Sans", sans-serif', fontWeight: '600' }}>
                                Disponible para reservar
                              </span>
                            </div>
                          </div>
                        ) : (
                          reservasOrdenadas.map((res, rIdx) => {
                            const esHoy = res.fecha === hoy;
                            const esFuturo = res.fecha > hoy;
                            return (
                              <div
                                key={res.id}
                                style={{
                                  padding: '10px 18px',
                                  borderBottom: rIdx < reservasOrdenadas.length - 1 ? '1px solid #f8fafc' : 'none',
                                  display: 'flex',
                                  alignItems: 'flex-start',
                                  gap: '10px',
                                  opacity: 0,
                                  animation: 'arFadeRow 0.3s ease forwards',
                                  animationDelay: `${0.2 + idx * 0.06 + rIdx * 0.04}s`,
                                }}
                              >
                                {/* Time accent */}
                                <div style={{
                                  flexShrink: 0,
                                  width: '46px',
                                  textAlign: 'center',
                                  paddingTop: '2px',
                                }}>
                                  <div style={{
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    color: esHoy ? '#2563eb' : '#475569',
                                    fontFamily: '"DM Sans", sans-serif',
                                    lineHeight: 1,
                                    marginBottom: '3px',
                                  }}>
                                    {res.horaInicio}
                                  </div>
                                  <div style={{ width: '1px', height: '10px', background: '#e2e8f0', margin: '0 auto' }} />
                                  <div style={{ fontSize: '10px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                                    {res.horaFin}
                                  </div>
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px', flexWrap: 'wrap' }}>
                                    <div style={{
                                      fontSize: '12.5px',
                                      fontWeight: '600',
                                      color: '#1e293b',
                                      fontFamily: '"DM Sans", sans-serif',
                                      whiteSpace: 'nowrap',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                    }}>
                                      {res.nombreReservador || res.reservadoPor?.split('@')[0]}
                                    </div>
                                    <span className={`ar-badge ${esHoy ? 'ar-badge-blue' : esFuturo ? 'ar-badge-indigo' : 'ar-badge-slate'}`}
                                      style={{ fontSize: '9px', padding: '2px 6px' }}>
                                      {esHoy ? 'hoy' : esFuturo ? new Date(res.fecha + 'T12:00:00').toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }) : new Date(res.fecha + 'T12:00:00').toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })}
                                    </span>
                                    <span className={`ar-badge ${res.rol === 'admin' ? 'ar-badge-red' : res.rol === 'maestro' ? 'ar-badge-blue' : 'ar-badge-slate'}`}
                                      style={{ fontSize: '9px', padding: '2px 6px' }}>
                                      {res.rol}
                                    </span>
                                  </div>
                                  {res.descripcion && (
                                    <div style={{
                                      fontSize: '11.5px',
                                      color: '#64748b',
                                      fontFamily: '"DM Sans", sans-serif',
                                      lineHeight: '1.4',
                                      overflow: 'hidden',
                                      display: '-webkit-box',
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: 'vertical',
                                    }}>
                                      {res.descripcion}
                                    </div>
                                  )}
                                </div>

                                {/* Cancel if admin/maestro */}
                                {permisos.verReservas && (
                                  <button
                                    className="ar-btn-danger"
                                    style={{ padding: '4px 10px', fontSize: '10px', flexShrink: 0 }}
                                    onClick={() => cancelarReserva(res.id)}
                                  >
                                    ✕
                                  </button>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Card footer */}
                      <div style={{ padding: '10px 18px', borderTop: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', gap: '8px' }}>
                        <button
                          className="ar-btn-reserve"
                          onClick={() => setVistaActual('aulasPúblicas')}
                          style={{ flex: 1, fontSize: '11px', padding: '6px' }}
                        >
                          Ver horarios
                        </button>
                        {(usuarioActivo?.rol === 'maestro' || usuarioActivo?.rol === 'admin') && (
                          <button
                            className="ar-btn-green"
                            onClick={() => setVistaActual('aulasPúblicas')}
                            style={{ flex: 1, fontSize: '11px', padding: '6px' }}
                          >
                            + Reservar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* ════════════════════════════
              VIEW: LIST / TABLE
          ════════════════════════════ */}
          {vistaTab === 'ar-lista' && (
            <div className="ar-card" style={{ animationDelay: '0.1s' }}>

              {/* Sub-header */}
              <div style={{
                padding: '12px 20px',
                borderBottom: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
                <span style={{ fontSize: '11.5px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>{listaReservas.filter(r => r.estado === 'Confirmada').length}</span> reserva(s) activa(s) en el sistema
                </span>
                {/* Role pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Admin',   count: listaReservas.filter(r => r.rol === 'admin'   && r.estado === 'Confirmada').length, color: '#dc2626', bg: '#fef2f2' },
                    { label: 'Maestro', count: listaReservas.filter(r => r.rol === 'maestro' && r.estado === 'Confirmada').length, color: '#2563eb', bg: '#eff6ff' },
                    { label: 'Alumno',  count: listaReservas.filter(r => r.rol === 'alumno'  && r.estado === 'Confirmada').length, color: '#16a34a', bg: '#f0fdf4' },
                  ].map(({ label, count, color, bg }) => (
                    <div key={label} style={{ background: bg, border: `1px solid ${color}20`, borderRadius: '4px', padding: '4px 11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div style={{ overflowX: 'auto' }}>
                <table className="ar-table">
                  <thead>
                    <tr>
                      <th>Aula</th>
                      <th>Reservado por</th>
                      <th>Fecha</th>
                      <th>Horario</th>
                      <th>Rol</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      {permisos.verReservas && <th style={{ textAlign: 'right' }}>Acciones</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {listaReservas.length === 0 ? (
                      <tr style={{ opacity: 1 }}>
                        <td colSpan="8">
                          <div className="ar-empty">
                            <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                              </svg>
                            </div>
                            <p style={{ margin: 0, fontSize: '13px' }}>Sin reservas registradas</p>
                            <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>Las reservas confirmadas aparecerán aquí</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      listaReservas.map((res, idx) => {
                        const hoy = (() => {
                          const d = new Date();
                          return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
                        })();
                        const esHoy = res.fecha === hoy;
                        const esFuturo = res.fecha > hoy;
                        const esCancelada = res.estado !== 'Confirmada';

                        return (
                          <tr key={res.id} style={{ animationDelay: `${0.15 + idx * 0.03}s`, opacity: esCancelada ? 0.5 : undefined }}>

                            {/* Aula */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: '30px', height: '30px', borderRadius: '4px', flexShrink: 0,
                                  background: '#f0fdf4',
                                  border: '1px solid #86efac',
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                                  </svg>
                                </div>
                                <div>
                                  <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>{res.aulaNombre}</div>
                                  {res.aulaCapacidad && (
                                    <div style={{ fontSize: '10.5px', color: '#b0bac9', fontFamily: '"DM Sans", sans-serif' }}>
                                      Cap. {res.aulaCapacidad}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Reservado por */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{
                                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                                  background: res.rol === 'admin' ? '#fef2f2' : res.rol === 'maestro' ? '#eff6ff' : '#f0fdf4',
                                  border: `1px solid ${res.rol === 'admin' ? '#fca5a5' : res.rol === 'maestro' ? '#93c5fd' : '#86efac'}`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                  <span style={{ fontSize: '11px', fontWeight: '700', color: res.rol === 'admin' ? '#dc2626' : res.rol === 'maestro' ? '#2563eb' : '#16a34a', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
                                    {(res.nombreReservador || res.reservadoPor || '?').charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '12.5px', fontFamily: '"DM Sans", sans-serif' }}>
                                    {res.nombreReservador || res.reservadoPor?.split('@')[0]}
                                  </div>
                                  <div style={{ fontSize: '10.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                                    {res.reservadoPor}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Fecha */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div style={{ fontWeight: '500', fontSize: '12.5px', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>
                                  {new Date(res.fecha + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </div>
                                {esHoy && (
                                  <span className="ar-badge ar-badge-blue" style={{ fontSize: '9px', padding: '2px 6px', animation: 'arPulse 2s ease infinite' }}>
                                    Hoy
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Horario */}
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: '"DM Sans", sans-serif' }}>
                                <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#1e293b' }}>{res.horaInicio}</span>
                                <span style={{ fontSize: '10px', color: '#94a3b8' }}>→</span>
                                <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#1e293b' }}>{res.horaFin}</span>
                              </div>
                            </td>

                            {/* Rol */}
                            <td>
                              <span className={`ar-badge ${res.rol === 'admin' ? 'ar-badge-red' : res.rol === 'maestro' ? 'ar-badge-blue' : 'ar-badge-green'}`}>
                                {res.rol}
                              </span>
                            </td>

                            {/* Descripción */}
                            <td style={{ maxWidth: '200px' }}>
                              <div style={{
                                fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif',
                                lineHeight: '1.4', overflow: 'hidden',
                                display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                              }}>
                                {res.descripcion || <span style={{ color: '#cbd5e1' }}>—</span>}
                              </div>
                            </td>

                            {/* Estado */}
                            <td>
                              <span className={`ar-badge ${res.estado === 'Confirmada' ? 'ar-badge-green' : 'ar-badge-red'}`}>
                                {res.estado || 'Confirmada'}
                              </span>
                            </td>

                            {/* Acciones */}
                            {permisos.verReservas && (
                              <td style={{ textAlign: 'right' }}>
                                {res.estado === 'Confirmada' && (
                                  <button className="ar-btn-danger" onClick={() => cancelarReserva(res.id)}>
                                    Cancelar
                                  </button>
                                )}
                              </td>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              {listaReservas.length > 0 && (
                <div style={{ padding: '10px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                    {listaReservas.length} reserva(s) en total · {listaReservas.filter(r => r.estado === 'Confirmada').length} confirmada(s)
                  </span>
                  <span style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    Solo administradores y maestros pueden cancelar reservas
                  </span>
                </div>
              )}
            </div>
          )}
        </>
      );
    })()}
  </div>
)}



  {/* ============ VISTA MIS SOLICITUDES (ALUMNO Y MAESTRO) ============ */}
              {permisos.solicitarEquipos && vistaActual === 'solicitudes' && (
                <div className="seccion-blanca">
                  <h2> Estado de Mis Solicitudes</h2>
                  
                  <h3 style={{marginTop: '20px', color: '#1e40af'}}>Aulas Pendientes</h3>
                  <div className="table-container">
                    <table>
                      <thead><tr><th>Aula</th><th>Fecha y Hora</th><th>Motivo</th><th>Estado</th><th>Acciones</th></tr></thead>
                      <tbody>
                        {listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).length === 0 ? (
                          <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No tienes solicitudes de aulas</td></tr>
                        ) : (
                          listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).map(sol => (
                            <tr key={sol.id}>
                              <td><strong>{sol.aulaNombre || sol.tipo}</strong></td>
                              <td>{sol.fechaSolicitada} ({sol.horaInicio})</td>
                              <td style={{fontSize: '12px'}}>{sol.descripcion}</td>
                              <td><span className={`badge ${sol.estado === 'Aprobada' ? 'badge-success' : sol.estado === 'Rechazada' ? 'badge-danger' : 'badge-warning'}`}>{sol.estado}</span></td>
                              <td>
                                {/* Botón para retirar solicitud de aula */}
                                {sol.estado === 'Pendiente' && (
                                  <button className="btn-small btn-danger" onClick={() => cancelarSolicitudPropia(sol.id, "solicitudes", `Aula ${sol.aulaNombre}`)}>Retirar</button>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  <h3 style={{marginTop: '40px', color: '#1e40af'}}>Materiales Solicitados</h3>
                  <div className="table-container">
                    <table>
                      <thead><tr><th>Material</th><th>Cant</th><th>Vencimiento</th><th>Estado / Devolución</th><th>Acciones</th></tr></thead>
                      <tbody>
                        {listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).length === 0 ? (
                          <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No tienes solicitudes de materiales</td></tr>
                        ) : (
                          listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).map(sol => (
                            <tr key={sol.id}>
                              <td><strong>{sol.equipoNombre}</strong></td><td>x{sol.cantidad}</td>
                              <td style={{fontSize: '13px'}}>{new Date(sol.fechaDevolucionEsperada).toLocaleString('es-ES', {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</td>
                              <td><span className={`badge ${sol.devuelto ? 'badge-success' : (sol.estado === 'Pendiente' ? 'badge-warning' : 'badge-danger')}`}>{sol.devuelto ? 'Devuelto' : sol.estado}</span></td>
                              <td>
                                {/* Botón para retirar solicitud de material */}
                                {sol.estado === 'Pendiente' && (
                                  <button className="btn-small btn-danger" onClick={() => cancelarSolicitudPropia(sol.id, "solicitudes_material", `Material ${sol.equipoNombre}`)}>Cancelar</button>
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
                                  Cancelar
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


              {/* ============ VISTA AULAS PÚBLICAS (RESERVAR / SOLICITAR) ============ */}


{vistaActual === 'aulasPúblicas' && (
  <div style={{ animation: 'fadeIn 0.4s ease' }}>
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap');

      /* ── Keyframes ── */
      @keyframes adSlideUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes adFadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes adExpandBar {
        from { width: 0; }
      }
      @keyframes adPulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(5,150,105,0.4); }
        50%       { box-shadow: 0 0 0 6px rgba(5,150,105,0); }
      }
      @keyframes adPulseBlue {
        0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
        50%       { box-shadow: 0 0 0 6px rgba(37,99,235,0); }
      }
      @keyframes adShake {
        0%, 100% { transform: translateX(0); }
        20%       { transform: translateX(-4px); }
        40%       { transform: translateX(4px); }
        60%       { transform: translateX(-4px); }
        80%       { transform: translateX(4px); }
      }
      @keyframes adSlideRight {
        from { opacity: 0; transform: translateX(-12px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes adScaleIn {
        from { opacity: 0; transform: scale(0.96); }
        to   { opacity: 1; transform: scale(1); }
      }

      /* ── Base ── */
      .ad-font { font-family: 'DM Sans', sans-serif; }

      /* ── Date input ── */
      .ad-date-input {
        padding: 9px 14px;
        border: 1px solid rgba(255,255,255,0.18);
        border-radius: 4px;
        font-size: 13px;
        font-family: 'DM Sans', sans-serif;
        color: #ffffff;
        background: rgba(255,255,255,0.1);
        outline: none;
        transition: border-color 0.2s, background 0.2s;
        cursor: pointer;
        width: 160px;
      }
      .ad-date-input:focus {
        border-color: rgba(255,255,255,0.4);
        background: rgba(255,255,255,0.15);
      }
      .ad-date-input::-webkit-calendar-picker-indicator {
        filter: invert(1);
        opacity: 0.7;
        cursor: pointer;
      }

      /* ── Aula selector buttons ── */
      .ad-aula-btn {
        padding: 14px 18px;
        border: 1.5px solid #e4e8ef;
        border-radius: 6px;
        background: #ffffff;
        cursor: pointer;
        text-align: left;
        font-family: 'DM Sans', sans-serif;
        transition: all 0.2s ease;
        position: relative;
        overflow: hidden;
        opacity: 0;
        animation: adSlideUp 0.35s ease forwards;
      }
      .ad-aula-btn::before {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 3px;
        background: #e4e8ef;
        transition: background 0.2s, width 0.2s;
      }
      .ad-aula-btn:hover {
        border-color: #94a3b8;
        box-shadow: 0 4px 16px rgba(15,23,42,0.08);
        transform: translateY(-2px);
      }
      .ad-aula-btn:hover::before {
        background: #059669;
        width: 4px;
      }
      .ad-aula-btn.ad-selected {
        border-color: #059669;
        background: #f0fdf4;
        box-shadow: 0 4px 20px rgba(5,150,105,0.15);
      }
      .ad-aula-btn.ad-selected::before {
        background: #059669;
        width: 4px;
      }

      /* ── Time slot grid ── */
      .ad-slot {
        border: 1.5px solid transparent;
        border-radius: 5px;
        padding: 0;
        cursor: pointer;
        transition: all 0.18s ease;
        position: relative;
        overflow: hidden;
        font-family: 'DM Sans', sans-serif;
      }
      .ad-slot-inner {
        padding: 11px 14px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        height: 100%;
        box-sizing: border-box;
      }
      .ad-slot.ad-slot-free {
        background: #f0fdf4;
        border-color: #d1fae5;
      }
      .ad-slot.ad-slot-free:hover {
        background: #dcfce7;
        border-color: #86efac;
        transform: translateY(-2px);
        box-shadow: 0 4px 14px rgba(5,150,105,0.15);
      }
      .ad-slot.ad-slot-selected {
        background: #dbeafe;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        animation: adPulseBlue 2s ease infinite;
      }
      .ad-slot.ad-slot-occupied {
        background: #fef2f2;
        border-color: #fecaca;
        cursor: default;
      }
      .ad-slot.ad-slot-pending {
        background: #fffbeb;
        border-color: #fde68a;
        cursor: not-allowed;
      }
      .ad-slot.ad-slot-past {
        background: #f8fafc;
        border-color: #f1f5f9;
        opacity: 0.55;
        cursor: not-allowed;
      }
      .ad-slot.ad-slot-free:active { transform: scale(0.98); }

      /* ── Detail panel ── */
      .ad-detail-panel {
        background: #ffffff;
        border: 1px solid #e4e8ef;
        border-radius: 6px;
        overflow: hidden;
        animation: adScaleIn 0.25s ease forwards;
      }

      /* ── Textarea ── */
      .ad-textarea {
        width: 100%;
        padding: 11px 14px;
        border: 1.5px solid #e4e8ef;
        border-radius: 5px;
        font-size: 13px;
        font-family: 'DM Sans', sans-serif;
        color: #1e293b;
        background: #fafbfc;
        resize: vertical;
        min-height: 80px;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        box-sizing: border-box;
      }
      .ad-textarea:focus {
        border-color: #059669;
        box-shadow: 0 0 0 3px rgba(5,150,105,0.1);
        background: #ffffff;
      }
      .ad-textarea::placeholder { color: #b8c0cc; }

      /* ── Submit buttons ── */
      .ad-btn-submit {
        padding: 11px 24px;
        background: #059669;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        letter-spacing: 0.2px;
      }
      .ad-btn-submit:hover {
        background: #047857;
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(5,150,105,0.3);
      }
      .ad-btn-submit-blue {
        padding: 11px 24px;
        background: #2563eb;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        letter-spacing: 0.2px;
      }
      .ad-btn-submit-blue:hover {
        background: #1d4ed8;
        transform: translateY(-1px);
        box-shadow: 0 4px 14px rgba(37,99,235,0.3);
      }
      .ad-btn-ghost {
        padding: 11px 20px;
        background: transparent;
        color: #64748b;
        border: 1.5px solid #e4e8ef;
        border-radius: 5px;
        font-size: 13px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: all 0.2s;
      }
      .ad-btn-ghost:hover {
        border-color: #94a3b8;
        background: #f8fafc;
        color: #334155;
      }

      /* ── Badges ── */
      .ad-badge {
        display: inline-block;
        padding: 3px 9px;
        border-radius: 3px;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 0.7px;
        text-transform: uppercase;
        font-family: 'DM Sans', sans-serif;
      }
      .ad-badge-green  { background: #f0fdf4; color: #16a34a; }
      .ad-badge-red    { background: #fef2f2; color: #dc2626; }
      .ad-badge-amber  { background: #fffbeb; color: #b45309; }
      .ad-badge-blue   { background: #eff6ff; color: #2563eb; }
      .ad-badge-slate  { background: #f1f5f9; color: #475569; }
      .ad-badge-indigo { background: #eef2ff; color: #4338ca; }

      /* ── Legend dot ── */
      .ad-legend-dot {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        flex-shrink: 0;
      }

      /* ── Occupancy micro-bar ── */
      .ad-occ-track {
        height: 2px;
        background: #f1f5f9;
        border-radius: 2px;
        overflow: hidden;
        margin-top: 3px;
      }
      .ad-occ-fill {
        height: 100%;
        border-radius: 2px;
        animation: adExpandBar 0.8s ease both;
      }
    `}</style>

    {/* ══════════════════════════════════════════════════
        HEADER BANNER
    ══════════════════════════════════════════════════ */}
    <div style={{
      background: 'linear-gradient(105deg, #0f172a 0%, #064e3b 50%, #065f46 100%)',
      borderRadius: '6px',
      padding: '32px 40px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      flexWrap: 'wrap',
      position: 'relative',
      overflow: 'hidden',
      animation: 'adSlideUp 0.5s ease forwards',
    }}>
      {/* Grid texture */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {/* Glow accents */}
      <div style={{ position: 'absolute', top: '-60px', right: '-30px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.22) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-50px', left: '20%', width: '240px', height: '240px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      {/* Left: text */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}>
          Gestión de Espacios
        </p>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
          Aulas <span style={{ fontStyle: 'italic' }}>Disponibles</span>
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.42)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
          Consulta horarios en tiempo real y reserva o solicita tu espacio
        </p>
      </div>

      {/* Right: date picker + mini stats */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
        {/* Date picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}>
            Fecha
          </span>
          <input
            type="date"
            className="ad-date-input"
            value={fechaSeleccionada}
            onChange={(e) => {
              setFechaSeleccionada(e.target.value);
              setReservaDetalle(null);
              setAulaActual(null);
              setHorarioSeleccionado(null);
              setShowSolicitudDesdeAula(false);
            }}
          />
        </div>

        {/* Mini stats row */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {[
            { label: 'Aulas totales',   value: listaAulas.length },
            {
              label: 'Disponibles hoy',
              value: (() => {
                const hoy = fechaSeleccionada;
                return listaAulas.filter(a => {
                  const slots = generarHorarios(a.id, hoy);
                  return slots.some(s => !s.ocupado && !s.pasado && !s.conSolicitud);
                }).length;
              })(),
            },
            {
              label: 'Bloques libres',
              value: (() => {
                const hoy = fechaSeleccionada;
                let libre = 0;
                listaAulas.forEach(a => {
                  generarHorarios(a.id, hoy).forEach(s => {
                    if (!s.ocupado && !s.pasado && !s.conSolicitud) libre++;
                  });
                });
                return libre;
              })(),
            },
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '8px 14px', textAlign: 'center', minWidth: '74px' }}>
              <div style={{ fontSize: '18px', fontWeight: '300', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '3px' }}>{stat.value}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.38)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.4px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* ══════════════════════════════════════════════════
        LAYOUT: SIDEBAR (aula selector) + MAIN (schedule)
    ══════════════════════════════════════════════════ */}
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '16px', alignItems: 'flex-start', opacity: 0, animation: 'adSlideUp 0.4s ease 0.08s forwards' }}>

      {/* ────────────────────────
          LEFT: AULA SELECTOR
      ──────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '10px', fontWeight: '600', letterSpacing: '1.4px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
          Selecciona un Aula
        </p>

        {listaAulas.length === 0 ? (
          <div style={{ background: '#ffffff', border: '1px solid #e4e8ef', borderRadius: '6px', padding: '28px 16px', textAlign: 'center' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Sin aulas registradas</p>
          </div>
        ) : (
          listaAulas.map((aula, idx) => {
            const horariosAula = generarHorarios(aula.id, fechaSeleccionada);
            const hoyStr = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; })();
            const esFechaPasadaAula = fechaSeleccionada < hoyStr;
            const libres = esFechaPasadaAula ? 0 : horariosAula.filter(h => !h.ocupado && !h.pasado && !h.conSolicitud).length;
            const ocupados = horariosAula.filter(h => h.ocupado).length;
            const pctOcup = Math.min((ocupados / 11) * 100, 100);
            const enMantenimiento = aula.estado === 'Mantenimiento';
            const isSelected = aulaActual?.id === aula.id;

            return (
              <button
                key={aula.id}
                className={`ad-aula-btn ${isSelected ? 'ad-selected' : ''}`}
                style={{ animationDelay: `${0.1 + idx * 0.05}s` }}
                onClick={() => {
                  setAulaActual(aula);
                  setReservaDetalle(null);
                  setHorarioSeleccionado(null);
                  setShowSolicitudDesdeAula(false);
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '4px', flexShrink: 0,
                      background: enMantenimiento ? '#fffbeb' : isSelected ? '#dcfce7' : '#f0fdf4',
                      border: `1px solid ${enMantenimiento ? '#fde68a' : isSelected ? '#86efac' : '#d1fae5'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={enMantenimiento ? '#b45309' : '#059669'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                      </svg>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif', lineHeight: 1.2 }}>
                      {aula.nombre}
                    </span>
                  </div>
                  {isSelected && (
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669', animation: 'adPulse 2s ease infinite', flexShrink: 0 }} />
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                    Cap. {aula.capacidad} · {aula.equipoDisponible || 'Sin equipo'}
                  </span>
                  <span className={`ad-badge ${enMantenimiento ? 'ad-badge-amber' : libres > 0 ? 'ad-badge-green' : 'ad-badge-red'}`}>
                    {enMantenimiento ? 'Mant.' : `${libres} libre${libres !== 1 ? 's' : ''}`}
                  </span>
                </div>

                {/* Micro occupancy bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ flex: 1 }}>
                    <div className="ad-occ-track">
                      <div className="ad-occ-fill" style={{
                        width: `${pctOcup}%`,
                        background: pctOcup >= 70 ? '#dc2626' : pctOcup >= 40 ? '#d97706' : '#059669',
                      }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', flexShrink: 0 }}>
                    {ocupados}/11
                  </span>
                </div>
              </button>
            );
          })
        )}

        {/* Legend */}
        {listaAulas.length > 0 && (
          <div style={{ marginTop: '8px', padding: '12px 14px', background: '#fafbfc', border: '1px solid #f1f5f9', borderRadius: '5px' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '9.5px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Leyenda</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[
                { color: '#d1fae5', border: '#86efac', label: 'Disponible' },
                { color: '#dbeafe', border: '#93c5fd', label: 'Seleccionado' },
                { color: '#fee2e2', border: '#fca5a5', label: 'Ocupado' },
                { color: '#fef3c7', border: '#fde68a', label: 'En solicitud' },
                { color: '#f1f5f9', border: '#e2e8f0', label: 'Pasado' },
              ].map(({ color, border, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div className="ad-legend-dot" style={{ background: color, border: `1px solid ${border}` }} />
                  <span style={{ fontSize: '11.5px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ────────────────────────────────────
          RIGHT: SCHEDULE + DETAIL / FORM
      ──────────────────────────────────── */}
      <div>
        {!aulaActual ? (
          /* Empty state */
          <div style={{
            background: '#ffffff',
            border: '1px solid #e4e8ef',
            borderRadius: '6px',
            padding: '60px 40px',
            textAlign: 'center',
            opacity: 0,
            animation: 'adFadeIn 0.4s ease 0.15s forwards',
          }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: '600', color: '#475569', fontFamily: '"DM Sans", sans-serif' }}>
              Selecciona un aula para ver sus horarios
            </p>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
              Elige una opción en el panel de la izquierda para consultar la disponibilidad
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* ── Aula header card ── */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e4e8ef',
              borderRadius: '6px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap',
              animation: 'adSlideRight 0.3s ease forwards',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '6px', flexShrink: 0,
                  background: aulaActual.estado === 'Mantenimiento' ? '#fffbeb' : '#f0fdf4',
                  border: `1px solid ${aulaActual.estado === 'Mantenimiento' ? '#fde68a' : '#86efac'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={aulaActual.estado === 'Mantenimiento' ? '#b45309' : '#059669'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', fontFamily: '"DM Serif Display", serif' }}>
                    {aulaActual.nombre}
                  </div>
                  <div style={{ fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', marginTop: '2px' }}>
                    Capacidad {aulaActual.capacidad} personas · {aulaActual.equipoDisponible || 'Sin equipo especial'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>
                    {new Date(fechaSeleccionada + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', marginTop: '1px' }}>
                    {generarHorarios(aulaActual.id, fechaSeleccionada).filter(h => !h.ocupado && !h.pasado && !h.conSolicitud).length} bloque(s) disponibles
                  </div>
                </div>
                <span className={`ad-badge ${
                  aulaActual.estado === 'Mantenimiento' ? 'ad-badge-amber'
                    : generarHorarios(aulaActual.id, fechaSeleccionada).some(h => !h.ocupado && !h.pasado) ? 'ad-badge-green'
                    : 'ad-badge-red'
                }`}>
                  {aulaActual.estado === 'Mantenimiento' ? 'En mantenimiento'
                    : generarHorarios(aulaActual.id, fechaSeleccionada).some(h => !h.ocupado && !h.pasado) ? 'Disponible'
                    : 'Sin horarios libres'}
                </span>
              </div>
            </div>

            {/* ── Time slots grid ── */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #e4e8ef',
              borderRadius: '6px',
              overflow: 'hidden',
              animation: 'adSlideUp 0.3s ease 0.06s forwards',
              opacity: 0,
            }}>
              {/* Slots header */}
              <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '1.3px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                  Bloques Horarios — 7:00 a 18:00
                </span>
                {horarioSeleccionado && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb', animation: 'adPulse 1.5s ease infinite' }} />
                    <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#2563eb', fontFamily: '"DM Sans", sans-serif' }}>
                      Bloque {horarioSeleccionado.horaInicio}–{horarioSeleccionado.horaFin} seleccionado
                    </span>
                  </div>
                )}
              </div>

              {/* Slots */}
              <div style={{ padding: '16px 20px' }}>
                {/* Banner: fecha pasada */}
                {(() => {
                  const hoyStr = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; })();
                  if (fechaSeleccionada >= hoyStr) return null;
                  return (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '10px 14px', marginBottom: '14px',
                      background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '5px',
                    }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#991b1b', fontFamily: '"DM Sans", sans-serif' }}>
                        Esta fecha ya pasó — no es posible reservar en fechas anteriores al día de hoy
                      </span>
                    </div>
                  );
                })()}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
                  {(() => {
                    const hoyStr = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; })();
                    const esFechaPasada = fechaSeleccionada < hoyStr;

                    return generarHorarios(aulaActual.id, fechaSeleccionada).map((horario, idx) => {
                      const isPast = horario.pasado || esFechaPasada;
                      const isSelected = horarioSeleccionado?.horaInicio === horario.horaInicio;
                      const slotClass = isPast
                        ? 'ad-slot-past'
                        : horario.conSolicitud
                          ? 'ad-slot-pending'
                          : horario.ocupado
                            ? 'ad-slot-occupied'
                            : isSelected
                              ? 'ad-slot-selected'
                              : 'ad-slot-free';

                      return (
                        <button
                          key={idx}
                          className={`ad-slot ${slotClass}`}
                          disabled={isPast || horario.conSolicitud}
                          onClick={() => {
                            if (isPast || horario.conSolicitud) return;
                            if (horario.ocupado) {
                              setReservaDetalle(horario.reserva);
                              setHorarioSeleccionado(null);
                              setShowSolicitudDesdeAula(false);
                            } else {
                              if (isSelected) {
                                setHorarioSeleccionado(null);
                                setShowSolicitudDesdeAula(false);
                              } else {
                                setHorarioSeleccionado(horario);
                                setReservaDetalle(null);
                                setShowSolicitudDesdeAula(true);
                              }
                            }
                          }}
                        >
                          <div className="ad-slot-inner">
                            <div>
                              <div style={{
                                fontSize: '13px',
                                fontWeight: '700',
                                color: isPast ? '#94a3b8'
                                  : horario.conSolicitud ? '#92400e'
                                  : horario.ocupado ? '#991b1b'
                                  : isSelected ? '#1d4ed8'
                                  : '#166534',
                                fontFamily: '"DM Sans", sans-serif',
                                lineHeight: 1.2,
                              }}>
                                {horario.horaInicio}
                              </div>
                              <div style={{ fontSize: '10px', color: isPast ? '#b0bac9' : '#94a3b8', fontFamily: '"DM Sans", sans-serif', marginTop: '1px' }}>
                                → {horario.horaFin}
                              </div>
                            </div>

                            {/* Status icon / label */}
                            <div style={{ textAlign: 'right' }}>
                              {isPast ? (
                                <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#b0bac9', fontFamily: '"DM Sans", sans-serif' }}>Pasado</span>
                              ) : horario.conSolicitud ? (
                                <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#92400e', fontFamily: '"DM Sans", sans-serif' }}>Pendiente</span>
                              ) : horario.ocupado ? (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                                </svg>
                              ) : isSelected ? (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                              ) : (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                                </svg>
                              )}
                            </div>
                          </div>

                          {/* Occupied: show who */}
                          {horario.ocupado && !isPast && (
                            <div style={{
                              padding: '5px 14px 8px',
                              fontSize: '10.5px',
                              color: '#991b1b',
                              fontFamily: '"DM Sans", sans-serif',
                              borderTop: '1px solid #fecaca',
                              background: 'rgba(220,38,38,0.04)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}>
                              {horario.reserva?.nombreReservador || horario.reserva?.reservadoPor?.split('@')[0] || '—'} · Ver detalle
                            </div>
                          )}
                        </button>
                      );
                    });
                  })()}
                </div>
              </div>
            </div>

            {/* ── OCCUPIED DETAIL PANEL ── */}
            {reservaDetalle && !horarioSeleccionado && (
              <div className="ad-detail-panel" style={{ borderLeft: '3px solid #dc2626' }}>
                {/* Panel header */}
                <div style={{ padding: '14px 20px', background: '#fef2f2', borderBottom: '1px solid #fecaca', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#fecaca', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#991b1b', fontFamily: '"DM Sans", sans-serif' }}>Bloque Reservado</div>
                      <div style={{ fontSize: '11px', color: '#b91c1c', fontFamily: '"DM Sans", sans-serif' }}>
                        {reservaDetalle.horaInicio} – {reservaDetalle.horaFin}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setReservaDetalle(null)}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', fontSize: '16px', lineHeight: 1, fontWeight: '300' }}
                  >
                    ✕
                  </button>
                </div>

                {/* Panel body */}
                <div style={{ padding: '18px 20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Reservado por</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px', height: '28px', borderRadius: '50%',
                        background: reservaDetalle.rol === 'admin' ? '#fef2f2' : reservaDetalle.rol === 'maestro' ? '#eff6ff' : '#f0fdf4',
                        border: `1px solid ${reservaDetalle.rol === 'admin' ? '#fca5a5' : reservaDetalle.rol === 'maestro' ? '#93c5fd' : '#86efac'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                      }}>
                        <span style={{ fontSize: '11px', fontWeight: '700', color: reservaDetalle.rol === 'admin' ? '#dc2626' : reservaDetalle.rol === 'maestro' ? '#2563eb' : '#16a34a', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
                          {(reservaDetalle.nombreReservador || reservaDetalle.reservadoPor || '?').charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>
                          {reservaDetalle.nombreReservador || reservaDetalle.reservadoPor?.split('@')[0]}
                        </div>
                        <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{reservaDetalle.reservadoPor}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Rol</p>
                    <span className={`ad-badge ${reservaDetalle.rol === 'admin' ? 'ad-badge-red' : reservaDetalle.rol === 'maestro' ? 'ad-badge-blue' : 'ad-badge-green'}`}>
                      {reservaDetalle.rol}
                    </span>
                  </div>

                  <div>
                    <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Horario</p>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>
                      {reservaDetalle.horaInicio} → {reservaDetalle.horaFin}
                    </div>
                  </div>

                  {reservaDetalle.descripcion && (
                    <div style={{ gridColumn: '1 / -1' }}>
                      <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Descripción</p>
                      <div style={{ fontSize: '13px', color: '#475569', fontFamily: '"DM Sans", sans-serif', lineHeight: '1.5', whiteSpace: 'pre-wrap' }}>
                        {reservaDetalle.descripcion}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── RESERVATION / REQUEST FORM ── */}
            {horarioSeleccionado && !reservaDetalle && (
              <div
                className="ad-detail-panel"
                style={{ borderLeft: `3px solid ${usuarioActivo.rol === 'alumno' ? '#2563eb' : '#059669'}` }}
              >
                {/* Form header */}
                <div style={{
                  padding: '14px 20px',
                  background: usuarioActivo.rol === 'alumno' ? '#eff6ff' : '#f0fdf4',
                  borderBottom: `1px solid ${usuarioActivo.rol === 'alumno' ? '#bfdbfe' : '#d1fae5'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '4px',
                      background: usuarioActivo.rol === 'alumno' ? '#bfdbfe' : '#bbf7d0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={usuarioActivo.rol === 'alumno' ? '#2563eb' : '#059669'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {usuarioActivo.rol === 'alumno'
                          ? <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>
                          : <><polyline points="20 6 9 17 4 12"/></>
                        }
                      </svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: usuarioActivo.rol === 'alumno' ? '#1e40af' : '#166534', fontFamily: '"DM Sans", sans-serif' }}>
                        {usuarioActivo.rol === 'alumno' ? 'Enviar Solicitud de Reserva' : 'Confirmar Reserva Directa'}
                      </div>
                      <div style={{ fontSize: '11px', color: usuarioActivo?.rol === 'alumno' ? '#3b82f6' : '#16a34a', fontFamily: '"DM Sans", sans-serif' }}>
                        {aulaActual.nombre} · {horarioSeleccionado.horaInicio}–{horarioSeleccionado.horaFin} · {new Date(fechaSeleccionada + 'T12:00:00').toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => { setHorarioSeleccionado(null); setShowSolicitudDesdeAula(false); }}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', fontSize: '16px', lineHeight: 1 }}
                  >
                    ✕
                  </button>
                </div>

                {/* Booking summary strip */}
                <div style={{
                  padding: '12px 20px',
                  borderBottom: '1px solid #f1f5f9',
                  background: '#fafbfc',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '12px',
                }}>
                  {[
                    { label: 'Aula',    value: aulaActual.nombre },
                    { label: 'Fecha',   value: new Date(fechaSeleccionada + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) },
                    { label: 'Horario', value: `${horarioSeleccionado.horaInicio} – ${horarioSeleccionado.horaFin}` },
                    { label: 'Modo',    value: usuarioActivo.rol === 'alumno' ? 'Solicitud' : 'Reserva directa' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', marginBottom: '2px' }}>
                        {label}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form body */}
                <div style={{ padding: '18px 20px' }}>
                  <form onSubmit={crearSolicitud}>
                    <input type="hidden" name="tipo" value="Aula" />
                    <input type="hidden" name="fechaSolicitada" value={fechaSeleccionada} />
                    <input type="hidden" name="aulaNombre" value={aulaActual.nombre} />
                    <input type="hidden" name="aulaId" value={aulaActual.id} />
                    <input type="hidden" name="horaInicio" value={horarioSeleccionado.horaInicio} />
                    <input type="hidden" name="horaFin" value={horarioSeleccionado.horaFin} />

                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '10px', fontWeight: '600', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
                        {usuarioActivo.rol === 'alumno' ? 'Motivo de la solicitud' : 'Descripción del uso del aula'}
                      </label>
                      <textarea
                        name="descripcion"
                        className="ad-textarea"
                        placeholder={
                          usuarioActivo.rol === 'alumno'
                            ? 'Describe el motivo de tu solicitud al administrador...'
                            : 'Describe el uso del aula para esta clase o actividad...'
                        }
                        required
                        rows="3"
                      />
                    </div>

                    {/* Info note */}
                    <div style={{
                      padding: '10px 14px',
                      background: usuarioActivo.rol === 'alumno' ? '#eff6ff' : '#f0fdf4',
                      borderRadius: '4px',
                      marginBottom: '14px',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'flex-start',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={usuarioActivo.rol === 'alumno' ? '#2563eb' : '#059669'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      <span style={{ fontSize: '12px', color: usuarioActivo.rol === 'alumno' ? '#1e40af' : '#166534', fontFamily: '"DM Sans", sans-serif', lineHeight: 1.5 }}>
                        {usuarioActivo.rol === 'alumno'
                          ? 'Tu solicitud quedará pendiente hasta que un administrador la apruebe. Recibirás una notificación con la respuesta.'
                          : 'Como maestro/admin, tu reserva se confirma de inmediato y el horario quedará bloqueado.'
                        }
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="ad-btn-ghost"
                        onClick={() => { setHorarioSeleccionado(null); setShowSolicitudDesdeAula(false); }}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className={usuarioActivo.rol === 'alumno' ? 'ad-btn-submit-blue' : 'ad-btn-submit'}
                      >
                        {usuarioActivo.rol === 'alumno' ? 'Enviar Solicitud' : 'Reservar Ahora'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  </div>
)}
  {/* ============ VISTA INVENTARIO DE MATERIALES ============ */}
              {(permisos.verInventario || permisos.solicitarEquipos) && vistaActual === 'inventario' && (
                <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                  <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap');

                    @keyframes invSlideUp {
                      from { opacity: 0; transform: translateY(20px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes invFadeRow {
                      from { opacity: 0; transform: translateX(-6px); }
                      to   { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes invExpandBar {
                      from { width: 0; }
                    }

                    .inv-input {
                      width: 100%;
                      padding: 9px 13px;
                      border: 1px solid #dde2ea;
                      border-radius: 4px;
                      font-size: 13px;
                      font-family: 'DM Sans', sans-serif;
                      color: #1e293b;
                      background: #ffffff;
                      transition: border-color 0.2s, box-shadow 0.2s;
                      outline: none;
                      box-sizing: border-box;
                    }
                    .inv-input:focus {
                      border-color: #059669;
                      box-shadow: 0 0 0 3px rgba(5,150,105,0.08);
                    }
                    .inv-input::placeholder { color: #b0b8c8; }

                    .inv-btn-primary {
                      padding: 9px 22px;
                      background: #0f172a;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      font-size: 13px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      letter-spacing: 0.3px;
                      transition: background 0.2s, transform 0.15s;
                      white-space: nowrap;
                      height: 38px;
                    }
                    .inv-btn-primary:hover {
                      background: #1e293b;
                      transform: translateY(-1px);
                    }

                    .inv-btn-green {
                      padding: 9px 22px;
                      background: #059669;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      font-size: 13px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      transition: background 0.2s, transform 0.15s;
                      white-space: nowrap;
                      height: 38px;
                    }
                    .inv-btn-green:hover {
                      background: #047857;
                      transform: translateY(-1px);
                    }

                    .inv-btn-outline {
                      padding: 6px 14px;
                      background: transparent;
                      border: 1px solid #e4e8ef;
                      border-radius: 4px;
                      font-size: 11px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      color: #64748b;
                      transition: all 0.2s;
                    }
                    .inv-btn-outline:hover {
                      border-color: #94a3b8;
                      background: #f8fafc;
                    }

                    .inv-btn-danger-outline {
                      padding: 6px 14px;
                      background: transparent;
                      border: 1px solid #fca5a5;
                      border-radius: 4px;
                      font-size: 11px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      color: #dc2626;
                      transition: all 0.2s;
                    }
                    .inv-btn-danger-outline:hover {
                      border-color: #dc2626;
                      background: #fef2f2;
                    }

                    .inv-table {
                      width: 100%;
                      border-collapse: collapse;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .inv-table thead tr {
                      background: #f8fafc;
                      border-bottom: 1px solid #e4e8ef;
                    }
                    .inv-table thead th {
                      padding: 10px 16px;
                      text-align: left;
                      font-size: 10px;
                      font-weight: 600;
                      letter-spacing: 1.2px;
                      text-transform: uppercase;
                      color: #94a3b8;
                    }
                    .inv-table tbody tr {
                      border-bottom: 1px solid #f1f5f9;
                      transition: background 0.15s;
                      opacity: 0;
                      animation: invFadeRow 0.3s ease forwards;
                    }
                    .inv-table tbody tr:last-child { border-bottom: none; }
                    .inv-table tbody tr:hover { background: #fafbfc; }
                    .inv-table td {
                      padding: 12px 16px;
                      font-size: 13px;
                      color: #334155;
                      vertical-align: middle;
                    }

                    .inv-stock-bar {
                      height: 4px;
                      background: #f1f5f9;
                      border-radius: 2px;
                      overflow: hidden;
                      margin-top: 4px;
                      width: 80px;
                    }
                    .inv-stock-fill {
                      height: 100%;
                      border-radius: 2px;
                      animation: invExpandBar 0.8s ease both;
                    }

                    .inv-badge {
                      display: inline-block;
                      padding: 3px 9px;
                      border-radius: 3px;
                      font-size: 10px;
                      font-weight: 700;
                      letter-spacing: 0.7px;
                      text-transform: uppercase;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .inv-badge-green    { background: #f0fdf4; color: #16a34a; }
                    .inv-badge-red      { background: #fef2f2; color: #dc2626; }
                    .inv-badge-amber    { background: #fffbeb; color: #b45309; }
                    .inv-badge-blue     { background: #eff6ff; color: #2563eb; }
                    .inv-badge-gray     { background: #f8fafc; color: #64748b; }

                    .inv-section-label {
                      font-size: 10px;
                      font-weight: 600;
                      letter-spacing: 1.4px;
                      text-transform: uppercase;
                      color: #94a3b8;
                      margin: 0 0 14px 0;
                      font-family: 'DM Sans', sans-serif;
                    }

                    .inv-qty-input {
                      width: 64px;
                      padding: 5px 8px;
                      border: 1px solid #e4e8ef;
                      border-radius: 4px;
                      font-size: 13px;
                      font-family: 'DM Sans', sans-serif;
                      text-align: center;
                      outline: none;
                      transition: border-color 0.2s;
                    }
                    .inv-qty-input:focus { border-color: #059669; }

                    .inv-card {
                      background: #fff;
                      border: 1px solid #e4e8ef;
                      border-radius: 6px;
                      overflow: hidden;
                      opacity: 0;
                      animation: invSlideUp 0.4s ease forwards;
                    }
                    .inv-card-header {
                      padding: 14px 20px;
                      border-bottom: 1px solid #f1f5f9;
                      background: #fafbfc;
                      display: flex;
                      align-items: center;
                      gap: 10px;
                    }

                    .inv-sol-row {
                      display: flex;
                      align-items: flex-start;
                      gap: 12px;
                      padding: 13px 0;
                      border-bottom: 1px solid #f1f5f9;
                      opacity: 0;
                      animation: invFadeRow 0.3s ease forwards;
                    }
                    .inv-sol-row:last-child { border-bottom: none; }
                  `}</style>

                  {/* ── HEADER BANNER ── */}
                  <div style={{
                    background: 'linear-gradient(100deg, #0f172a 0%, #064e3b 55%, #065f46 100%)',
                    borderRadius: '6px',
                    padding: '32px 40px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '20px',
                    flexWrap: 'wrap',
                    position: 'relative',
                    overflow: 'hidden',
                    animation: 'invSlideUp 0.5s ease forwards',
                  }}>
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '600', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontFamily: '"DM Sans", sans-serif' }}>
                        {rolNormalizado === 'admin' ? 'Gestión de Recursos' : 'Consulta de Recursos'}
                      </p>
                      <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
                        Inventario de <span style={{ fontStyle: 'italic' }}>Materiales y Equipos</span>
                      </h2>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
                        {rolNormalizado === 'admin'
                          ? 'Registra, edita y controla el stock del laboratorio'
                          : 'Consulta disponibilidad y solicita préstamos de equipos'}
                      </p>
                    </div>

                    {/* Mini stats */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {[
                        { label: 'Tipos de equipo', value: listaEquipos.length },
                        { label: 'Total en stock',  value: listaEquipos.reduce((t, eq) => t + (eq.cantidad || 0), 0) },
                        { label: 'Sin stock',        value: listaEquipos.filter(eq => (eq.cantidad || 0) === 0).length },
                        { label: 'Préstamos activos', value: listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto).length },
                      ].map((s, i) => (
                        <div key={i} style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '10px 16px', textAlign: 'center', minWidth: '80px' }}>
                          <div style={{ fontSize: '20px', fontWeight: '300', color: s.label === 'Sin stock' && s.value > 0 ? '#fca5a5' : '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '4px' }}>{s.value}</div>
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── ADMIN ONLY: FORM TO ADD EQUIPMENT ── */}
                  {permisos.gestionEquipos && (
                    <div className="inv-card" style={{ marginBottom: '16px', animationDelay: '0.08s' }}>
                      <div className="inv-card-header">
                        <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                          </svg>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>Registrar Nuevo Equipo</div>
                          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Agrega equipos o materiales al inventario del laboratorio</div>
                        </div>
                        <button
                          onClick={() => setShowFormReserva(!showFormReserva)}
                          style={{ marginLeft: 'auto', padding: '6px 16px', background: showFormReserva ? '#f1f5f9' : '#0f172a', color: showFormReserva ? '#64748b' : '#fff', border: '1px solid #e4e8ef', borderRadius: '4px', fontSize: '12px', fontWeight: '600', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                          {showFormReserva ? 'Cancelar' : 'Agregar equipo'}
                        </button>
                      </div>

                      {showFormReserva && (
                        <div style={{ padding: '20px 24px' }}>
                          <form onSubmit={guardarNuevoEquipo}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 140px 160px', gap: '12px', alignItems: 'flex-end' }}>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Nombre del equipo</label>
                                <input name="nombre" className="inv-input" placeholder="Ej: Cámara Sony A7" required />
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Categoría</label>
                                <select name="categoria" className="inv-input" required style={{ cursor: 'pointer' }}>
                                  <option value="">Seleccionar...</option>
                                  <option value="Gafas RV">Gafas RV</option>
                                  <option value="Cámara">Cámara</option>
                                  <option value="Laptop">Laptop</option>
                                  <option value="Micrófono">Micrófono</option>
                                  <option value="Otro">Otro</option>
                                </select>
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Cantidad</label>
                                <input name="cantidad" type="number" min="1" className="inv-input" placeholder="1" defaultValue="1" />
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Estado</label>
                                <select name="estado" className="inv-input" style={{ cursor: 'pointer' }}>
                                  <option value="Disponible">Disponible</option>
                                  <option value="Mantenimiento">Mantenimiento</option>
                                  <option value="Inactivo">Inactivo</option>
                                </select>
                              </div>
                            </div>
                            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                              <button type="submit" className="inv-btn-green">Registrar en inventario</button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── REQUEST FORM (maestro / alumno) ── */}
                  {permisos.solicitarEquipos && (
                    <div className="inv-card" style={{ marginBottom: '16px', animationDelay: '0.1s' }}>
                      <div className="inv-card-header">
                        <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                          </svg>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>Solicitar Material en Préstamo</div>
                          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Completa el formulario y el administrador aprobará tu solicitud</div>
                        </div>
                        <button
                          onClick={() => setShowFormSolicitudMaterial(!showFormSolicitudMaterial)}
                          style={{ marginLeft: 'auto', padding: '6px 16px', background: showFormSolicitudMaterial ? '#f1f5f9' : '#059669', color: showFormSolicitudMaterial ? '#64748b' : '#fff', border: '1px solid ' + (showFormSolicitudMaterial ? '#e4e8ef' : '#059669'), borderRadius: '4px', fontSize: '12px', fontWeight: '600', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                          {showFormSolicitudMaterial ? 'Cancelar' : 'Nueva solicitud'}
                        </button>
                      </div>

                      {showFormSolicitudMaterial && (
                        <div style={{ padding: '20px 24px' }}>
                          <form onSubmit={crearSolicitudMaterial}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 180px', gap: '12px', marginBottom: '12px' }}>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Material</label>
                                <select name="equipoId" className="inv-input" required style={{ cursor: 'pointer' }}>
                                  <option value="">Selecciona un material...</option>
                                  {listaEquipos.filter(e => e.cantidad > 0).map(equipo => (
                                    <option key={equipo.id} value={equipo.id}>
                                      {equipo.nombre} — {equipo.cantidad} disponible{equipo.cantidad !== 1 ? 's' : ''}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Cantidad</label>
                                <input name="cantidad" type="number" min="1" className="inv-input" placeholder="1" required />
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Tiempo de uso</label>
                                <select name="tiempoUso" className="inv-input" required style={{ cursor: 'pointer' }}>
                                  <option value="">Seleccionar duración...</option>
                                  <option value="1">1 hora</option>
                                  <option value="2">2 horas</option>
                                  <option value="24">1 día completo</option>
                                  <option value="168">1 semana</option>
                                  <option value="-24" style={{ color: '#dc2626' }}>TEST: Simular Atraso</option>
                                </select>
                              </div>
                            </div>
                            <div style={{ marginBottom: '14px' }}>
                              <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Motivo del préstamo</label>
                              <textarea name="motivo" className="inv-input" placeholder="¿Para qué clase o proyecto necesitas este material?" required rows="2" style={{ resize: 'vertical', minHeight: '60px' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <button type="submit" className="inv-btn-green">Enviar solicitud al administrador</button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── STOCK TABLE ── */}
                  <div className="inv-card" style={{ marginBottom: '16px', animationDelay: '0.16s' }}>
                    <div className="inv-card-header" style={{ justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                          </svg>
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>Catálogo de Equipos</div>
                          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{listaEquipos.length} tipo(s) registrado(s) en el inventario</div>
                        </div>
                      </div>
                      {/* Category pills */}
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {['Disponible', 'Sin stock', 'Mantenimiento'].map((estado) => {
                          const count = estado === 'Disponible'
                            ? listaEquipos.filter(e => (e.cantidad || 0) > 0).length
                            : estado === 'Sin stock'
                              ? listaEquipos.filter(e => (e.cantidad || 0) === 0).length
                              : listaEquipos.filter(e => e.estado === 'Mantenimiento').length;
                          const color = estado === 'Disponible' ? '#059669' : estado === 'Sin stock' ? '#dc2626' : '#b45309';
                          const bg    = estado === 'Disponible' ? '#f0fdf4' : estado === 'Sin stock' ? '#fef2f2' : '#fffbeb';
                          return (
                            <div key={estado} style={{ background: bg, border: `1px solid ${color}22`, borderRadius: '4px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, display: 'inline-block' }} />
                              <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {estado}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                      <table className="inv-table">
                        <thead>
                          <tr>
                            <th>Equipo / Material</th>
                            <th>Categoría</th>
                            <th>Stock</th>
                            <th>Disponibilidad</th>
                            {rolNormalizado === 'admin' && <th>Registrado por</th>}
                            {rolNormalizado === 'admin' && <th style={{ textAlign: 'right' }}>Acciones</th>}
                          </tr>
                        </thead>
                        <tbody>
                          {listaEquipos.length === 0 ? (
                            <tr style={{ opacity: 1 }}>
                              <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                  </svg>
                                </div>
                                Sin equipos registrados
                              </td>
                            </tr>
                          ) : (
                            listaEquipos.map((eq, idx) => {
                              const sinStock = (eq.cantidad || 0) === 0;
                              const enMantenimiento = eq.estado === 'Mantenimiento';
                              const maxRef = Math.max(...listaEquipos.map(e => e.cantidad || 0), 1);
                              const pct = Math.min(((eq.cantidad || 0) / maxRef) * 100, 100);
                              const barColor = sinStock ? '#dc2626' : enMantenimiento ? '#b45309' : '#059669';

                              return (
                                <tr key={eq.id} style={{ animationDelay: `${0.2 + idx * 0.04}s` }}>
                                  {/* Nombre */}
                                  <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: sinStock ? '#fef2f2' : '#f0fdf4', border: `1px solid ${sinStock ? '#fca5a5' : '#86efac'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sinStock ? '#dc2626' : '#059669'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                                        </svg>
                                      </div>
                                      <div>
                                        <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>{eq.nombre}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>ID: {eq.id.slice(0, 8)}...</div>
                                      </div>
                                    </div>
                                  </td>
                                  {/* Categoría */}
                                  <td>
                                    <span className="inv-badge inv-badge-gray">{eq.categoria || '—'}</span>
                                  </td>
                                  {/* Stock */}
                                  <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      {rolNormalizado === 'admin' ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                          <input
                                            type="number"
                                            className="inv-qty-input"
                                            defaultValue={eq.cantidad || 0}
                                            min="0"
                                            onBlur={(e) => {
                                              const val = parseInt(e.target.value);
                                              if (!isNaN(val) && val !== eq.cantidad) {
                                                actualizarCantidadEquipo(eq.id, val);
                                              }
                                            }}
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') e.target.blur();
                                            }}
                                          />
                                          <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>uds.</span>
                                        </div>
                                      ) : (
                                        <div>
                                          <span style={{ fontSize: '22px', fontWeight: '300', fontFamily: '"DM Serif Display", serif', color: sinStock ? '#dc2626' : '#0f172a', lineHeight: 1 }}>{eq.cantidad || 0}</span>
                                          <div className="inv-stock-bar">
                                            <div className="inv-stock-fill" style={{ width: `${pct}%`, background: barColor }} />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </td>
                                  {/* Disponibilidad */}
                                  <td>
                                    <span className={`inv-badge ${sinStock ? 'inv-badge-red' : enMantenimiento ? 'inv-badge-amber' : 'inv-badge-green'}`}>
                                      {sinStock ? 'Sin stock' : enMantenimiento ? 'Mantenimiento' : 'Disponible'}
                                    </span>
                                  </td>
                                  {/* Admin only columns */}
                                  {rolNormalizado === 'admin' && (
                                    <td style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
                                      {eq.registradoPor?.split('@')[0] || '—'}
                                    </td>
                                  )}
                                  {rolNormalizado === 'admin' && (
                                    <td style={{ textAlign: 'right' }}>
                                      <button className="inv-btn-danger-outline" onClick={() => eliminarEquipo(eq.id)}>
                                        Eliminar
                                      </button>
                                    </td>
                                  )}
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>

                    {listaEquipos.length > 0 && (
                      <div style={{ padding: '10px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                          {listaEquipos.length} tipo(s) · {listaEquipos.reduce((t, eq) => t + (eq.cantidad || 0), 0)} unidades totales
                        </span>
                        {rolNormalizado === 'admin' && (
                          <span style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif' }}>
                            Edita las cantidades directamente en la celda y presiona Enter
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* ── MY REQUESTS (maestro / alumno) ── */}
                  {permisos.solicitarEquipos && listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo?.email).length > 0 && (
                    <div className="inv-card" style={{ animationDelay: '0.24s' }}>
                      <div className="inv-card-header" style={{ justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                            </svg>
                          </div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>Mis Solicitudes de Material</div>
                            <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>Historial de préstamos solicitados por ti</div>
                          </div>
                        </div>
                        {/* Pending count badge */}
                        {listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo?.email && s.estado === 'Pendiente').length > 0 && (
                          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '4px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#b45309', display: 'inline-block' }} />
                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#b45309', fontFamily: '"DM Sans", sans-serif' }}>
                              {listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo?.email && s.estado === 'Pendiente').length} pendiente(s)
                            </span>
                          </div>
                        )}
                      </div>

                      <div style={{ overflowX: 'auto' }}>
                        <table className="inv-table">
                          <thead>
                            <tr>
                              <th>Material</th>
                              <th>Cantidad</th>
                              <th>Motivo</th>
                              <th>Devolución esperada</th>
                              <th>Estado</th>
                              <th>Devuelto</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo?.email).map((sol, idx) => {
                              const ahora = new Date();
                              const fechaVenc = new Date(sol.fechaDevolucionEsperada);
                              const esAtrasado = sol.estado === 'Aprobada' && !sol.devuelto && ahora > fechaVenc;

                              return (
                                <tr key={sol.id} style={{ animationDelay: `${0.3 + idx * 0.04}s`, background: esAtrasado ? '#fef2f2' : '' }}>
                                  <td>
                                    <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>{sol.equipoNombre}</div>
                                  </td>
                                  <td>
                                    <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: '18px', fontWeight: '300', color: '#0f172a' }}>×{sol.cantidad}</span>
                                  </td>
                                  <td style={{ fontSize: '12px', color: '#64748b', maxWidth: '180px', fontFamily: '"DM Sans", sans-serif' }}>{sol.motivo || '—'}</td>
                                  <td>
                                    <div style={{ fontSize: '12px', color: esAtrasado ? '#dc2626' : '#64748b', fontFamily: '"DM Sans", sans-serif', fontWeight: esAtrasado ? '600' : '400' }}>
                                      {esAtrasado && (
                                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>Vencido</div>
                                      )}
                                      {new Date(sol.fechaDevolucionEsperada).toLocaleString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                  </td>
                                  <td>
                                    <span className={`inv-badge ${sol.estado === 'Aprobada' ? 'inv-badge-green' : sol.estado === 'Rechazada' ? 'inv-badge-red' : 'inv-badge-amber'}`}>
                                      {sol.estado}
                                    </span>
                                  </td>
                                  <td>
                                    <span className={`inv-badge ${sol.devuelto ? 'inv-badge-green' : sol.estado === 'Aprobada' ? 'inv-badge-red' : 'inv-badge-gray'}`}>
                                      {sol.devuelto ? 'Sí' : sol.estado === 'Aprobada' ? 'No' : '—'}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {permisos.verSolicitudes && vistaActual === 'solicitudesAdmin' && (
                <div className="seccion-blanca">
                  <div className="section-header">
                    <h2>Gestión de Solicitudes</h2>
                  </div>

                  {/* TABS */}
                  <div style={{display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px'}}>
                    <button 
                      onClick={() => setTabSolicitudesAdmin('aulas')}
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderBottom: tabSolicitudesAdmin === 'aulas' ? '3px solid #3b82f6' : 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: tabSolicitudesAdmin === 'aulas' ? '#3b82f6' : '#64748b'
                      }}
                    >
                      📚 Aulas ({listaSolicitudes.filter(s => s.estado === 'Pendiente').length})
                    </button>
                    <button 
                      onClick={() => setTabSolicitudesAdmin('materiales')}
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderBottom: tabSolicitudesAdmin === 'materiales' ? '3px solid #3b82f6' : 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: tabSolicitudesAdmin === 'materiales' ? '#3b82f6' : '#64748b'
                      }}
                    >
                      Materiales ({listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length})
                    </button>
                    <button 
                      onClick={() => setTabSolicitudesAdmin('devoluciones')}
                      style={{
                        padding: '10px 20px',
                        border: 'none',
                        borderBottom: tabSolicitudesAdmin === 'devoluciones' ? '3px solid #3b82f6' : 'none',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        fontSize: '15px',
                        color: tabSolicitudesAdmin === 'devoluciones' ? '#3b82f6' : '#64748b'
                      }}
                    >
                      Devoluciones ({listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto).length})
                    </button>
                  </div>

                  {/* TAB: AULAS */}
                  {tabSolicitudesAdmin === 'aulas' && (
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
                                        Aprobar
                                      </button>
                                      <button 
                                        className="btn-small btn-danger" 
                                        onClick={() => rechazarSolicitud(sol.id)}
                                      >
                                        Rechazar
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
                  )}

                  {/* TAB: MATERIALES */}
                  {tabSolicitudesAdmin === 'materiales' && (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>Solicitado por</th>
                            <th>Material (cantidad)</th>
                            <th>Motivo</th>  {/* <--- NUEVA COLUMNA */}
                            <th>Tiempo</th>
                            <th>Vencimiento</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaSolicitudesMaterial.length === 0 ? (
                            <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>No hay solicitudes de material</td></tr>
                          ) : (
                            listaSolicitudesMaterial.filter(s => s.estado !== 'Rechazada').map((sol) => {
                              const equipo = listaEquipos.find(e => e.id === sol.equipoId);
                              const ahora = new Date();
                              const vencimiento = new Date(sol.fechaDevolucionEsperada || sol.fechaVencimiento);
                              const esAtrasado = sol.estado === 'Aprobada' && !sol.devuelto && ahora > vencimiento;
                              
                              return (
                                <tr key={sol.id} className={sol.estado === 'Pendiente' ? 'row-highlight' : ''} style={{backgroundColor: esAtrasado ? '#fee2e2' : ''}}>
                                  <td><strong>{sol.solicitadoPor}</strong></td>
                                  <td>{equipo ? equipo.nombre : 'Desconocido'} <b>(x{sol.cantidad})</b></td>
                                  <td style={{fontSize: '12px', maxWidth: '150px'}}>{sol.motivo || 'No especificado'}</td> {/* <--- NUEVA CELDA */}
                                  <td style={{fontSize: '13px'}}>{sol.tiempoUso} horas</td>
                                  <td style={{fontSize: '13px', color: esAtrasado ? '#dc2626' : '#64748b'}}>
                                    {esAtrasado && '⚠️ '} 
                                    {new Date(sol.fechaDevolucionEsperada || sol.fechaVencimiento).toLocaleString('es-ES', {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
                                  </td>
                                  <td>
                                    <span className={`badge ${
                                      sol.estado === 'Aprobada' ? 'badge-success' : 
                                      sol.estado === 'Rechazada' ? 'badge-danger' : 
                                      'badge-warning'
                                    }`}>
                                      {sol.estado}
                                    </span>
                                  </td>
                                  <td style={{whiteSpace: 'nowrap'}}>
                                    {sol.estado === 'Pendiente' && (
                                      <>
                                        <button 
                                          className="btn-small btn-success" 
                                          onClick={() => aprobarSolicitudMaterial(sol.id)}
                                        >
                                          Aprobar
                                        </button>
                                        <button 
                                          className="btn-small btn-danger" 
                                          onClick={() => rechazarSolicitudMaterial(sol.id)}
                                        >
                                          Rechazar
                                        </button>
                                      </>
                                    )}
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

  {/* TAB: DEVOLUCIONES */}
                  {tabSolicitudesAdmin === 'devoluciones' && (
                    <div className="table-container">
                      {/* Botón dinámico para ejecutar la función de atrasos */}
                      <div style={{padding: '15px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#f8fafc'}}>
                        <button className="btn-small btn-danger" onClick={enviarNotificacionesPorAtrasos} style={{padding: '8px 15px'}}>
                          🔔 Enviar Recordatorios de Atraso a Alumnos
                        </button>
                      </div>

                      <table>
                        <thead>
                          <tr>
                            <th>Usuario</th>
                            <th>Material</th>
                            <th>Cantidad</th>
                            <th>Vencimiento</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto).length === 0 ? (
                            <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>Todos los materiales han sido devueltos ✅</td></tr>
                          ) : (
                            listaSolicitudesMaterial
                              .filter(s => s.estado === 'Aprobada' && !s.devuelto)
                              .sort((a, b) => {
                                const fechaA = new Date(a.fechaDevolucionEsperada);
                                const fechaB = new Date(b.fechaDevolucionEsperada);
                                return fechaA - fechaB;
                              })
                              .map((sol) => {
                                const equipo = listaEquipos.find(e => e.id === sol.equipoId);
                                const ahora = new Date();
                                const vencimiento = new Date(sol.fechaDevolucionEsperada);
                                const esAtrasado = ahora > vencimiento;
                                const horasAtrasado = esAtrasado ? Math.floor((ahora - vencimiento) / (1000 * 60 * 60)) : null;
                                
                                return (
                                  <tr key={sol.id} style={{backgroundColor: esAtrasado ? '#fee2e2' : '#f0fdf4', borderLeft: esAtrasado ? '4px solid #dc2626' : '4px solid #22c55e'}}>
                                    <td><strong>{sol.solicitadoPor}</strong></td>
                                    <td>{equipo ? equipo.nombre : 'Desconocido'}</td>
                                    <td>{sol.cantidad}</td>
                                    <td style={{fontSize: '13px', color: esAtrasado ? '#dc2626' : '#16a34a'}}>
                                      {esAtrasado ? `⚠️ Atrasado ${horasAtrasado}h` : '✅ A tiempo'} <br/>
                                      {new Date(sol.fechaDevolucionEsperada).toLocaleString('es-ES', {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
                                    </td>
                                    <td>
                                      <span className={`badge ${esAtrasado ? 'badge-danger' : 'badge-success'}`}>
                                        {esAtrasado ? 'ATRASADO' : 'EN TIEMPO'}
                                      </span>
                                    </td>
                                    <td>
                                      <button 
                                        className="btn-small btn-success" 
                                        onClick={() => registrarDevolucionMaterial(sol.id)}
                                        style={{backgroundColor: '#16a34a'}}
                                      >
                                        ✅ Devolución Confirmada
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
              
              {/* FALLBACK si no hay vista */}
              {!vistaActual && (
                <div style={{padding: '20px', color: 'red', fontSize: '16px', fontWeight: 'bold'}}>
                  Error: Vista no seleccionada. Por favor, recarga la página.
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
              <h1>LabReserve</h1>
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
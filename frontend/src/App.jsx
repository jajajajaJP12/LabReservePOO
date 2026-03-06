  import logo from './logo.png';
  import translations from './translations';
  import { useState, useEffect } from 'react';
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
  import { doc, setDoc, getDoc, collection, addDoc, onSnapshot, query, orderBy, updateDoc, deleteDoc, getDocs, where } from 'firebase/firestore';
  import { auth, db } from './firebase';
  import './App.css';


  // ==================================================
// FUNCIONES DE ZONA HORARIA ESTRICTA (CORRECCIÓN)
// ==================================================
// Cambia 'America/Mexico_City' por tu zona horaria real si es distinta
  const obtenerFechaLocal = () => {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Mexico_City',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());
  };

  const obtenerHoraLocal = () => {
    return parseInt(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Mexico_City',
      hour: '2-digit',
      hour12: false
    }).format(new Date()), 10);
  };
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
    const [cargando, setCargando] = useState(false);
    const [usuarioActivo, setUsuarioActivo] = useState(null);
    const [lang, setLang] = useState('es');
    const t = translations[lang];

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
    const [fechaSeleccionada, setFechaSeleccionada] = useState(obtenerFechaLocal);
    const [aulaActual, setAulaActual] = useState(null);
    const [reservaDetalle, setReservaDetalle] = useState(null);
    const [showSolicitudDesdeAula, setShowSolicitudDesdeAula] = useState(false);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

    // Traduccion de idioma - Funciones globales
    const traducirEstado = (estado) => {
      const map = {
        'Aprobada': t.status.approved, 'Rechazada': t.status.rejected,
        'Pendiente': t.status.pending, 'Confirmada': t.status.confirmed,
        'Disponible': t.status.available, 'Mantenimiento': t.status.maintenance,
        'Devuelto': t.status.returned, 'Sin Stock': t.status.noStock, 'Cancelada': t.status.cancelled,
      };
      return map[estado] || estado;
    };

    const traducirRol = (rol) => {
      const map = { admin: t.roles.admin, maestro: t.roles.maestro, alumno: t.roles.alumno };
      return map[rol?.toLowerCase()] || rol;
    };

    const traducirEquipo = (equipo) => {
      const map = {
        'Gafas RV': t.classrooms.vrGlasses,
        'Cámaras': t.classrooms.cameras,
        'Laptops': t.classrooms.laptops,
        'Proyector': t.classrooms.projector,
        'Pantalla interactiva': t.classrooms.interactiveScreen,
        'Múltiple': t.classrooms.multiple,
        'Sin equipo': t.classrooms.noEquip,
      };
      return map[equipo] || equipo;
    };

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
      
      // Validar que los campos no estén vacíos
      if (!email.trim() || !password.trim()) {
        mostrarMensaje('Por favor completa todos los campos', 'error');
        return;
      }
      
      // Validar que la contraseña tenga al menos 6 caracteres
      if (password.length < 6) {
        mostrarMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
        return;
      }
      
      setCargando(true);
      setMensaje(t.login.creatingAccount);
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
        setCargando(false);
      } catch (error) {
        setCargando(false);
        
        // Mensajes de error específicos según el tipo
        if (error.code === 'auth/email-already-in-use') {
          mostrarMensaje('Este correo ya está registrado. Intenta con otro', 'error');
        } else if (error.code === 'auth/invalid-email') {
          mostrarMensaje('Correo electrónico inválido', 'error');
        } else if (error.code === 'auth/weak-password') {
          mostrarMensaje('La contraseña es muy débil. Usa al menos 6 caracteres', 'error');
        } else {
          mostrarMensaje('Error al crear la cuenta. Intenta de nuevo', 'error');
        }
      }
    };

    // --- FUNCIÓN RECUPERADA: INICIAR SESIÓN ---
    const manejarIngreso = async (e) => {
      e.preventDefault();
      
      // Validar que los campos no estén vacíos
      if (!email.trim() || !password.trim()) {
        mostrarMensaje('Por favor completa todos los campos', 'error');
        return;
      }
      
      setCargando(true);
      setMensaje(t.login.loggingIn);
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
        setCargando(false);
      } catch (error) {
        setCargando(false);
        
        // Mensajes de error específicos según el tipo
        if (error.code === 'auth/user-not-found') {
          mostrarMensaje('Usuario no encontrado. Verifica tu correo electrónico', 'error');
        } else if (error.code === 'auth/wrong-password') {
          mostrarMensaje('Contraseña incorrecta. Intenta de nuevo', 'error');
        } else if (error.code === 'auth/invalid-email') {
          mostrarMensaje('Correo electrónico inválido', 'error');
        } else if (error.code === 'auth/user-disabled') {
          mostrarMensaje('Esta cuenta ha sido desactivada', 'error');
        } else if (error.code === 'auth/too-many-requests') {
          mostrarMensaje('Demasiados intentos fallidos. Intenta más tarde', 'error');
        } else {
          mostrarMensaje('Las credenciales no son correctas. Verifica tu correo y contraseña', 'error');
        }
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

        mostrarMensaje(`${t.messages.rolAssigned} ${emailAsignar}`, 'success');
        e.target.reset();
      } catch (error) {
        mostrarMensaje(t.messages.errorRolAssign + error.message, 'error');
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
          'permissionsUpdated',
          t.messages.roleChangedMsg || `${t.messages.adminChangedMsg || 'An administrator has changed'} ${t.messages.yourAccessLevelMsg || 'your access level to'} ${nuevoRol.toUpperCase()}. ${t.messages.signOutAndSignInMsg || 'Sign out and sign back in to see the changes'}.`
        );

        mostrarMensaje(`${t.messages.permissionsUpdated} ${correo} ${t.messages.permissionsUpdatedEnd} ${nuevoRol.toUpperCase()}`, 'success');
      } catch (error) {
        mostrarMensaje(t.messages.errorUpdate + error.message, 'error');
      }
    };

    // --- FUNCIÓN: ELIMINAR USUARIO DEL SISTEMA ---
    const eliminarUsuarioDB = async (userId, correo) => {
      if (confirm(`${t.messages.confirmRevokeAccess} ${correo}?\n\n${t.messages.confirmRevokeExtra}`)) {
        try {
          await deleteDoc(doc(db, "usuarios", userId));
          // Opcional: También borrar de la lista de roles asignados
          await deleteDoc(doc(db, "roles_asignados", correo)); 
          mostrarMensaje(`${t.messages.accessRevoked} ${correo}`, 'success');
        } catch (error) {
          mostrarMensaje(t.messages.errorRevoke + error.message, 'error');
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
    // --- FUNCIONES AUXILIARES DE TRADUCCIÓN ---
    const traducirNotificacion = (titulo, claveNotificacion) => {
      // Mapeo directo de claves a traducciones
      const notificacionesTranslations = {
        newMaterialRequest: { es: 'Nueva Solicitud de Material', en: 'New Material Request' },
        materialApproved: { es: 'Material Aprobado', en: 'Material Approved' },
        materialRejected: { es: 'Material Rechazado', en: 'Material Rejected' },
        successfulReturn: { es: 'Devolución Exitosa', en: 'Successful Return' },
        overdueReminder: { es: '⚠️ Material Atrasado', en: '⚠️ Overdue Material' },
        roomReservationConfirmed: { es: 'Reserva Confirmada', en: 'Reservation Confirmed' },
        roomReservationRejected: { es: 'Reserva Rechazada', en: 'Reservation Rejected' },
        directReservationCreated: { es: 'Reserva Directa Creada', en: 'Direct Reservation Created' },
        newRoomRequest: { es: 'Nueva Solicitud de Aula', en: 'New Room Request' },
        scheduleReleased: { es: 'Horario Liberado / Cancelación', en: 'Schedule Released / Cancellation' },
        permissionsUpdated: { es: '🛡️ Permisos Actualizados', en: '🛡️ Permissions Updated' },
      };
      
      try {
        // Si nos pasaron la clave directamente
        if (claveNotificacion && notificacionesTranslations[claveNotificacion]) {
          return notificacionesTranslations[claveNotificacion][lang] || titulo;
        }
        
        // Si nos pasaron el título, buscar la clave por reverse lookup
        if (titulo) {
          for (const [clave, traducciones] of Object.entries(notificacionesTranslations)) {
            if (traducciones.es === titulo || traducciones.en === titulo) {
              return traducciones[lang] || titulo;
            }
          }
        }
      } catch (e) {
        // Silente fail
      }
      
      // Fallback: devolver el título original
      return titulo;
    };
    
    const crearNotificacion = async (para, claveNotificacion, descripcion) => {
      const notificacionesTranslations = {
        newMaterialRequest: { es: 'Nueva Solicitud de Material', en: 'New Material Request' },
        materialApproved: { es: 'Material Aprobado', en: 'Material Approved' },
        materialRejected: { es: 'Material Rechazado', en: 'Material Rejected' },
        successfulReturn: { es: 'Devolución Exitosa', en: 'Successful Return' },
        overdueReminder: { es: '⚠️ Material Atrasado', en: '⚠️ Overdue Material' },
        roomReservationConfirmed: { es: 'Reserva Confirmada', en: 'Reservation Confirmed' },
        roomReservationRejected: { es: 'Reserva Rechazada', en: 'Reservation Rejected' },
        directReservationCreated: { es: 'Reserva Directa Creada', en: 'Direct Reservation Created' },
        newRoomRequest: { es: 'Nueva Solicitud de Aula', en: 'New Room Request' },
        scheduleReleased: { es: 'Horario Liberado / Cancelación', en: 'Schedule Released / Cancellation' },
        permissionsUpdated: { es: '🛡️ Permisos Actualizados', en: '🛡️ Permissions Updated' },
      };
      
      try {
        const tituloEnEspanol = notificacionesTranslations[claveNotificacion]?.es || claveNotificacion;
        await addDoc(collection(db, "notificaciones"), {
          para,
          claveNotificacion,
          titulo: tituloEnEspanol,
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
      if (confirm(t.messages.confirmCancelRequest)) {
        try {
          await deleteDoc(doc(db, coleccion, id));
          // Le avisamos al admin que el usuario se arrepintió
          await crearNotificacion(
            'admin', 
            '❌ Solicitud Retirada', 
            `${usuarioActivo.email} canceló su solicitud de: ${detalle}`
          );
          mostrarMensaje(t.messages.requestCancelled, 'success');
        } catch (error) { 
          mostrarMensaje(t.messages.errorCancel, 'error'); 
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
          mostrarMensaje(`${t.messages.insufficientStockRequest} ${equipo.cantidad} ${t.messages.units} ${equipo.nombre}.`, 'error');
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
          'newMaterialRequest',
          `${usuarioActivo.email} ${t.messages.requestedItemMsg || 'requested'} ${cantidad}x ${equipo.nombre}. ${t.messages.reasonMsg || 'Reason'}: ${motivo}`
        );
        
        e.target.reset();
        mostrarMensaje(t.messages.requestSent, 'success');
        setShowFormSolicitudMaterial(false);
      } catch (error) {
        console.error('Error al crear solicitud:', error);
        mostrarMensaje(t.messages.errorRequest, 'error');
      }
    };

    const aprobarSolicitudMaterial = async (id) => {
      try {
        const solicitud = listaSolicitudesMaterial.find(s => s.id === id);
        const equipo = listaEquipos.find(e => e.id === solicitud.equipoId);
        
        if (equipo.cantidad < solicitud.cantidad) {
          mostrarMensaje(`${t.messages.insufficientStock} ${equipo.cantidad}`, 'error');
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
          'materialApproved',
          `${t.messages.yourRequestMsg || 'Your request'} ${solicitud.cantidad}x ${equipo.nombre} ${t.messages.wasApprovedMsg || 'was approved'}.`
        );
        
        mostrarMensaje(t.messages.materialApproved, 'success');
      } catch (error) {
        console.error('Error al aprobar:', error);
        mostrarMensaje(t.messages.errorApprove, 'error');
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
          'materialRejected',
          `${t.messages.yourRequestMsg || 'Your request'} ${t.messages.forMsg || 'for'} ${equipo?.nombre || t.messages.materialMsg || 'the material'} ${t.messages.wasRejectedMsg || 'was rejected'}.`
        );
        
        mostrarMensaje(t.messages.requestRejected, 'warning');
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
          'successfulReturn',
          `${t.messages.adminConfirmedMsg || 'The admin confirmed the return of'} ${solicitud.cantidad}x ${equipo.nombre}.`
        );
        
        mostrarMensaje(t.messages.returnRegistered, 'success');
      } catch (error) {
        console.error('Error en devolución:', error);
        mostrarMensaje(t.messages.errorReturn, 'error');
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
        mostrarMensaje(t.messages.roomRegistered, 'success');
        setShowFormAula(false);
      } catch (error) { 
        mostrarMensaje(t.messages.errorRegisterRoom + error.message, 'error');
      }
    };

    const eliminarAula = async (id) => {
      
if (confirm(t.messages.confirmDeleteRoom)) {
        try {
          await deleteDoc(doc(db, "aulas", id));
        mostrarMensaje(t.messages.roomDeleted, 'success');
        } catch (error) { 
          mostrarMensaje(t.messages.errorDeleteRoom, 'error');
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
        mostrarMensaje(t.messages.equipRegistered, 'success');
      } catch (error) { 
        mostrarMensaje(t.messages.errorRegisterEquip, 'error');
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
        mostrarMensaje(t.messages.reservationMade, 'success');
        setShowFormReserva(false);
      } catch (error) { 
        mostrarMensaje(t.messages.errorReservation, 'error');
      }
    };

    const cancelarReserva = async (id) => {
        if (confirm(t.messages.confirmCancelReservation)) {
          try {
            const reserva = listaReservas.find(r => r.id === id);
            await deleteDoc(doc(db, "reservas", id));
            
            // Notificación inteligente: Si el dueño cancela -> avisa al admin. Si admin cancela -> avisa al dueño.
            const destinatario = usuarioActivo.email === reserva.reservadoPor ? 'admin' : reserva.reservadoPor;
            await crearNotificacion(
              destinatario,
              'scheduleReleased',
              `${t.messages.reservationCancelledMsg || 'The reservation for'} ${reserva.aulaNombre} ${t.messages.onMsg || 'on'} ${reserva.fecha} (${reserva.horaInicio} - ${reserva.horaFin}) ${t.messages.wasCancelledMsg || 'was cancelled'}.`
            );
            mostrarMensaje(t.messages.reservationCancelled, 'success');
          } catch (error) { 
            mostrarMensaje(t.messages.errorCancelReservation, 'error');
          }
        }
      };

    // --- FUNCIONES DE INVENTARIO ---
    const eliminarEquipo = async (equipoId) => {
      if (!window.confirm(t.messages.confirmDeleteEquip)) return;
      try {
        await deleteDoc(doc(db, "equipos", equipoId));
        setListaEquipos(listaEquipos.filter(eq => eq.id !== equipoId));
        mostrarMensaje(t.messages.equipDeleted, 'success');
      } catch (error) {
        console.error('Error al eliminar equipo:', error);
        mostrarMensaje(t.messages.errorDeleteEquip, 'error');
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
        mostrarMensaje(t.messages.qtyUpdated, 'success');
      } catch (error) {
        console.error('Error al actualizar cantidad:', error);
        mostrarMensaje(t.messages.errorUpdateQty, 'error');
      }
    };

    const enviarNotificacionesPorAtrasos = async () => {
        const ahora = new Date();
        
        // CORRECCIÓN: Buscamos en 'listaSolicitudesMaterial', no en 'listaReservas'
        const atrasados = listaSolicitudesMaterial.filter(s => 
          s.estado === 'Aprobada' && !s.devuelto && new Date(s.fechaDevolucionEsperada) < ahora
        );
        
        if (atrasados.length === 0) {
          mostrarMensaje(t.messages.noOverdue, 'info');
          return;
        }

        try {
          for (const material of atrasados) {
            // Usamos tu función crearNotificacion para que use el formato correcto
            await crearNotificacion(
              material.solicitadoPor,
              t.notifications.overdueReminder,
              `${t.messages.attentionMsg || 'Attention'}: ${t.messages.notReturnedMsg || "You haven't returned the material"} "${material.equipoNombre}" (x${material.cantidad}). ${t.messages.loanExpiredMsg || 'Your loan expired on'} ${new Date(material.fechaDevolucionEsperada).toLocaleString('es-ES', {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}.`
            );
          }
          mostrarMensaje(`${t.messages.remindersSent} ${atrasados.length} ${t.messages.remindersEnd}`, 'success');
        } catch (error) {
          console.error('Error al enviar notificaciones:', error);
          mostrarMensaje(t.messages.errorReminders, 'error');
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
            await crearNotificacion('admin', 'directReservationCreated', `${usuarioActivo.email} ${t.messages.reservedMsg || 'reserved'} ${t.messages.roomMsg || 'the room'} ${aulaNombre} ${t.messages.forMsg || 'for'} ${fechaSolicitada} (${horaInicio} - ${horaFin}).`);
            mostrarMensaje(t.messages.directReserveCreated, 'success');
          } 
          // Si es Alumno -> Crea Solicitud Pendiente
          else {
            await addDoc(collection(db, "solicitudes"), {
              tipo, descripcion, fechaSolicitada, aulaNombre, aulaId, horaInicio, horaFin,
              solicitadoPor: usuarioActivo.email, nombreSolicitador: usuarioActivo.email.split('@')[0],
              rol: usuarioActivo.rol, estado: 'Pendiente', fechaSolicitud: new Date().toISOString()
            });
            await crearNotificacion('admin', 'newRoomRequest', `${usuarioActivo.email} ${t.messages.asksForMsg || 'asks for'} ${t.messages.roomMsg || 'the room'} ${aulaNombre} ${t.messages.forMsg || 'for'} ${fechaSolicitada} (${horaInicio} - ${horaFin}).`);
            mostrarMensaje(t.messages.requestSent, 'success');
          }
          
          e.target.reset();
          setShowSolicitudDesdeAula(false);
          setHorarioSeleccionado(null);
        } catch (error) { 
          mostrarMensaje(t.messages.errorRequest, 'error');
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
            'roomReservationConfirmed',
            `${t.messages.readyMsg || 'Ready'} ${t.messages.yourReservationMsg || 'Your reservation'} ${t.messages.forMsg || 'for'} ${t.messages.roomMsg || 'the room'} ${solicitud.aulaNombre} ${t.messages.onMsg || 'on'} ${solicitud.fechaSolicitada} (${solicitud.horaInicio} - ${solicitud.horaFin}) ${t.messages.hasBeenApprovedMsg || 'has been approved'}​.`
          );
          
          setListaReservas([{...nuevaReserva, id: reservaRef.id}, ...listaReservas]);
          setListaSolicitudes(listaSolicitudes.map(s => 
            s.id === id ? {...s, estado: 'Aprobada'} : s
          ));
          
          mostrarMensaje(t.messages.requestApproved, 'success');
        }
      } catch (error) { 
        console.error('Error al aprobar solicitud:', error);
        mostrarMensaje(t.messages.errorApprove + error.message, 'error');
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
          'roomReservationRejected',
          `${t.messages.sorryMsg || 'Sorry'}, ${t.messages.yourRequestMsg || 'your request'} ${t.messages.forMsg || 'for'} ${t.messages.roomMsg || 'the room'} ${solicitud.aulaNombre} ${t.messages.onMsg || 'on'} ${solicitud.fechaSolicitada} ${t.messages.wasRejectedMsg || 'was rejected'} ${t.messages.byAdminMsg || 'by the administrator'}.`
        );
        
        setListaSolicitudes(listaSolicitudes.map(s => 
          s.id === id ? {...s, estado: 'Rechazada'} : se
        ));
        
        mostrarMensaje(t.messages.requestRejected, 'success');
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
      
      // SOLUCIÓN APLICADA: Forzamos la zona horaria
      const horaActual = obtenerHoraLocal();
      const fechaActual = obtenerFechaLocal();
      const esHoy = fecha === fechaActual;
      
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
        
        // Verificar si el horario ya pasó
        const horaPasada = esHoy && hora < horaActual;
        
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
                {t.roles[usuarioActivo.rol]}
              </div>
            </div>
            <nav className="sidebar-menu">
              <button className={`menu-btn ${vistaActual === 'inicio' ? 'activo' : ''}`} onClick={() => setVistaActual('inicio')}>{t.nav.home}</button>
              {usuarioActivo.rol === 'admin' && (<button className={`menu-btn ${vistaActual === 'roles' ? 'activo' : ''}`} onClick={() => setVistaActual('roles')}>{t.nav.roles}</button>)}
              {permisos.gestionAulas && (<button className={`menu-btn ${vistaActual === 'aulas' ? 'activo' : ''}`} onClick={() => setVistaActual('aulas')}>{t.nav.classrooms}</button>)}
              {permisos.gestionEquipos && (<button className={`menu-btn ${vistaActual === 'equipos' ? 'activo' : ''}`} onClick={() => setVistaActual('equipos')}>{t.nav.inventory}</button>)}
              <button className={`menu-btn ${vistaActual === 'aulasReservadas' ? 'activo' : ''}`} onClick={() => setVistaActual('aulasReservadas')}>{t.nav.reservedRooms}</button>
              <button className={`menu-btn ${vistaActual === 'aulasPúblicas' ? 'activo' : ''}`} onClick={() => setVistaActual('aulasPúblicas')}>{t.nav.availableRooms}</button>
              {permisos.solicitarEquipos && (<button className={`menu-btn ${vistaActual === 'solicitudes' ? 'activo' : ''}`} onClick={() => setVistaActual('solicitudes')}>{t.nav.myRequests}</button>)}
              {(permisos.verInventario || permisos.solicitarEquipos) && (<button className={`menu-btn ${vistaActual === 'inventario' ? 'activo' : ''}`} onClick={() => setVistaActual('inventario')}>{t.nav.inventoryView}</button>)}
              {permisos.verSolicitudes && (<button className={`menu-btn ${vistaActual === 'solicitudesAdmin' ? 'activo' : ''}`} onClick={() => setVistaActual('solicitudesAdmin')}>{t.nav.requests} ({listaSolicitudes.filter(s => s.estado === 'Pendiente').length})</button>)}
              {permisos.verReservas && (<button className={`menu-btn ${vistaActual === 'reservasAdmin' ? 'activo' : ''}`} onClick={() => setVistaActual('reservasAdmin')}>{t.nav.allReservations}</button>)}

              <div className="sidebar-footer">
                <p>{usuarioActivo.email}</p>
                <button className="btn-logout" onClick={cerrarSesion}>{t.nav.logout}</button>
              </div>
            </nav>
          </aside>

          <main className="main-content">
            <header className="topbar">
              <div className="topbar-title">
                <h1 id="page-title">{t.nav.home}</h1>
              </div>
              <div className="topbar-info">
                <button
                  onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
                  title={t.topbar.langLabel}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 14px',
                    background: 'transparent',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '13px', fontWeight: '700',
                    color: '#1e293b', cursor: 'pointer',
                    transition: 'all 0.2s', letterSpacing: '0.5px',
                    fontFamily: 'inherit',
                  }}
>
                  <span style={{ fontSize: '16px' }}>{lang === 'es' ? '🇺🇸' : '🇲🇽'}</span>
                  <span>{t.topbar.langButton}</span>
                </button>
                <span>{t.topbar.systemName}</span>
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
                          <h3 style={{margin: 0, fontSize: '16px', color: '#1e293b'}}>{t.notifications.title}</h3>
                          <button onClick={() => setShowModalNotificaciones(false)} style={{background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 'bold'}}>✕</button>
                        </div>
                        
                        <div style={{flex: 1, overflowY: 'auto', padding: '0'}}>
                          {misNotificaciones.length === 0 ? (
                            <div style={{textAlign: 'center', padding: '40px 20px', color: '#94a3b8'}}>
                              <p style={{fontSize: '30px', margin: '0 0 10px 0'}}>📭</p>
                              <p style={{margin: 0}}>{t.notifications.empty}</p>
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
                  <h3 style={{margin: '0 0 5px 0', fontSize: '18px', color: '#7f1d1d', fontWeight: 'bold'}}>{t.overdueAlert.title}</h3>
                  <p style={{margin: '0 0 10px 0', fontSize: '14px'}}>{t.overdueAlert.subtitle}</p>
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
                      {t.home.panelLabel}
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
                        {t.home.welcome} <span style={{ fontStyle: 'italic' }}>{usuarioActivo.email.split('@')[0]}</span>
                      </h2>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '13.5px', fontFamily: '"DM Sans", sans-serif' }}>
                        {t.home.systemName}
                      </p>
                    </div>

                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', fontFamily: '"DM Sans", sans-serif' }}>
                        {t.home.accessLevel}
                      </span>
                      <div style={{
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '4px',
                        padding: '8px 20px',
                      }}>
                        <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif' }}>
                          {t.roles[usuarioActivo.rol]}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80' }} />
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}>{t.home.systemOnline}</span>
                      </div>
                    </div>
                  </div>

                  {/* ── STATS GRID ── */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', marginBottom: '20px' }}>

                    {/* Aulas */}
                    <div className="lab-stat-card" style={{ '--line-color': '#2563eb', animation: 'slideUp 0.4s ease 0.1s forwards', opacity: 0 }}>
                      <div className="accent-line" />
                      <div style={{ paddingLeft: '4px' }}>
                        <p className="lab-section-label">{t.home.registeredRooms}</p>
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
                        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.home.spaces}</p>
                      </div>
                    </div>

                    {/* Stock */}
                    <div className="lab-stat-card" style={{ '--line-color': '#059669', animation: 'slideUp 0.4s ease 0.18s forwards', opacity: 0 }}>
                      <div className="accent-line" />
                      <div style={{ paddingLeft: '4px' }}>
                        <p className="lab-section-label">{t.home.stockUnits}</p>
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
                        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.home.equipmentMaterials}</p>
                      </div>
                    </div>

                    {/* Reservas */}
                    <div className="lab-stat-card" style={{ '--line-color': '#d97706', animation: 'slideUp 0.4s ease 0.26s forwards', opacity: 0 }}>
                      <div className="accent-line" />
                      <div style={{ paddingLeft: '4px' }}>
                        <p className="lab-section-label">{t.home.confirmedReservations}</p>
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
                        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.home.activeReservations}</p>
                      </div>
                    </div>

                    {/* 4ta tarjeta dinámica */}
                    {(rolNormalizado === 'admin' || rolNormalizado === 'maestro') ? (
                      <div className="lab-stat-card" style={{ '--line-color': '#dc2626', animation: 'slideUp 0.4s ease 0.34s forwards', opacity: 0 }}>
                        <div className="accent-line" />
                        <div style={{ paddingLeft: '4px' }}>
                          <p className="lab-section-label">{t.home.pendingRequests}</p>
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
                          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.home.needAttention}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="lab-stat-card" style={{ '--line-color': '#7c3aed', animation: 'slideUp 0.4s ease 0.34s forwards', opacity: 0 }}>
                        <div className="accent-line" />
                        <div style={{ paddingLeft: '4px' }}>
                          <p className="lab-section-label">{t.home.myRequestsStat}</p>
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
                          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.home.sentRequests}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── BOTTOM ROW ── */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px', animation: 'slideUp 0.4s ease 0.42s forwards', opacity: 0 }}>

                    {/* Acciones rápidas */}
                    <div style={{ background: '#ffffff', borderRadius: '6px', padding: '26px', border: '1px solid #e4e8ef' }}>
                      <p className="lab-section-label">{t.home.quickAccess}</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

                        <button className="lab-action-row" onClick={() => setVistaActual('aulasPúblicas')}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '4px', background: '#f0f4ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>{t.home.checkAvailability}</div>
                            <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{t.home.checkAvailabilitySub}</div>
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
                              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>{t.home.requestMaterial}</div>
                              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{t.home.requestMaterialSub}</div>
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
                              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>{t.home.manageRequests}</div>
                              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>
                                {listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length} {t.home.pending}
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
                              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>{t.home.userManagement}</div>
                              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{listaUsuarios.length} {t.home.registered}</div>
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
                              <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', marginBottom: '1px' }}>{t.home.allReservations}</div>
                              <div style={{ fontSize: '11.5px', color: '#94a3b8' }}>{t.home.fullHistory}</div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Actividad reciente */}
                    <div style={{ background: '#ffffff', borderRadius: '6px', padding: '26px', border: '1px solid #e4e8ef' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <p className="lab-section-label" style={{ margin: 0 }}>{t.home.recentActivity}</p>
                        {misNotificaciones.filter(n => !n.leida).length > 0 && (
                          <span style={{ fontSize: '11px', color: '#2563eb', fontWeight: '600', fontFamily: '"DM Sans", sans-serif' }}>
                            {misNotificaciones.filter(n => !n.leida).length} {t.notifications.unread}
                          </span>
                        )}
                      </div>

                      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {misNotificaciones.length === 0 ? (
                          <div style={{ padding: '40px 0', textAlign: 'center' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                            </div>
                            <p style={{ fontSize: '13px', color: '#94a3b8', margin: 0, fontFamily: '"DM Sans", sans-serif' }}>{t.home.noActivity}</p>
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
                                  {(traducirNotificacion(notif.titulo, notif.claveNotificacion) || '').replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{1F300}-\u{1F9FF}]/gu, '').trim()}
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
                        {t.rolesPage.title} <span style={{ fontStyle: 'italic' }}>{t.rolesPage.titleItalic}</span>
                      </h2>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
                        {t.rolesPage.subtitle}
                      </p>
                    </div>

                    {/* Stats mini */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {[
                        { label: t.rolesPage.totalUsers, value: listaUsuarios.length },
                        { label: t.rolesPage.admins, value: listaUsuarios.filter(u => u.rol === 'admin').length },
                        { label: t.rolesPage.teachers, value: listaUsuarios.filter(u => u.rol === 'maestro').length },
                        { label: t.rolesPage.students, value: listaUsuarios.filter(u => u.rol === 'alumno').length },
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
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>{t.rolesPage.formTitle}</div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                          {t.rolesPage.formSubtitle}
                        </div>
                      </div>
                    </div>

                    {/* Form body */}
                    <div style={{ padding: '20px 24px' }}>
                      <form onSubmit={asignarRolAdmin}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px auto', gap: '12px', alignItems: 'flex-end' }}>
                          <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                              {t.rolesPage.emailLabel}
                            </label>
                            <input
                              name="emailAsignar"
                              type="email"
                              className="roles-input"
                              placeholder={t.rolesPage.emailPlaceholder}
                              required
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                              {t.rolesPage.accessLevel}
                            </label>
                            <select name="rolAsignar" className="roles-input" required style={{ cursor: 'pointer' }}>
                              <option value="">{t.rolesPage.selectRole}</option>
                              <option value="maestro">{t.rolesPage.roleTeacher}</option>
                              <option value="admin">{t.rolesPage.roleAdmin}</option>
                              <option value="alumno">{t.rolesPage.roleStudent}</option>
                            </select>
                          </div>
                          <button type="submit" className="roles-submit-btn">
                            {t.rolesPage.assignBtn}
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
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>{t.rolesPage.tableTitle}</div>
                          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{listaUsuarios.length} {t.rolesPage.tableSubtitle}</div>
                        </div>
                      </div>

                      {/* Role filter pills */}
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {[
                          { rol: 'admin',   label: t.roles.admin,   color: '#dc2626', bg: '#fef2f2' },
                          { rol: 'maestro', label: t.roles.maestro, color: '#2563eb', bg: '#eff6ff' },
                          { rol: 'alumno',  label: t.roles.alumno,  color: '#16a34a', bg: '#f0fdf4' },
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
                            <th>{t.rolesPage.colUser}</th>
                            <th>{t.rolesPage.colAccess}</th>
                            <th>{t.rolesPage.colDate}</th>
                            <th style={{ textAlign: 'right' }}>{t.rolesPage.colActions}</th>
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
                                {t.rolesPage.loadingUsers}
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
                                          {esSelf && <span style={{ marginLeft: '6px', fontSize: '10px', color: '#94a3b8', fontWeight: '400' }}>{t.rolesPage.you}</span>}
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
                                        <option value="admin">{t.rolesPage.roleAdmin}</option>
                                        <option value="maestro">{t.rolesPage.roleTeacher}</option>
                                        <option value="alumno">{t.rolesPage.roleStudent}</option>
                                      </select>
                                      <span className={`roles-badge ${rolClass}`}>{traducirRol(user.rol)}</span>
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
                                      {t.rolesPage.revokeBtn}
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
                          {t.rolesPage.showing} {listaUsuarios.length} {t.rolesPage.users}
                        </span>
                        <span style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif' }}>
                          {t.rolesPage.changesApply}
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
          {t.classrooms.sectionLabel}
        </p>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
          {t.classrooms.title} <span style={{ fontStyle: 'italic' }}>{t.classrooms.titleItalic}</span>
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.42)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
          {t.classrooms.subtitle}
        </p>
      </div>

      {/* Mini stat cards */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {[
          { label: t.classrooms.totalRooms,    value: listaAulas.length,                                                warn: false },
          { label: t.classrooms.available,      value: listaAulas.filter(a => a.estado === 'Disponible').length,         warn: false },
          { label: t.classrooms.maintenance,    value: listaAulas.filter(a => a.estado === 'Mantenimiento').length,      warn: listaAulas.filter(a => a.estado === 'Mantenimiento').length > 0 },
          { label: t.classrooms.activeReservations, value: listaReservas.filter(r => r.estado === 'Confirmada').length,      warn: false },
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
            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>{t.classrooms.newRoomTitle}</div>
            <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
              {t.classrooms.newRoomSubtitle}
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
          {showFormAula ? t.classrooms.cancelBtn : t.classrooms.newRoomBtn}
        </button>
      </div>

      {showFormAula && (
        <div style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', background: '#ffffff' }}>
          <form onSubmit={guardarNuevaAula}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 150px 200px', gap: '14px', alignItems: 'flex-end', marginBottom: '14px' }}>
              <div>
                <label className="au-label">{t.classrooms.nameLabel}</label>
                <input
                  name="nombre"
                  className="au-input"
                  placeholder={t.classrooms.namePlaceholder}
                  required
                />
              </div>
              <div>
                <label className="au-label">{t.classrooms.capacityLabel}</label>
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
                <label className="au-label">{t.classrooms.equipmentLabel}</label>
                <select name="equipo" className="au-input" required style={{ cursor: 'pointer' }}>
                  <option value="">{t.classrooms.selectEquip}</option>
                  <option value="Gafas RV">{t.classrooms.vrGlasses}</option>
                  <option value="Cámaras">{t.classrooms.cameras}</option>
                  <option value="Laptops">{t.classrooms.laptops}</option>
                  <option value="Proyector">{t.classrooms.projector}</option>
                  <option value="Pantalla interactiva">{t.classrooms.interactiveScreen}</option>
                  <option value="Múltiple">{t.classrooms.multiple}</option>
                  <option value="Sin equipo">{t.classrooms.noEquip}</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" className="au-btn-ghost" onClick={() => setShowFormAula(false)}>{t.classrooms.cancel}</button>
              <button type="submit" className="au-btn-green">{t.classrooms.registerBtn}</button>
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
          <span style={{ fontWeight: '600', color: '#1e293b' }}>{listaAulas.length}</span> {t.classrooms.tableSummary}{' '}
          <span style={{ fontWeight: '600', color: '#059669' }}>
            {listaAulas.reduce((t, a) => t + (parseInt(a.capacidad) || 0), 0)}
          </span> {t.classrooms.people}
        </span>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { label: t.classrooms.available,   count: listaAulas.filter(a => a.estado === 'Disponible').length,    color: '#059669', bg: '#f0fdf4' },
            { label: t.classrooms.maintenance, count: listaAulas.filter(a => a.estado === 'Mantenimiento').length, color: '#b45309', bg: '#fffbeb' },
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
              <th>{t.classrooms.colRoom}</th>
              <th>{t.classrooms.colCapacity}</th>
              <th>{t.classrooms.colEquipment}</th>
              <th>{t.classrooms.colStatus}</th>
              <th>{t.classrooms.colActiveRes}</th>
              <th>{t.classrooms.colCreated}</th>
              <th style={{ textAlign: 'right' }}>{t.classrooms.colActions}</th>
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
                    <p style={{ margin: 0, fontSize: '13px' }}>{t.classrooms.noRooms}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>{t.classrooms.noRoomsHint}</p>
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
                            <span style={{ fontSize: '10.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.classrooms.people}</span>
                          </div>
                          <div className="au-bar-track">
                            <div className="au-bar-fill" style={{ width: `${pct}%`, background: barColor, animationDelay: `${0.3 + idx * 0.04}s` }} />
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Equipo */}
                    <td>
                      <span className="au-badge au-badge-slate">{aula.equipoDisponible ? traducirEquipo(aula.equipoDisponible) : '—'}</span>
                    </td>

                    {/* Estado */}
                    <td>
                      <span className={`au-badge ${enMantenimiento ? 'au-badge-amber' : 'au-badge-green'}`}>
                        {traducirEstado(aula.estado || 'Disponible')}
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
                        {t.classrooms.deleteBtn}
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
            {listaAulas.length} {t.classrooms.tableSummary} · {listaAulas.reduce((t, a) => t + (parseInt(a.capacidad) || 0), 0)} {t.classrooms.people}
          </span>
          <span style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {t.classrooms.footerNote}
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
                      {t.inventoryAdmin.sectionLabel}
                    </p>
                    <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
                      {t.inventoryAdmin.title} <span style={{ fontStyle: 'italic' }}>{t.inventoryAdmin.titleItalic}</span>
                    </h2>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.42)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
                      {t.inventoryAdmin.subtitle}
                    </p>
                  </div>

                  {/* Mini stat cards */}
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {[
                      {
                        label: t.inventoryAdmin.equipmentTypes,
                        value: listaEquipos.length,
                        warn: false,
                      },
                      {
                        label: t.inventoryAdmin.stockUnits,
                        value: listaEquipos.reduce((t, eq) => t + (eq.cantidad || 0), 0),
                        warn: false,
                      },
                      {
                        label: t.inventoryAdmin.noStock,
                        value: listaEquipos.filter(eq => (eq.cantidad || 0) === 0).length,
                        warn: listaEquipos.filter(eq => (eq.cantidad || 0) === 0).length > 0,
                      },
                      {
                        label: t.inventoryAdmin.activeLoans,
                        value: listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto).length,
                        warn: false,
                      },
                      {
                        label: t.inventoryAdmin.overdue,
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
                        <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryAdmin.addTitle}</div>
                        <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                          {t.inventoryAdmin.addSubtitle}
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
                      {showFormReserva ? t.inventoryAdmin.cancelAdd : t.inventoryAdmin.addBtn}
                    </button>
                  </div>

                  {showFormReserva && (
                    <div style={{ padding: '20px 24px', borderTop: '1px solid #f1f5f9', background: '#ffffff' }}>
                      <form onSubmit={guardarNuevoEquipo}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 120px 160px', gap: '14px', alignItems: 'flex-end', marginBottom: '14px' }}>
                          <div>
                            <label className="gi-label">{t.inventoryAdmin.nameLabel}</label>
                            <input name="nombre" className="gi-input" placeholder={t.inventoryAdmin.namePlaceholder} required />
                          </div>
                          <div>
                            <label className="gi-label">{t.inventoryAdmin.categoryLabel}</label>
                            <select name="categoria" className="gi-input" required style={{ cursor: 'pointer' }}>
                              <option value="">{t.inventoryAdmin.selectCategory}</option>
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
                            <label className="gi-label">{t.inventoryAdmin.qtyLabel}</label>
                            <input name="cantidad" type="number" min="1" className="gi-input" placeholder="1" defaultValue="1" />
                          </div>
                          <div>
                            <label className="gi-label">{t.inventoryAdmin.statusLabel}</label>
                            <select name="estado" className="gi-input" style={{ cursor: 'pointer' }}>
                              <option value="Disponible">{t.status.available}</option>
                              <option value="Mantenimiento">{t.status.maintenance}</option>
                              <option value="Inactivo">{t.status.inactive}</option>
                            </select>
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                          <button type="button" className="gi-btn-ghost" onClick={() => setShowFormReserva(false)}>{t.inventoryAdmin.cancel}</button>
                          <button type="submit" className="gi-btn-green">{t.inventoryAdmin.registerBtn}</button>
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
                            { key: 'gi-catalogo',    label: t.inventoryAdmin.tabCatalog },
                            { key: 'gi-solicitudes', label: `${t.inventoryAdmin.tabRequests}${pendientesMat > 0 ? ` · ${pendientesMat}` : ''}` },
                            { key: 'gi-prestamos',   label: `${t.inventoryAdmin.tabLoans}${devolucionesPend > 0 ? ` · ${devolucionesPend}` : ''}` },
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
                            {t.inventoryAdmin.sendReminders}
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
                              <span style={{ fontWeight: '600', color: '#1e293b' }}>{listaEquipos.length}</span> tipo(s) registrado(s) · <span style={{ fontWeight: '600', color: '#059669' }}>{listaEquipos.reduce((t, eq) => t + (eq.cantidad || 0), 0)}</span> {t.inventoryAdmin.units} en total
                            </span>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                              {[
                                { label: t.inventoryAdmin.withStock,      count: listaEquipos.filter(e => (e.cantidad || 0) > 0).length,                    color: '#059669', bg: '#f0fdf4' },
                                { label: t.inventoryAdmin.noStockLabel,      count: listaEquipos.filter(e => (e.cantidad || 0) === 0).length,                   color: '#dc2626', bg: '#fef2f2' },
                                { label: t.inventoryAdmin.maintenanceLabel,  count: listaEquipos.filter(e => e.estado === 'Mantenimiento').length,               color: '#b45309', bg: '#fffbeb' },
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
                                  <th>{t.inventoryAdmin.colEquipment}</th>
                                  <th>{t.inventoryAdmin.colCategory}</th>
                                  <th>{t.inventoryAdmin.colStock}</th>
                                  <th>{t.inventoryAdmin.colOnLoan}</th>
                                  <th>{t.inventoryAdmin.colStatus}</th>
                                  <th>{t.inventoryAdmin.colRegisteredBy}</th>
                                  <th style={{ textAlign: 'right' }}>{t.inventoryAdmin.colActions}</th>
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
                                        <p style={{ margin: 0, fontSize: '13px' }}>{t.inventoryAdmin.noEquipment}</p>
                                        <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>{t.inventoryAdmin.noEquipmentHint}</p>
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
                                            {sinStock ? t.status.noStock : enMantenimiento ? t.status.maintenance : t.status.available}
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
                              <span style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryAdmin.noPendingRequests}</span>
                            )}
                          </div>

                          <div style={{ overflowX: 'auto' }}>
                            <table className="gi-table">
                              <thead>
                                <tr>
                                  <th>{t.inventoryAdmin.colRequester}</th>
                                  <th>{t.inventoryAdmin.colMaterial}</th>
                                  <th>{t.inventoryAdmin.colQty}</th>
                                  <th>{t.inventoryAdmin.colReason}</th>
                                  <th>{t.inventoryAdmin.colDuration}</th>
                                  <th>{t.inventoryAdmin.colDueDate}</th>
                                  <th>{t.inventoryAdmin.colStatus}</th>
                                  <th style={{ textAlign: 'right' }}>Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {listaSolicitudesMaterial.length === 0 ? (
                                  <tr style={{ opacity: 1 }}>
                                    <td colSpan="8">
                                      <div className="gi-empty">
                                        <p style={{ margin: 0, fontSize: '13px' }}>{t.adminRequests.noMaterial}</p>
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
                                              {esAtrasado && <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#dc2626', marginBottom: '2px' }}>{t.messages.overdue}</div>}
                                              {new Date(sol.fechaDevolucionEsperada).toLocaleString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                          </td>

                                          {/* Estado */}
                                          <td>
                                            <span className={`gi-badge ${sol.estado === 'Aprobada' ? 'gi-badge-green' : sol.estado === 'Rechazada' ? 'gi-badge-red' : 'gi-badge-amber'}`}>
                                              {traducirEstado(sol.estado)}
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
                              { label: t.inventoryAdmin.onTime, count: devolucionesPend - atrasadosCount, color: '#059669', bg: '#f0fdf4' },
                              { label: t.inventoryAdmin.overdueLabel,  count: atrasadosCount,                    color: '#dc2626', bg: '#fef2f2' },
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
                                  <th>{t.inventoryAdmin.colLoanedTo}</th>
                                  <th>{t.inventoryAdmin.colMaterial}</th>
                                  <th>{t.inventoryAdmin.colQty}</th>
                                  <th>{t.inventoryAdmin.colReason}</th>
                                  <th>{t.inventoryAdmin.colDueTime}</th>
                                  <th>{t.inventoryAdmin.colDelivery}</th>
                                  <th style={{ textAlign: 'right' }}>{t.inventoryAdmin.colActions}</th>
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
                                        <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#94a3b8' }}>{t.inventoryAdmin.noActiveLoans}</p>
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
          {t.reservedRooms.sectionLabel}
        </p>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
          {t.reservedRooms.title} <span style={{ fontStyle: 'italic' }}>{t.reservedRooms.titleItalic}</span>
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.42)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
          {t.reservedRooms.subtitle}
        </p>
      </div>

      {/* Mini stats */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {[
          { label: t.reservedRooms.totalRooms,    value: listaAulas.length,                                                                    warn: false },
          { label: t.reservedRooms.withReservations,     value: listaAulas.filter(a => listaReservas.some(r => r.aulaId === a.id && r.estado === 'Confirmada')).length, warn: false },
          { label: t.reservedRooms.withoutReservations,     value: listaAulas.filter(a => !listaReservas.some(r => r.aulaId === a.id && r.estado === 'Confirmada')).length, warn: false },
          { label: t.reservedRooms.totalConfirmed,value: listaReservas.filter(r => r.estado === 'Confirmada').length,                          warn: false },
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
                {t.reservedRooms.viewByRoom}
              </button>
              <button
                className={`ar-tab ${vistaTab === 'ar-lista' ? 'ar-active' : ''}`}
                onClick={() => setTabSolicitudesAdmin('ar-lista')}
              >
                {t.reservedRooms.reservationList}
              </button>
            </div>

            {/* Right side: summary pills + reserve action */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              {[
                { label: t.reservedRooms.confirmed, count: listaReservas.filter(r => r.estado === 'Confirmada').length, color: '#059669', bg: '#f0fdf4' },
                { label: t.reservedRooms.cancelled,  count: listaReservas.filter(r => r.estado !== 'Confirmada').length, color: '#dc2626', bg: '#fef2f2' },
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
                {t.reservedRooms.newReservation}
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
                      <p style={{ margin: 0, fontSize: '13px' }}>{t.reservedRooms.noRooms}</p>
                      <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>{t.reservedRooms.noRoomsHint}</p>
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
                                Cap. {aula.capacidad} · {aula.equipoDisponible ? traducirEquipo(aula.equipoDisponible) : t.availableRooms.noSpecialEquip}
                              </div>
                            </div>
                          </div>
                          <span className={`ar-badge ${enMantenimiento ? 'ar-badge-amber' : tieneReservas ? 'ar-badge-blue' : 'ar-badge-green'}`}>
                            {enMantenimiento ? t.reservedRooms.maintenance : tieneReservas ? `${reservasAula.length} reserva${reservasAula.length !== 1 ? 's' : ''}` : t.reservedRooms.free}
                          </span>
                        </div>

                        {/* Occupancy bar */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                            <span className="ar-label">{t.reservedRooms.occupancyToday}</span>
                            <span style={{ fontSize: '11px', fontWeight: '600', color: pctColor, fontFamily: '"DM Sans", sans-serif' }}>
                              {reservasHoy} {t.reservedRooms.slotsOf} 11 {t.reservedRooms.slots}
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
                                {t.reservedRooms.availableToReserve}
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
                          {t.reservedRooms.viewSchedule}
                        </button>
                        {(usuarioActivo?.rol === 'maestro' || usuarioActivo?.rol === 'admin') && (
                          <button
                            className="ar-btn-green"
                            onClick={() => setVistaActual('aulasPúblicas')}
                            style={{ flex: 1, fontSize: '11px', padding: '6px' }}
                          >
                            {t.reservedRooms.reserve}
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
                  <span style={{ fontWeight: '600', color: '#1e293b' }}>{listaReservas.filter(r => r.estado === 'Confirmada').length}</span> {t.home.activeReservations}
                </span>
                {/* Role pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {[
                    { label: t.roles.admin,   count: listaReservas.filter(r => r.rol === 'admin'   && r.estado === 'Confirmada').length, color: '#dc2626', bg: '#fef2f2' },
                    { label: t.roles.maestro, count: listaReservas.filter(r => r.rol === 'maestro' && r.estado === 'Confirmada').length, color: '#2563eb', bg: '#eff6ff' },
                    { label: t.roles.alumno,  count: listaReservas.filter(r => r.rol === 'alumno'  && r.estado === 'Confirmada').length, color: '#16a34a', bg: '#f0fdf4' },
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
                      <th>{t.reservedRooms.colRoom}</th>
                      <th>{t.reservedRooms.colReservedBy}</th>
                      <th>{t.reservedRooms.colDate}</th>
                      <th>{t.reservedRooms.colSchedule}</th>
                      <th>{t.reservedRooms.colRole}</th>
                      <th>{t.reservedRooms.colDesc}</th>
                      <th>{t.reservedRooms.colStatus}</th>
                      {permisos.verReservas && <th style={{ textAlign: 'right' }}>{t.reservedRooms.colActions}</th>}
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
                            <p style={{ margin: 0, fontSize: '13px' }}>{t.allReservations.noReservations}</p>
                            <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>{t.allReservations.noReservationsHint || t.reservedRooms.noReservationsHint}</p>
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
                                    {t.reservedRooms.today}
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
                                {traducirRol(res.rol)}
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
                                {traducirEstado(res.estado || 'Confirmada')}
                              </span>
                            </td>

                            {/* Acciones */}
                            {permisos.verReservas && (
                              <td style={{ textAlign: 'right' }}>
                                {res.estado === 'Confirmada' && (
                                  <button className="ar-btn-danger" onClick={() => cancelarReserva(res.id)}>
                                    {t.reservedRooms.cancelBtn}
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
                    {t.reservedRooms.adminOnly}
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
                <div className="requests-wrapper" style={{animation: 'slideIn 0.5s ease'}}>
                  <div className="requests-header">
                    <div className="requests-header-content">
                      <h1>{t.myRequests.title}</h1>
                      <p>{t.myRequests.title}</p>
                    </div>
                  </div>
                  
                  <div className="requests-container">
                    <div className="request-section">
                      <div className="request-section-header">
                        <h2>{t.myRequests.pendingRooms}</h2>
                        <span className="section-badge">{listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).length}</span>
                      </div>
                      <div className="table-container requests-table">
                        <table>
                          <thead><tr><th>{t.myRequests.colRoom}</th><th>{t.myRequests.colDateTime}</th><th>{t.myRequests.colReason}</th><th>{t.myRequests.colStatus}</th><th>{t.myRequests.colActions}</th></tr></thead>
                          <tbody>
                            {listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).length === 0 ? (
                              <tr><td colSpan="5" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>{t.myRequests.noRoomRequests}</td></tr>
                            ) : (
                              listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).map(sol => (
                                <tr key={sol.id} className="request-row">
                                  <td><strong style={{color: '#0f172a'}}>{sol.aulaNombre || sol.tipo}</strong></td>
                                  <td style={{color: '#475569'}}>{sol.fechaSolicitada} ({sol.horaInicio})</td>
                                  <td style={{fontSize: '13px', color: '#64748b'}}>{sol.descripcion}</td>
                                  <td><span className={`request-badge badge ${sol.estado === 'Aprobada' ? 'badge-success' : sol.estado === 'Rechazada' ? 'badge-danger' : 'badge-warning'}`}>{traducirEstado(sol.estado)}</span></td>
                                  <td>
                                    {sol.estado === 'Pendiente' && (
                                      <button className="btn-action btn-withdraw" onClick={() => cancelarSolicitudPropia(sol.id, "solicitudes", `Aula ${sol.aulaNombre}`)}>{t.myRequests.withdrawBtn}</button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="request-section">
                      <div className="request-section-header">
                        <h2>{t.myRequests.materials}</h2>
                        <span className="section-badge">{listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).length}</span>
                      </div>
                      <div className="table-container requests-table">
                        <table>
                          <thead><tr><th>{t.myRequests.colMaterial}</th><th>{t.myRequests.colQty}</th><th>{t.myRequests.colDueDate}</th><th>{t.myRequests.colStatusReturn}</th><th>{t.myRequests.colActions}</th></tr></thead>
                          <tbody>
                            {listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).length === 0 ? (
                              <tr><td colSpan="5" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>{t.myRequests.noMaterialRequests}</td></tr>
                            ) : (
                              listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).map(sol => (
                                <tr key={sol.id} className="request-row">
                                  <td><strong style={{color: '#0f172a'}}>{sol.equipoNombre}</strong></td>
                                  <td style={{color: '#475569'}}>x{sol.cantidad}</td>
                                  <td style={{fontSize: '13px', color: '#64748b'}}>{new Date(sol.fechaDevolucionEsperada).toLocaleString('es-ES', {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</td>
                                  <td><span className={`request-badge badge ${sol.devuelto ? 'badge-success' : (sol.estado === 'Pendiente' ? 'badge-warning' : 'badge-danger')}`}>{sol.devuelto ? t.myRequests.returned : sol.estado}</span></td>
                                  <td>
                                    {sol.estado === 'Pendiente' && (
                                      <button className="btn-action btn-cancel" onClick={() => cancelarSolicitudPropia(sol.id, "solicitudes_material", `Material ${sol.equipoNombre}`)}>{t.myRequests.cancelBtn}</button>
                                    )}
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ============ VISTA RESERVAS ADMIN ============ */}
              {permisos.verReservas && vistaActual === 'reservasAdmin' && (
                <div className="seccion-blanca">
                  <div className="section-header">
                    <h2>{t.allReservations.title}</h2>
                    <span className="badge badge-info">
                      {listaReservas.filter(r => r.estado === 'Confirmada').length} {t.allReservations.active}
                    </span>
                  </div>

                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>{t.allReservations.colRoom}</th>
                          <th>{t.allReservations.colReservedBy}</th>
                          <th>{t.allReservations.colDate}</th>
                          <th>{t.allReservations.colSchedule}</th>
                          <th>{t.allReservations.colDesc}</th>
                          <th>{t.allReservations.colStatus}</th>
                          <th>{t.allReservations.colActions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listaReservas.length === 0 ? (
                          <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>{t.allReservations.noReservations}</td></tr>
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
                                  {traducirEstado(res.estado)}
                                </span>
                              </td>
                              <td>
                                <button 
                                  className="btn-small btn-danger" 
                                  onClick={() => cancelarReserva(res.id)}
                                >
                                  {t.allReservations.cancelBtn}
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
          {t.availableRooms.sectionLabel}
        </p>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
          {t.availableRooms.title} <span style={{ fontStyle: 'italic' }}>{t.availableRooms.titleItalic}</span>
        </h2>
        <p style={{ margin: 0, color: 'rgba(255,255,255,0.42)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
          {t.availableRooms.subtitle}
        </p>
      </div>

      {/* Right: date picker + mini stats */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
        {/* Date picker */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif' }}>
            {t.availableRooms.dateLabel}
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
            { label: t.availableRooms.totalRooms,   value: listaAulas.length },
            {
              label: t.availableRooms.availableToday,
              value: (() => {
                const hoy = fechaSeleccionada;
                return listaAulas.filter(a => {
                  const slots = generarHorarios(a.id, hoy);
                  return slots.some(s => !s.ocupado && !s.pasado && !s.conSolicitud);
                }).length;
              })(),
            },
            {
              label: t.availableRooms.freeSlots,
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
          {t.availableRooms.selectRoom}
        </p>

        {listaAulas.length === 0 ? (
          <div style={{ background: '#ffffff', border: '1px solid #e4e8ef', borderRadius: '6px', padding: '28px 16px', textAlign: 'center' }}>
            <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
              </svg>
            </div>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.availableRooms.noRooms}</p>
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
                    {t.availableRooms.cap} {aula.capacidad} · {aula.equipoDisponible || t.availableRooms.noEquip}
                  </span>
                  <span className={`ad-badge ${enMantenimiento ? 'ad-badge-amber' : libres > 0 ? 'ad-badge-green' : 'ad-badge-red'}`}>
                    {enMantenimiento ? t.availableRooms.maintenance : `${libres} ${libres !== 1 ? t.availableRooms.freeSlots : t.availableRooms.selectRoom}`}
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
            <p style={{ margin: '0 0 8px 0', fontSize: '9.5px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.availableRooms.legend}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {[
                { color: '#d1fae5', border: '#86efac', label: t.availableRooms.legendFree },
                { color: '#dbeafe', border: '#93c5fd', label: t.availableRooms.legendSelected },
                { color: '#fee2e2', border: '#fca5a5', label: t.availableRooms.legendOccupied },
                { color: '#fef3c7', border: '#fde68a', label: t.availableRooms.legendPending },
                { color: '#f1f5f9', border: '#e2e8f0', label: t.availableRooms.legendPast },
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
              {t.availableRooms.selectRoomPrompt}
            </p>
            <p style={{ margin: 0, fontSize: '12.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
              {t.availableRooms.selectRoomHint}
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
                    {t.availableRooms.people} {aulaActual.capacidad} · {aulaActual.equipoDisponible || t.availableRooms.noSpecialEquip}
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
                  {aulaActual.estado === 'Mantenimiento' ? t.availableRooms.statusMaintenance
                    : generarHorarios(aulaActual.id, fechaSeleccionada).some(h => !h.ocupado && !h.pasado) ? t.availableRooms.statusAvailable
                    : t.availableRooms.statusNoSlots}
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
                  {t.availableRooms.slotsHeader}
                </span>
                {horarioSeleccionado && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb', animation: 'adPulse 1.5s ease infinite' }} />
                    <span style={{ fontSize: '11.5px', fontWeight: '600', color: '#2563eb', fontFamily: '"DM Sans", sans-serif' }}>
                      {t.availableRooms.slotSelected.replace('{inicio}', horarioSeleccionado?.horaInicio).replace('{fin}', horarioSeleccionado?.horaFin)}
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
                        {t.availableRooms.pastDateWarning}
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
                                <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#b0bac9', fontFamily: '"DM Sans", sans-serif' }}>{t.availableRooms.past}</span>
                              ) : horario.conSolicitud ? (
                                <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#92400e', fontFamily: '"DM Sans", sans-serif' }}>{t.availableRooms.pending}</span>
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
                      <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.availableRooms.description}</p>
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
                    {usuarioActivo?.rol === 'alumno' ? 'Enviar Solicitud de Reserva' : 'Confirmar Reserva Directa'}
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
                    { label: t.availableRooms.room,    value: aulaActual.nombre },
                    { label: t.availableRooms.date,   value: new Date(fechaSeleccionada + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) },
                    { label: t.availableRooms.time, value: `${horarioSeleccionado.horaInicio} – ${horarioSeleccionado.horaFin}` },
                    { label: t.availableRooms.mode,    value: usuarioActivo.rol === 'alumno' ? t.availableRooms.modeRequest : t.availableRooms.modeDirectReserve },
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
                        {usuarioActivo.rol === 'alumno' ? t.availableRooms.reasonLabel : t.availableRooms.descLabel}
                      </label>
                      <textarea
                        name="descripcion"
                        className="ad-textarea"
                        placeholder={
                          usuarioActivo.rol === 'alumno'
                            ? t.availableRooms.reasonPlaceholder
                            : t.availableRooms.descPlaceholder
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
                          ? t.availableRooms.infoStudent
                          : t.availableRooms.infoTeacher
                        }
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="ad-btn-ghost"
                        onClick={() => { setHorarioSeleccionado(null); setShowSolicitudDesdeAula(false); }}
                      >
                        {t.availableRooms.cancelBtn}
                      </button>
                      <button
                        type="submit"
                        className={usuarioActivo.rol === 'alumno' ? 'ad-btn-submit-blue' : 'ad-btn-submit'}
                      >
                        {usuarioActivo.rol === 'alumno' ? t.availableRooms.submitRequest : t.availableRooms.submitReserve}
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
                        {rolNormalizado === 'admin' ? t.inventoryUser.sectionLabel : t.inventoryUser.sectionLabel}
                      </p>
                      <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.25' }}>
                        {t.inventoryUser.title} <span style={{ fontStyle: 'italic' }}>{t.inventoryUser.titleItalic}</span>
                      </h2>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontFamily: '"DM Sans", sans-serif' }}>
                        {rolNormalizado === 'admin'
                          ? t.inventoryUser.subtitle
                          : t.inventoryUser.subtitle}
                      </p>
                    </div>

                    {/* Mini stats */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {[
                        { label: t.inventoryUser.equipmentTypes, value: listaEquipos.length },
                        { label: t.inventoryUser.totalStock,  value: listaEquipos.reduce((t, eq) => t + (eq.cantidad || 0), 0) },
                        { label: t.inventoryUser.noStock,        value: listaEquipos.filter(eq => (eq.cantidad || 0) === 0).length },
                        { label: t.inventoryUser.activeLoans, value: listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto).length },
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
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.registerEquipment}</div>
                          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.registerEquipmentDesc}</div>
                        </div>
                        <button
                          onClick={() => setShowFormReserva(!showFormReserva)}
                          style={{ marginLeft: 'auto', padding: '6px 16px', background: showFormReserva ? '#f1f5f9' : '#0f172a', color: showFormReserva ? '#64748b' : '#fff', border: '1px solid #e4e8ef', borderRadius: '4px', fontSize: '12px', fontWeight: '600', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                          {showFormReserva ? t.inventoryUser.cancelBtn : t.inventoryUser.addEquipmentBtn}
                        </button>
                      </div>

                      {showFormReserva && (
                        <div style={{ padding: '20px 24px' }}>
                          <form onSubmit={guardarNuevoEquipo}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 140px 160px', gap: '12px', alignItems: 'flex-end' }}>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.equipmentName}</label>
                                <input name="nombre" className="inv-input" placeholder={t.inventoryUser.equipmentNamePlaceholder} required />
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.category}</label>
                                <select name="categoria" className="inv-input" required style={{ cursor: 'pointer' }}>
                                  <option value="">{t.inventoryUser.selectOption}</option>
                                  <option value="Gafas RV">Gafas RV</option>
                                  <option value="Cámara">Cámara</option>
                                  <option value="Laptop">Laptop</option>
                                  <option value="Micrófono">Micrófono</option>
                                  <option value="Otro">Otro</option>
                                </select>
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.quantity}</label>
                                <input name="cantidad" type="number" min="1" className="inv-input" placeholder="1" defaultValue="1" />
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.status}</label>
                                <select name="estado" className="inv-input" style={{ cursor: 'pointer' }}>
                                  <option value="Disponible">{t.inventoryUser.available}</option>
                                  <option value="Mantenimiento">{t.inventoryUser.maintenance}</option>
                                  <option value="Inactivo">{t.inventoryUser.inactive}</option>
                                </select>
                              </div>
                            </div>
                            <div style={{ marginTop: '14px', display: 'flex', justifyContent: 'flex-end' }}>
                              <button type="submit" className="inv-btn-green">{t.inventoryUser.registerBtn}</button>
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
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.requestLoan}</div>
                          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.requestLoanDesc}</div>
                        </div>
                        <button
                          onClick={() => setShowFormSolicitudMaterial(!showFormSolicitudMaterial)}
                          style={{ marginLeft: 'auto', padding: '6px 16px', background: showFormSolicitudMaterial ? '#f1f5f9' : '#059669', color: showFormSolicitudMaterial ? '#64748b' : '#fff', border: '1px solid ' + (showFormSolicitudMaterial ? '#e4e8ef' : '#059669'), borderRadius: '4px', fontSize: '12px', fontWeight: '600', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', transition: 'all 0.2s' }}
                        >
                          {showFormSolicitudMaterial ? t.inventoryUser.cancelBtn : t.inventoryUser.newRequestBtn}
                        </button>
                      </div>

                      {showFormSolicitudMaterial && (
                        <div style={{ padding: '20px 24px' }}>
                          <form onSubmit={crearSolicitudMaterial}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 180px', gap: '12px', marginBottom: '12px' }}>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.material}</label>
                                <select name="equipoId" className="inv-input" required style={{ cursor: 'pointer' }}>
                                  <option value="">{t.inventoryUser.selectMaterial}</option>
                                  {listaEquipos.filter(e => e.cantidad > 0).map(equipo => (
                                    <option key={equipo.id} value={equipo.id}>
                                      {equipo.nombre} — {equipo.cantidad} {equipo.cantidad === 1 ? t.inventoryUser.available : t.inventoryUser.availablePlural}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.quantity}</label>
                                <input name="cantidad" type="number" min="1" className="inv-input" placeholder="1" required />
                              </div>
                              <div>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.usageTime}</label>
                                <select name="tiempoUso" className="inv-input" required style={{ cursor: 'pointer' }}>
                                  <option value="">{t.inventoryUser.selectDuration}</option>
                                  <option value="1">1 hour</option>
                                  <option value="2">2 hours</option>
                                  <option value="24">1 full day</option>
                                  <option value="168">1 week</option>
                                  <option value="-24" style={{ color: '#dc2626' }}>TEST: Simulate Delay</option>
                                </select>
                              </div>
                            </div>
                            <div style={{ marginBottom: '14px' }}>
                              <label style={{ display: 'block', marginBottom: '6px', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.reasonLoan}</label>
                              <textarea name="motivo" className="inv-input" placeholder={t.inventoryUser.reasonLoanPlaceholder} required rows="2" style={{ resize: 'vertical', minHeight: '60px' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <button type="submit" className="inv-btn-green">{t.inventoryUser.submitRequestBtn}</button>
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
                          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.catalogTitle}</div>
                          <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{listaEquipos.length} {t.inventoryUser.equipmentRegistered}</div>
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
                              <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {estado === 'Disponible' ? t.inventoryUser.available : estado === 'Sin stock' ? t.inventoryUser.noStock : t.inventoryUser.maintenance}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                      <table className="inv-table">
                        <thead>
                          <tr>
                            <th>{t.inventoryUser.colEquipment}</th>
                            <th>{t.inventoryUser.colCategory}</th>
                            <th>{t.inventoryUser.colStock}</th>
                            <th>{t.inventoryUser.colAvailability}</th>
                            {rolNormalizado === 'admin' && <th>{t.inventoryUser.colRegisteredBy}</th>}
                            {rolNormalizado === 'admin' && <th style={{ textAlign: 'right' }}>{t.inventoryUser.colActions}</th>}
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
                                {t.inventoryUser.noEquipmentRegistered}
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
                                      {sinStock ? t.inventoryUser.noStock : enMantenimiento ? t.inventoryUser.maintenance : t.inventoryUser.available}
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
                                        {t.inventoryUser.deleteBtn}
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
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.myMaterialRequests}</div>
                            <div style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.historyBorrowedByYou}</div>
                          </div>
                        </div>
                        {/* Pending count badge */}
                        {listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo?.email && s.estado === 'Pendiente').length > 0 && (
                          <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '4px', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#b45309', display: 'inline-block' }} />
                            <span style={{ fontSize: '11px', fontWeight: '600', color: '#b45309', fontFamily: '"DM Sans", sans-serif' }}>
                              {listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo?.email && s.estado === 'Pendiente').length} {t.inventoryUser.pendingLabel}
                            </span>
                          </div>
                        )}
                      </div>

                      <div style={{ overflowX: 'auto' }}>
                        <table className="inv-table">
                          <thead>
                            <tr>
                              <th>{t.inventoryUser.colMaterial}</th>
                              <th>{t.inventoryUser.colQuantity}</th>
                              <th>{t.inventoryUser.colReason}</th>
                              <th>{t.inventoryUser.colExpectedReturn}</th>
                              <th>{t.inventoryUser.colStatus}</th>
                              <th>{t.inventoryUser.colReturned}</th>
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
                                        <div style={{ fontSize: '10px', fontWeight: '700', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{t.inventoryAdmin.overdueBadge}</div>
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
                                      {sol.devuelto ? t.inventoryUser.returned : sol.estado === 'Aprobada' ? t.inventoryUser.notReturned : '—'}
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
                    <h2>{t.adminRequests.title}</h2>
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
                      📚 {t.adminRequests.tabRooms} ({listaSolicitudes.filter(s => s.estado === 'Pendiente').length})
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
                      {t.adminRequests.tabMateriales} ({listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length})
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
                      {t.adminRequests.tabReturns} ({listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto).length})
                    </button>
                  </div>

                  {/* TAB: AULAS */}
                  {tabSolicitudesAdmin === 'aulas' && (
                    <div className="table-container">
                      <table>
                        <thead>
                          <tr>
                            <th>{t.adminRequests.colRequester}</th>
                            <th>{t.adminRequests.colType}</th>
                            <th>{t.adminRequests.colDesc}</th>
                            <th>{t.adminRequests.colStatus}</th>
                            <th>{t.adminRequests.colActions}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaSolicitudes.length === 0 ? (
                            <tr><td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>{t.adminRequests.noRequests}</td></tr>
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
                                    {traducirEstado(sol.estado)}
                                  </span>
                                </td>
                                <td>
                                  {sol.estado === 'Pendiente' && (
                                    <>
                                      <button 
                                        className="btn-small btn-success" 
                                        onClick={() => aprobarSolicitud(sol.id)}
                                      >
                                        {t.adminRequests.approveBtn}
                                      </button>
                                      <button 
                                        className="btn-small btn-danger" 
                                        onClick={() => rechazarSolicitud(sol.id)}
                                      >
                                        {t.adminRequests.rejectBtn}
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
                            <th>{t.adminRequests.colRequester}</th>
                            <th>{t.adminRequests.colMaterial}</th>
                            <th>{t.adminRequests.colReason}</th>
                            <th>{t.adminRequests.colTime}</th>
                            <th>{t.adminRequests.colDueDate}</th>
                            <th>{t.adminRequests.colStatus}</th>
                            <th>{t.adminRequests.colActions}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaSolicitudesMaterial.length === 0 ? (
                            <tr><td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>{t.adminRequests.noMaterial}</td></tr>
                          ) : (
                            listaSolicitudesMaterial.filter(s => s.estado !== 'Rechazada').map((sol) => {
                              const equipo = listaEquipos.find(e => e.id === sol.equipoId);
                              const ahora = new Date();
                              const vencimiento = new Date(sol.fechaDevolucionEsperada || sol.fechaVencimiento);
                              const esAtrasado = sol.estado === 'Aprobada' && !sol.devuelto && ahora > vencimiento;
                              
                              return (
                                <tr key={sol.id} className={sol.estado === 'Pendiente' ? 'row-highlight' : ''} style={{backgroundColor: esAtrasado ? '#fee2e2' : ''}}>
                                  <td><strong>{sol.solicitadoPor}</strong></td>
                                  <td>{equipo ? equipo.nombre : t.adminRequests.unknown} <b>(x{sol.cantidad})</b></td>
                                  <td style={{fontSize: '12px', maxWidth: '150px'}}>{sol.motivo || t.adminRequests.notSpecified}</td> {/* <--- NUEVA CELDA */}
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
                                      {traducirEstado(sol.estado)}
                                    </span>
                                  </td>
                                  <td style={{whiteSpace: 'nowrap'}}>
                                    {sol.estado === 'Pendiente' && (
                                      <>
                                        <button 
                                          className="btn-small btn-success" 
                                          onClick={() => aprobarSolicitudMaterial(sol.id)}
                                        >
                                          {t.adminRequests.approveBtn}
                                        </button>
                                        <button 
                                          className="btn-small btn-danger" 
                                          onClick={() => rechazarSolicitudMaterial(sol.id)}
                                        >
                                          {t.adminRequests.rejectBtn}
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
                          🔔 {t.adminRequests.sendDelayNotifications}
                        </button>
                      </div>

                      <table>
                        <thead>
                          <tr>
                            <th>{t.adminRequests.colUser}</th>
                            <th>{t.adminRequests.colMaterial}</th>
                            <th>{t.adminRequests.colQty}</th>
                            <th>{t.adminRequests.colDueStatus}</th>
                            <th>{t.adminRequests.colDelivery}</th>
                            <th>{t.adminRequests.colActions}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaSolicitudesMaterial.filter(s => s.estado === 'Aprobada' && !s.devuelto).length === 0 ? (
                            <tr><td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>{t.adminRequests.allReturned}</td></tr>
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
                                      {esAtrasado ? `⚠️ ${t.adminRequests.delayedStatus} ${horasAtrasado}h` : '✅ ' + t.adminRequests.onTimeStatus} <br/>
                                      {new Date(sol.fechaDevolucionEsperada).toLocaleString('es-ES', {year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}
                                    </td>
                                    <td>
                                      <span className={`badge ${esAtrasado ? 'badge-danger' : 'badge-success'}`}>
                                        {esAtrasado ? t.adminRequests.delayedBadge : t.adminRequests.onTimeBadge}
                                      </span>
                                    </td>
                                    <td>
                                      <button 
                                        className="btn-small btn-success" 
                                        onClick={() => registrarDevolucionMaterial(sol.id)}
                                        style={{backgroundColor: '#16a34a'}}
                                      >
                                        ✅ {t.adminRequests.confirmReturnBtn}
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
                  {t.messages.viewNotSelected}
                </div>
              )}
            </div>
          </main>
        </div>
      );
    }

    // ====================================================
    // VISTA LOGIN - SPLIT SCREEN DESIGN
    // ====================================================
    return (
      <div className="split-screen-login">
        {/* LEFT SIDE - EDUCATIONAL VISUAL */}
        <div className="login-left-panel">
          <div className="educational-visual">
            <div className="visual-bg-gradient"></div>
            
            <div className="edu-content">
              <div className="edu-header">
                <div className="lr-brand">
                 <img src={logo} alt="EdTech+" style={{ maxWidth: '280px', height: 'auto', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))' }} />
              </div>
              <h1 style={{ display: 'none' }}>EdTech+</h1>
              <p className="brand-tagline" style={{ color: '#cbd5e1', marginTop: '15px', fontSize: '15px' }}>{t.login.subtitle}</p>
            </div>
              
              <div className="edu-features">
                <div className="feature-item">
                  <div className="feature-icon icon-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <path d="M3 9h18M9 3v18"/>
                    </svg>
                  </div>
                  <h3>{t.login.feature1Title}</h3>
                  <p>{t.login.feature1Desc}</p>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon icon-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L15.09 8.26H22L17.27 12.74L19.36 19.5L12 16.42L4.64 19.5L6.73 12.74L2 8.26H8.91L12 2Z"/>
                    </svg>
                  </div>
                  <h3>{t.login.feature2Title}</h3>
                  <p>{t.login.feature2Desc}</p>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon icon-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  </div>
                  <h3>{t.login.feature3Title}</h3>
                  <p>{t.login.feature3Desc}</p>
                </div>
              </div>
              
              <div className="decorative-shapes">
                <div className="shape shape-float-1"></div>
                <div className="shape shape-float-2"></div>
                <div className="shape shape-float-3"></div>
                <div className="shape shape-float-4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="login-right-panel">
          {/* LANGUAGE SWITCHER */}
          <button
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            title={t.topbar?.langLabel || 'Language'}
            className="lang-switcher-login"
          >
            <span style={{ fontSize: '16px' }}>{lang === 'es' ? '🇺🇸' : '🇲🇽'}</span>
            <span>{lang === 'es' ? 'EN' : 'ES'}</span>
          </button>

          <div className="login-form-container">
            <div className="form-header">
              <h2>{esRegistro ? t.login.createAccount : 'Bienvenido a EdTech+'}</h2>
              <p className="form-subtitle">{esRegistro ? t.login.subtitle : 'Accede a tu cuenta de estudiante'}</p>
            </div>

            {mensaje && <div className={`alert-form alert-${tipoMensaje}`}>{mensaje}</div>}

            <form onSubmit={esRegistro ? manejarRegistro : manejarIngreso} className="modern-login-form">
              <div className="form-group-split">
                <label>{t.login.email}</label>
                <div className="input-field">
                  <input 
                    type="email" 
                    placeholder="usuario@institucion.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                    className="input-split"
                  />
                  <span className="field-icon">@</span>
                </div>
              </div>
              
              <div className="form-group-split">
                <label>{t.login.password}</label>
                <div className="input-field">
                  <input 
                    type="password" 
                    placeholder="Tu contraseña segura"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                    className="input-split"
                  />
                  <span className="field-icon">•</span>
                </div>
              </div>
              
              <button className="btn-submit-split" type="submit" disabled={cargando}>
                {cargando ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>

            <div className="form-divider">
              <span>o</span>
            </div>

            <div className="form-toggle-split">
              <p>{esRegistro ? t.login.alreadyHaveAccount : t.login.noAccount}</p>
              <button 
                onClick={() => {
                  setEsRegistro(!esRegistro);
                  setMensaje('');
                }} 
                className="btn-toggle-split"
              >
                {esRegistro ? t.login.switchToLogin : t.login.switchToRegister}
              </button>
            </div>

            <div className="form-footer-split">
              <p>EdTech+ © 2025 - Tecnología Inteligente para la Educación</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default App;
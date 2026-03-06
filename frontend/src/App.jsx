import logo from './logo.png';
import translations from './translations';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth';
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
  const [autenticando, setAutenticando] = useState(true); // <--- NUEVO: Esperar a Firebase Auth
  const [lang, setLang] = useState('es');
  const t = translations[lang];

  // --- ESTADOS DEL ACCESS GATE (PUERTA DE SEGURIDAD) ---
  const [accessGatePassed, setAccessGatePassed] = useState(() => {
    return sessionStorage.getItem('edtech_access_gate') === 'granted';
  });
  const [accessCode, setAccessCode] = useState('');
  const [accessGateError, setAccessGateError] = useState('');
  const [accessGateLoading, setAccessGateLoading] = useState(false);
  const [accessGateShake, setAccessGateShake] = useState(false);

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
  const [listaBaneados, setListaBaneados] = useState([]); // <--- NUEVO: Lista de correos revocados

  // --- ESTADOS DE FORMULARIO ---
  const [showFormAula, setShowFormAula] = useState(false);
  const [showFormReserva, setShowFormReserva] = useState(false);
  const [showFormSolicitud, setShowFormSolicitud] = useState(false);
  const [showFormSolicitudMaterial, setShowFormSolicitudMaterial] = useState(false);
  const [aulaSeleccionada, setAulaSeleccionada] = useState(null);
  const [showModalNotificaciones, setShowModalNotificaciones] = useState(false);
  const [tabSolicitudesAdmin, setTabSolicitudesAdmin] = useState('aulas');
  const [filtroInventario, setFiltroInventario] = useState('Todo');
  const [listaReservasMaterial, setListaReservasMaterial] = useState([]);
  const [showFormReservaMaterial, setShowFormReservaMaterial] = useState(false);
  const [fechaMaterialSeleccionada, setFechaMaterialSeleccionada] = useState(obtenerFechaLocal);

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

  // --- NUEVO EFECTO: PERSISTENCIA DE SESIÓN ---
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (userFirebase) => {
      if (userFirebase) {
        try {
          // Buscamos su rol en Firestore
          const docSnap = await getDoc(doc(db, "usuarios", userFirebase.uid));
          if (docSnap.exists()) {
            setUsuarioActivo({
              uid: userFirebase.uid,
              email: userFirebase.email,
              rol: docSnap.data().rol.toLowerCase()
            });
          } else {
            // Si por alguna razón no tiene perfil en Firestore, lo tratamos como alumno
            setUsuarioActivo({
              uid: userFirebase.uid,
              email: userFirebase.email,
              rol: 'alumno'
            });
          }
        } catch (error) {
          console.error("Error recuperando sesión:", error);
        }
      } else {
        setUsuarioActivo(null);
      }
      setAutenticando(false);
    });

    return () => unsubscribeAuth();
  }, []);

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

      // --- NUEVO: Cargar lista de baneados (Escudo) ---
      const qBaneados = query(collection(db, "baneados"), orderBy("email"));
      const unsub8 = onSnapshot(qBaneados, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListaBaneados(docs);
      });

      // --- NUEVO: Cargar reservas de material ---
      const qReservasMaterial = query(collection(db, "reservas_material"), orderBy("fechaReserva", "desc"));
      const unsub9 = onSnapshot(qReservasMaterial, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setListaReservasMaterial(docs);
      });

      return () => {
        unsub1();
        unsub2();
        unsub3();
        unsub4();
        unsub5();
        unsub6();
        unsub7();
        unsub8();
        unsub9();
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

      // --- ESCUDO: VERIFICAR BLACKLIST ---
      const banDoc = await getDoc(doc(db, "baneados", correoNormalizado));
      if (banDoc.exists()) {
        mostrarMensaje('Acceso Denegado: Este correo ha sido bloqueado por el administrador.', 'error');
        setCargando(false);
        return;
      }

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
      const correoNormalizado = email.toLowerCase();

      // --- ESCUDO: VERIFICAR BLACKLIST ---
      const banDoc = await getDoc(doc(db, "baneados", correoNormalizado));
      if (banDoc.exists()) {
        mostrarMensaje('Acceso Denegado: Este correo ha sido bloqueado por el administrador.', 'error');
        setCargando(false);
        return;
      }

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
        // 1. Borramos el perfil del usuario activo
        await deleteDoc(doc(db, "usuarios", userId));
        // 2. Borramos de la lista de roles asignados
        await deleteDoc(doc(db, "roles_asignados", correo));

        // 3. EL ESCUDO: Lo añadimos a la lista de "baneados" para que no pueda volver a entrar
        await setDoc(doc(db, "baneados", correo.toLowerCase()), {
          email: correo.toLowerCase(),
          fechaBaneo: new Date().toISOString(),
          motivo: 'Acceso revocado por administrador'
        });

        mostrarMensaje(`${t.messages.accessRevoked} ${correo} (Cuenta bloqueada permanentemente)`, 'success');
      } catch (error) {
        mostrarMensaje(t.messages.errorRevoke + error.message, 'error');
      }
    }
  };

  // --- FUNCIÓN: RESTAURAR ACCESO A UN CORREO ---
  const restaurarAcceso = async (correo) => {
    if (confirm(`${lang === 'es' ? '¿Restaurar acceso para' : 'Restore access for'} ${correo}?`)) {
      try {
        await deleteDoc(doc(db, "baneados", correo.toLowerCase()));
        mostrarMensaje(`${lang === 'es' ? 'Acceso restaurado para' : 'Access restored for'} ${correo}`, 'success');
      } catch (error) {
        mostrarMensaje('Error: ' + error.message, 'error');
      }
    }
  };



  // --- FUNCIÓN: LOGIN SOCIAL (GOOGLE / MICROSOFT) ---
  const manejarLoginSocial = async (providerName) => {
    setCargando(true);
    setMensaje(t.login.loggingIn);
    setTipoMensaje('info');

    let provider;
    if (providerName === 'google') {
      provider = new GoogleAuthProvider();
    }

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const correoNormalizado = user.email.toLowerCase();

      // --- ESCUDO: VERIFICAR BLACKLIST ---
      const banDoc = await getDoc(doc(db, "baneados", correoNormalizado));
      if (banDoc.exists()) {
        await signOut(auth); // Lo sacamos de Auth inmediatamente
        mostrarMensaje('Acceso Denegado: Tu acceso institucional ha sido revocado.', 'error');
        setCargando(false);
        return;
      }

      // Si el correo no está verificado por el proveedor (raro en Google/MS), lo rechazamos
      if (!user.emailVerified) {
        throw new Error('Email not verified by provider');
      }

      // 1. Buscamos si el usuario ya existe en nuestra colección de usuarios
      const docSnap = await getDoc(doc(db, "usuarios", user.uid));

      if (docSnap.exists()) {
        // Usuario existente: Cargamos su rol
        setUsuarioActivo({ uid: user.uid, email: user.email, rol: docSnap.data().rol.toLowerCase() });
      } else {
        // Usuario nuevo: Buscamos si tiene un rol pre-asignado por su correo
        const rolDoc = await getDoc(doc(db, "roles_asignados", correoNormalizado));
        let rolFinal = 'alumno'; // Default

        if (rolDoc.exists()) {
          rolFinal = rolDoc.data().rol;
        }

        // Creamos su perfil en Firestore
        await setDoc(doc(db, "usuarios", user.uid), {
          correo: correoNormalizado,
          rol: rolFinal,
          fechaRegistro: new Date().toISOString(),
          metodoAuth: providerName
        });

        setUsuarioActivo({ uid: user.uid, email: user.email, rol: rolFinal });
      }

      setEmail('');
      setPassword('');
      setMensaje('');
      setCargando(false);
    } catch (error) {
      console.error("Error social login:", error);
      setCargando(false);

      if (error.message === 'Email not verified by provider') {
        mostrarMensaje('Tu cuenta de Google/Microsoft no está verificada. Usa una real.', 'error');
      } else if (error.code === 'auth/popup-closed-by-user') {
        setMensaje(''); // Simplemente se cerró
      } else {
        mostrarMensaje('Error al iniciar sesión con el proveedor externo.', 'error');
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

  // --- FUNCIÓN: RECUPERAR CONTRASEÑA ---
  const manejarRecuperarPassword = async () => {
    if (!email.trim()) {
      mostrarMensaje(
        lang === 'es'
          ? 'Escribe tu correo institucional arriba para recuperar tu contraseña'
          : 'Enter your institutional email above to recover your password',
        'warning'
      );
      return;
    }

    setCargando(true);
    try {
      // Paso 1: Verificar que el correo exista en nuestra base de datos
      const correoNormalizado = email.trim().toLowerCase();
      const q = query(
        collection(db, 'usuarios'),
        where('correo', '==', correoNormalizado)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        mostrarMensaje(
          lang === 'es'
            ? 'No se encontró una cuenta registrada con ese correo. Verifica que sea correcto.'
            : 'No account found with that email. Please verify it is correct.',
          'error'
        );
        setCargando(false);
        return;
      }

      // Paso 2: El correo existe, enviar el enlace de recuperación
      await sendPasswordResetEmail(auth, correoNormalizado);
      mostrarMensaje(
        lang === 'es'
          ? '📧 ¡Correo enviado! Revisa tu bandeja de entrada y también la carpeta de spam/correo no deseado.'
          : '📧 Email sent! Check your inbox and also your spam/junk folder.',
        'success'
      );
    } catch (error) {
      console.error('Error en recuperación de contraseña:', error);
      if (error.code === 'auth/user-not-found') {
        mostrarMensaje(
          lang === 'es'
            ? 'No se encontró una cuenta con ese correo'
            : 'No account found with that email',
          'error'
        );
      } else if (error.code === 'auth/invalid-email') {
        mostrarMensaje(
          lang === 'es'
            ? 'Correo electrónico inválido'
            : 'Invalid email address',
          'error'
        );
      } else if (error.code === 'auth/too-many-requests') {
        mostrarMensaje(
          lang === 'es'
            ? 'Demasiados intentos. Espera unos minutos e intenta de nuevo.'
            : 'Too many attempts. Wait a few minutes and try again.',
          'error'
        );
      } else {
        mostrarMensaje(
          lang === 'es'
            ? 'Error al enviar el correo de recuperación. Intenta de nuevo.'
            : 'Error sending recovery email. Try again.',
          'error'
        );
      }
    }
    setCargando(false);
  };

  // --- FUNCIÓN: VALIDAR ACCESS GATE ---
  const validarAccessGate = async (e) => {
    e.preventDefault();
    if (!accessCode.trim()) {
      setAccessGateError(lang === 'es' ? 'Ingresa el código de acceso institucional' : 'Enter the institutional access code');
      setAccessGateShake(true);
      setTimeout(() => setAccessGateShake(false), 600);
      return;
    }

    setAccessGateLoading(true);
    setAccessGateError('');

    try {
      // Buscar el código en la colección access_gates de Firestore
      const codigoNormalizado = accessCode.trim();
      const q = query(
        collection(db, 'access_gates'),
        where('codigoAcceso', '==', codigoNormalizado),
        where('activo', '==', true)
      );
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setAccessGateError(lang === 'es' ? 'Código de acceso inválido o expirado' : 'Invalid or expired access code');
        setAccessGateShake(true);
        setTimeout(() => setAccessGateShake(false), 600);
        setAccessGateLoading(false);
        return;
      }

      // Verificar validez (expiración y usos)
      const gateDoc = snapshot.docs[0];
      const gateData = gateDoc.data();

      // Verificar expiración
      if (gateData.fechaExpiracion && new Date(gateData.fechaExpiracion) < new Date()) {
        setAccessGateError(lang === 'es' ? 'Este código de acceso ha expirado' : 'This access code has expired');
        setAccessGateShake(true);
        setTimeout(() => setAccessGateShake(false), 600);
        setAccessGateLoading(false);
        return;
      }

      // Verificar límite de usos
      if (gateData.maxUsos > 0 && gateData.usosActuales >= gateData.maxUsos) {
        setAccessGateError(lang === 'es' ? 'Este código ha alcanzado su límite de usos' : 'This code has reached its usage limit');
        setAccessGateShake(true);
        setTimeout(() => setAccessGateShake(false), 600);
        setAccessGateLoading(false);
        return;
      }

      // Incrementar uso
      await updateDoc(doc(db, 'access_gates', gateDoc.id), {
        usosActuales: (gateData.usosActuales || 0) + 1
      });

      // Acceso concedido
      sessionStorage.setItem('edtech_access_gate', 'granted');
      setAccessGatePassed(true);
      setAccessCode('');
      setAccessGateError('');
      setAccessGateLoading(false);
    } catch (error) {
      console.error('Error validando Access Gate:', error);
      setAccessGateError(lang === 'es' ? 'Error de conexión. Intenta de nuevo.' : 'Connection error. Try again.');
      setAccessGateLoading(false);
    }
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

  const registrarDevolucionReservaMaterial = async (id) => {
    try {
      const reserva = listaReservasMaterial.find(s => s.id === id);
      const equipo = listaEquipos.find(e => e.id === reserva.equipoId);

      // Sumar stock de regreso (en reservas la cantidad suele ser 1 por defecto, o la especificada)
      const cant = reserva.cantidad || 1;
      const nuevaCantidad = (equipo.cantidad || 0) + cant;

      await updateDoc(doc(db, "equipos", equipo.id), {
        cantidad: nuevaCantidad,
        estado: 'Disponible'
      });

      await updateDoc(doc(db, "reservas_material", id), {
        devuelto: true,
        fechaDevolucionReal: new Date().toISOString()
      });

      await crearNotificacion(
        reserva.reservadoPor,
        'successfulReturn',
        `${t.messages.adminConfirmedMsg || 'The admin confirmed the return of'} ${cant}x ${equipo.nombre}.`
      );

      mostrarMensaje(t.messages.returnRegistered, 'success');
    } catch (error) {
      console.error('Error en devolución de reserva material:', error);
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
        estado: 'Pendiente', // Cambiado a Pendiente por petición del usuario
        fechaReserva: new Date().toISOString()
      });

      // Notificar al admin sobre la nueva solicitud
      await crearNotificacion('admin', `Nueva solicitud de aula: ${aulaSeleccionada?.nombre} por ${usuarioActivo.email.split('@')[0]} para el ${fecha}`);

      e.target.reset();
      mostrarMensaje(lang === 'es' ? 'Solicitud enviada para aprobación' : 'Request sent for approval', 'success');
      setShowFormReserva(false);
    } catch (error) {
      mostrarMensaje(t.messages.errorReservation, 'error');
    }
  };

  const aprobarReserva = async (id) => {
    try {
      const reserva = listaReservas.find(r => r.id === id);
      await updateDoc(doc(db, "reservas", id), { estado: 'Confirmada' });
      await crearNotificacion(reserva.reservadoPor, `Tu solicitud del aula ${reserva.aulaNombre} ha sido aprobada.`);
      mostrarMensaje(lang === 'es' ? 'Reserva aprobada' : 'Reservation approved', 'success');
    } catch (error) {
      console.error(error);
      mostrarMensaje('Error al aprobar / Error approving', 'error');
    }
  };

  const rechazarReserva = async (id) => {
    try {
      const reserva = listaReservas.find(r => r.id === id);
      await updateDoc(doc(db, "reservas", id), { estado: 'Rechazada' });
      await crearNotificacion(reserva.reservadoPor, `Tu solicitud del aula ${reserva.aulaNombre} ha sido rechazada.`);
      mostrarMensaje(lang === 'es' ? 'Reserva rechazada' : 'Reservation rejected', 'info');
    } catch (error) {
      console.error(error);
      mostrarMensaje('Error al rechazar / Error rejecting', 'error');
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
        eq.id === equipoId ? { ...eq, cantidad: nuevaCantidad } : eq
      ));
      mostrarMensaje(t.messages.qtyUpdated, 'success');
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
      mostrarMensaje(t.messages.errorUpdateQty, 'error');
    }
  };

  const actualizarEstadoEquipo = async (equipoId, nuevoEstado) => {
    try {
      await updateDoc(doc(db, "equipos", equipoId), {
        estado: nuevoEstado
      });
      setListaEquipos(listaEquipos.map(eq =>
        eq.id === equipoId ? { ...eq, estado: nuevoEstado } : eq
      ));
      mostrarMensaje(
        lang === 'es'
          ? `Estado actualizado a "${nuevoEstado}"`
          : `Status updated to "${nuevoEstado}"`,
        'success'
      );
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      mostrarMensaje(
        lang === 'es' ? 'Error al actualizar estado' : 'Error updating status',
        'error'
      );
    }
  };

  // --- FUNCIONES DE RESERVA DE MATERIALES ---
  const guardarReservaMaterial = async (e) => {
    e.preventDefault();
    const equipoId = e.target.equipoId.value;
    const fechaInicio = e.target.fechaInicio.value;
    const fechaFin = e.target.fechaFin.value;
    const motivo = e.target.motivo.value;

    if (!equipoId || !fechaInicio || !fechaFin) {
      mostrarMensaje(
        lang === 'es' ? 'Completa todos los campos obligatorios' : 'Complete all required fields',
        'warning'
      );
      return;
    }

    if (new Date(fechaFin) < new Date(fechaInicio)) {
      mostrarMensaje(
        lang === 'es' ? 'La fecha de devolución debe ser posterior a la fecha de préstamo' : 'Return date must be after loan date',
        'warning'
      );
      return;
    }

    const equipo = listaEquipos.find(eq => eq.id === equipoId);
    if (!equipo) return;

    if ((Number(equipo.cantidad) || 0) <= 0) {
      mostrarMensaje(
        lang === 'es' ? 'Este equipo no tiene stock disponible' : 'This equipment has no available stock',
        'error'
      );
      return;
    }

    try {
      // Crear solicitud de reserva (pendiente de aprobación)
      await addDoc(collection(db, "reservas_material"), {
        equipoId,
        equipoNombre: equipo.nombre,
        equipoCategoria: equipo.categoria || 'General',
        fechaInicio,
        fechaFin,
        motivo,
        reservadoPor: usuarioActivo.email,
        nombreReservador: usuarioActivo.email.split('@')[0],
        rol: usuarioActivo.rol,
        estado: 'Pendiente',
        fechaReserva: new Date().toISOString()
      });

      e.target.reset();
      mostrarMensaje(
        lang === 'es'
          ? `📋 Solicitud enviada al administrador para "${equipo.nombre}" (${fechaInicio} → ${fechaFin})`
          : `📋 Request sent to admin for "${equipo.nombre}" (${fechaInicio} → ${fechaFin})`,
        'success'
      );
      setShowFormReservaMaterial(false);

      await crearNotificacion(
        'admin',
        'newReservation',
        `${usuarioActivo.email.split('@')[0]} ${lang === 'es' ? 'solicita reservar' : 'requests to reserve'} ${equipo.nombre} (${fechaInicio} → ${fechaFin}).`
      );
    } catch (error) {
      console.error('Error al solicitar reserva:', error);
      mostrarMensaje(
        lang === 'es' ? 'Error al enviar solicitud' : 'Error sending request',
        'error'
      );
    }
  };

  const aprobarReservaMaterial = async (id) => {
    try {
      const reserva = listaReservasMaterial.find(r => r.id === id);
      if (!reserva) return;

      // Descontar stock al aprobar
      const equipo = listaEquipos.find(e => e.id === reserva.equipoId);
      if (equipo && (Number(equipo.cantidad) || 0) > 0) {
        await updateDoc(doc(db, "equipos", reserva.equipoId), {
          cantidad: (Number(equipo.cantidad) || 0) - 1
        });
      }

      await updateDoc(doc(db, "reservas_material", id), {
        estado: 'Aprobada'
      });

      await crearNotificacion(
        reserva.reservadoPor,
        'requestApproved',
        `${lang === 'es' ? 'Tu reserva de' : 'Your reservation for'} ${reserva.equipoNombre} (${reserva.fechaInicio} → ${reserva.fechaFin}) ${lang === 'es' ? 'fue aprobada ✅' : 'was approved ✅'}`
      );

      mostrarMensaje(lang === 'es' ? 'Reserva aprobada' : 'Reservation approved', 'success');
    } catch (error) {
      console.error('Error al aprobar:', error);
      mostrarMensaje(lang === 'es' ? 'Error al aprobar' : 'Error approving', 'error');
    }
  };

  const rechazarReservaMaterial = async (id) => {
    try {
      const reserva = listaReservasMaterial.find(r => r.id === id);
      await updateDoc(doc(db, "reservas_material", id), {
        estado: 'Rechazada'
      });

      if (reserva) {
        await crearNotificacion(
          reserva.reservadoPor,
          'requestRejected',
          `${lang === 'es' ? 'Tu reserva de' : 'Your reservation for'} ${reserva.equipoNombre} (${reserva.fechaInicio} → ${reserva.fechaFin}) ${lang === 'es' ? 'fue rechazada ❌' : 'was rejected ❌'}`
        );
      }

      mostrarMensaje(lang === 'es' ? 'Reserva rechazada' : 'Reservation rejected', 'success');
    } catch (error) {
      console.error('Error al rechazar:', error);
      mostrarMensaje(lang === 'es' ? 'Error al rechazar' : 'Error rejecting', 'error');
    }
  };

  const cancelarReservaMaterial = async (id) => {
    if (!window.confirm(lang === 'es' ? '¿Cancelar esta reserva de material?' : 'Cancel this material reservation?')) return;
    try {
      const reserva = listaReservasMaterial.find(r => r.id === id);
      await deleteDoc(doc(db, "reservas_material", id));

      // Restaurar stock solo si la reserva estaba aprobada
      if (reserva && reserva.estado === 'Aprobada') {
        const equipo = listaEquipos.find(e => e.id === reserva.equipoId);
        if (equipo) {
          await updateDoc(doc(db, "equipos", reserva.equipoId), {
            cantidad: (Number(equipo.cantidad) || 0) + 1
          });
        }
      }

      mostrarMensaje(
        lang === 'es' ? 'Reserva de material cancelada' : 'Material reservation cancelled',
        'success'
      );
    } catch (error) {
      console.error('Error al cancelar reserva:', error);
      mostrarMensaje(
        lang === 'es' ? 'Error al cancelar la reserva' : 'Error cancelling reservation',
        'error'
      );
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
          `${t.messages.attentionMsg || 'Attention'}: ${t.messages.notReturnedMsg || "You haven't returned the material"} "${material.equipoNombre}" (x${material.cantidad}). ${t.messages.loanExpiredMsg || 'Your loan expired on'} ${new Date(material.fechaDevolucionEsperada).toLocaleString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}.`
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

        setListaReservas([{ ...nuevaReserva, id: reservaRef.id }, ...listaReservas]);
        setListaSolicitudes(listaSolicitudes.map(s =>
          s.id === id ? { ...s, estado: 'Aprobada' } : s
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
        s.id === id ? { ...s, estado: 'Rechazada' } : se
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
            <div className="sidebar-brand">
              <img src={logo} alt="EdTech+ Logo" className="sidebar-logo" />
            </div>
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
            {permisos.verSolicitudes && (<button className={`menu-btn ${vistaActual === 'solicitudesAdmin' ? 'activo' : ''}`} onClick={() => setVistaActual('solicitudesAdmin')}>{t.nav.requests} ({listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaReservas.filter(r => r.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length + listaReservasMaterial.filter(r => r.estado === 'Pendiente').length})</button>)}
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
                className="lang-switcher-dashboard"
              >
                <span className="lang-flag-circle">{lang === 'es' ? '🇺🇸' : '🇲🇽'}</span>
              </button>
              <span>{t.topbar.systemName}</span>
              {usuarioActivo && (
                <div style={{ position: 'relative' }}>
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
                      <div style={{ padding: '15px 20px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', color: '#1e293b' }}>{t.notifications.title}</h3>
                        <button onClick={() => setShowModalNotificaciones(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
                      </div>

                      <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
                        {misNotificaciones.length === 0 ? (
                          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                            <p style={{ fontSize: '30px', margin: '0 0 10px 0' }}>📭</p>
                            <p style={{ margin: 0 }}>{t.notifications.empty}</p>
                          </div>
                        ) : (
                          misNotificaciones.map(notif => (
                            <div key={notif.id} style={{
                              padding: '15px 20px',
                              borderBottom: '1px solid #f1f5f9',
                              backgroundColor: notif.leida ? '#ffffff' : '#f0f9ff',
                              transition: 'background-color 0.3s'
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                  <h4 style={{ margin: '0 0 5px 0', fontSize: '14px', color: notif.leida ? '#475569' : '#0369a1', fontWeight: notif.leida ? 'normal' : 'bold' }}>
                                    {notif.titulo}
                                  </h4>
                                  <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>
                                    {notif.descripcion}
                                  </p>
                                  <small style={{ color: '#94a3b8', fontSize: '11px' }}>
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
              <div style={{ fontSize: '40px' }}>⚠️</div>
              <div>
                <h3 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#7f1d1d', fontWeight: 'bold' }}>{t.overdueAlert.title}</h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>{t.overdueAlert.subtitle}</p>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
                  {materialesAtrasadosMios.map(mat => (
                    <li key={mat.id}>
                      <strong>{mat.equipoNombre} (x{mat.cantidad})</strong> - Debió entregarse el {new Date(mat.fechaDevolucionEsperada).toLocaleString('es-ES', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {mensaje && (
            <div className={`alert alert-${tipoMensaje}`} style={{ margin: '20px 30px 0 30px' }}>
              {mensaje}
            </div>
          )}

          <div className="content-area">
            {/* ============ VISTA INICIO (DASHBOARD) ============ */}
            {vistaActual === 'inicio' && (
              <div className="edtech-inicio-wrapper">

                {/* ── HEADER BANNER EDTECH+ ── */}
                <div className="edtech-inicio-banner">
                  {/* Mesh gradient overlays like login */}
                  <div className="edtech-inicio-banner-mesh" />
                  {/* Grid texture like login */}
                  <div className="edtech-inicio-banner-grid" />
                  {/* Floating orbs like login */}
                  <div className="edtech-inicio-orb edtech-inicio-orb-1" />
                  <div className="edtech-inicio-orb edtech-inicio-orb-2" />
                  {/* Divider line at bottom */}
                  <div className="edtech-inicio-banner-divider" />

                  <div className="edtech-inicio-banner-content">
                    <div className="edtech-inicio-banner-left">
                      <div className="edtech-inicio-badge">
                        <span className="edtech-inicio-badge-dot" />
                        {t.home.panelLabel}
                      </div>
                      <h2 className="edtech-inicio-title">
                        {t.home.welcome} <em>{usuarioActivo.email.split('@')[0]}</em>
                      </h2>
                      <p className="edtech-inicio-subtitle">
                        {t.home.systemName}
                      </p>
                    </div>

                    <div className="edtech-inicio-banner-right">
                      <span className="edtech-inicio-level-label">
                        {t.home.accessLevel}
                      </span>
                      <div className="edtech-inicio-role-box">
                        <span>{t.roles[usuarioActivo.rol]}</span>
                      </div>
                      <div className="edtech-inicio-online">
                        <span className="edtech-inicio-online-dot" />
                        <span>{t.home.systemOnline}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── STATS GRID ── */}
                <div className="edtech-inicio-stats-grid">

                  {/* Aulas */}
                  <div className="edtech-inicio-stat-card edtech-stat-delay-1" style={{ '--accent': '#60a5fa' }}>
                    <div className="edtech-inicio-stat-accent" />
                    <div className="edtech-inicio-stat-body">
                      <p className="edtech-inicio-stat-label">{t.home.registeredRooms}</p>
                      <div className="edtech-inicio-stat-row">
                        <span className="edtech-inicio-stat-number">{listaAulas.length}</span>
                        <div className="edtech-inicio-stat-icon" style={{ background: 'rgba(96,165,250,0.08)', borderColor: 'rgba(96,165,250,0.15)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                          </svg>
                        </div>
                      </div>
                      <div className="edtech-inicio-stat-bar">
                        <div className="edtech-inicio-stat-bar-fill" style={{ background: '#60a5fa', width: `${Math.min((listaAulas.length / 10) * 100, 100)}%` }} />
                      </div>
                      <p className="edtech-inicio-stat-sub">{t.home.spaces}</p>
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="edtech-inicio-stat-card edtech-stat-delay-2" style={{ '--accent': '#34d399' }}>
                    <div className="edtech-inicio-stat-accent" />
                    <div className="edtech-inicio-stat-body">
                      <p className="edtech-inicio-stat-label">{t.home.stockUnits}</p>
                      <div className="edtech-inicio-stat-row">
                        <span className="edtech-inicio-stat-number">{listaEquipos.reduce((tot, eq) => tot + (eq.cantidad || 0), 0)}</span>
                        <div className="edtech-inicio-stat-icon" style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.15)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          </svg>
                        </div>
                      </div>
                      <div className="edtech-inicio-stat-bar">
                        <div className="edtech-inicio-stat-bar-fill" style={{ background: '#34d399', width: '72%' }} />
                      </div>
                      <p className="edtech-inicio-stat-sub">{t.home.equipmentMaterials}</p>
                    </div>
                  </div>

                  {/* Reservas */}
                  <div className="edtech-inicio-stat-card edtech-stat-delay-3" style={{ '--accent': '#fbbf24' }}>
                    <div className="edtech-inicio-stat-accent" />
                    <div className="edtech-inicio-stat-body">
                      <p className="edtech-inicio-stat-label">{t.home.confirmedReservations}</p>
                      <div className="edtech-inicio-stat-row">
                        <span className="edtech-inicio-stat-number">{listaReservas.filter(r => r.estado === 'Confirmada' && r.fecha >= obtenerFechaLocal()).length}</span>
                        <div className="edtech-inicio-stat-icon" style={{ background: 'rgba(251,191,36,0.10)', borderColor: 'rgba(251,191,36,0.20)' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                      </div>
                      <div className="edtech-inicio-stat-bar">
                        <div className="edtech-inicio-stat-bar-fill" style={{ background: '#fbbf24', width: `${Math.min((listaReservas.filter(r => r.estado === 'Confirmada' && r.fecha >= obtenerFechaLocal()).length / 20) * 100, 100)}%` }} />
                      </div>
                      <p className="edtech-inicio-stat-sub">{t.home.activeReservations}</p>
                    </div>
                  </div>

                  {/* 4ta tarjeta dinámica */}
                  {(rolNormalizado === 'admin' || rolNormalizado === 'maestro') ? (
                    <div className="edtech-inicio-stat-card edtech-stat-delay-4" style={{ '--accent': '#f87171' }}>
                      <div className="edtech-inicio-stat-accent" />
                      <div className="edtech-inicio-stat-body">
                        <p className="edtech-inicio-stat-label">{t.home.pendingRequests}</p>
                        <div className="edtech-inicio-stat-row">
                          <span className="edtech-inicio-stat-number" style={{ color: listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length > 0 ? '#f87171' : undefined }}>
                            {listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length}
                          </span>
                          <div className="edtech-inicio-stat-icon" style={{ background: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.15)' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                          </div>
                        </div>
                        <div className="edtech-inicio-stat-bar">
                          <div className="edtech-inicio-stat-bar-fill" style={{ background: '#f87171', width: `${Math.min(((listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length) / 10) * 100, 100)}%` }} />
                        </div>
                        <p className="edtech-inicio-stat-sub">{t.home.needAttention}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="edtech-inicio-stat-card edtech-stat-delay-4" style={{ '--accent': '#a78bfa' }}>
                      <div className="edtech-inicio-stat-accent" />
                      <div className="edtech-inicio-stat-body">
                        <p className="edtech-inicio-stat-label">{t.home.myRequestsStat}</p>
                        <div className="edtech-inicio-stat-row">
                          <span className="edtech-inicio-stat-number">
                            {listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).length + listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).length}
                          </span>
                          <div className="edtech-inicio-stat-icon" style={{ background: 'rgba(167,139,250,0.08)', borderColor: 'rgba(167,139,250,0.15)' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                            </svg>
                          </div>
                        </div>
                        <div className="edtech-inicio-stat-bar">
                          <div className="edtech-inicio-stat-bar-fill" style={{ background: '#a78bfa', width: '45%' }} />
                        </div>
                        <p className="edtech-inicio-stat-sub">{t.home.sentRequests}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── BOTTOM ROW ── */}
                <div className="edtech-inicio-bottom-grid">

                  {/* Acciones rápidas */}
                  <div className="edtech-inicio-panel">
                    <p className="edtech-inicio-panel-label">{t.home.quickAccess}</p>
                    <div className="edtech-inicio-actions">

                      <button className="edtech-inicio-action-btn" onClick={() => setVistaActual('aulasPúblicas')}>
                        <div className="edtech-inicio-action-icon" style={{ background: 'rgba(96,165,250,0.08)', borderColor: 'rgba(96,165,250,0.15)' }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                        </div>
                        <div className="edtech-inicio-action-text">
                          <div className="edtech-inicio-action-title">{t.home.checkAvailability}</div>
                          <div className="edtech-inicio-action-sub">{t.home.checkAvailabilitySub}</div>
                        </div>
                        <svg className="edtech-inicio-action-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>

                      {permisos.solicitarEquipos && (
                        <button className="edtech-inicio-action-btn" onClick={() => setVistaActual('inventario')}>
                          <div className="edtech-inicio-action-icon" style={{ background: 'rgba(52,211,153,0.08)', borderColor: 'rgba(52,211,153,0.15)' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                          </div>
                          <div className="edtech-inicio-action-text">
                            <div className="edtech-inicio-action-title">{t.home.requestMaterial}</div>
                            <div className="edtech-inicio-action-sub">{t.home.requestMaterialSub}</div>
                          </div>
                          <svg className="edtech-inicio-action-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      )}

                      {permisos.verSolicitudes && (
                        <button className="edtech-inicio-action-btn" onClick={() => setVistaActual('solicitudesAdmin')}>
                          <div className="edtech-inicio-action-icon" style={{ background: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.15)' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                          </div>
                          <div className="edtech-inicio-action-text">
                            <div className="edtech-inicio-action-title">{t.home.manageRequests}</div>
                            <div className="edtech-inicio-action-sub">
                              {listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length} {t.home.pending}
                            </div>
                          </div>
                          <svg className="edtech-inicio-action-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      )}

                      {rolNormalizado === 'admin' && (
                        <button className="edtech-inicio-action-btn" onClick={() => setVistaActual('roles')}>
                          <div className="edtech-inicio-action-icon" style={{ background: 'rgba(167,139,250,0.08)', borderColor: 'rgba(167,139,250,0.15)' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                          </div>
                          <div className="edtech-inicio-action-text">
                            <div className="edtech-inicio-action-title">{t.home.userManagement}</div>
                            <div className="edtech-inicio-action-sub">{listaUsuarios.length} {t.home.registered}</div>
                          </div>
                          <svg className="edtech-inicio-action-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      )}

                      {permisos.verReservas && (
                        <button className="edtech-inicio-action-btn" onClick={() => setVistaActual('reservasAdmin')}>
                          <div className="edtech-inicio-action-icon" style={{ background: 'rgba(251,191,36,0.10)', borderColor: 'rgba(251,191,36,0.20)' }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                            </svg>
                          </div>
                          <div className="edtech-inicio-action-text">
                            <div className="edtech-inicio-action-title">{t.home.allReservations}</div>
                            <div className="edtech-inicio-action-sub">{t.home.fullHistory}</div>
                          </div>
                          <svg className="edtech-inicio-action-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Actividad reciente */}
                  <div className="edtech-inicio-panel">
                    <div className="edtech-inicio-panel-header">
                      <p className="edtech-inicio-panel-label" style={{ margin: 0 }}>{t.home.recentActivity}</p>
                      {misNotificaciones.filter(n => !n.leida).length > 0 && (
                        <span className="edtech-inicio-unread-count">
                          {misNotificaciones.filter(n => !n.leida).length} {t.notifications.unread}
                        </span>
                      )}
                    </div>

                    <div className="edtech-inicio-activity-list">
                      {misNotificaciones.length === 0 ? (
                        <div className="edtech-inicio-activity-empty">
                          <div className="edtech-inicio-activity-empty-icon">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                          </div>
                          <p>{t.home.noActivity}</p>
                        </div>
                      ) : (
                        misNotificaciones.slice(0, 7).map((notif, idx) => (
                          <div className="edtech-inicio-activity-row" key={notif.id} style={{ animationDelay: `${0.5 + idx * 0.07}s` }}>
                            <div className={notif.leida ? 'edtech-inicio-dot-read' : 'edtech-inicio-dot-unread'} />
                            <div className="edtech-inicio-activity-content">
                              <div className={`edtech-inicio-activity-title ${notif.leida ? 'read' : ''}`}>
                                {(traducirNotificacion(notif.titulo, notif.claveNotificacion) || '').replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{1F300}-\u{1F9FF}]/gu, '').trim()}
                              </div>
                              <div className="edtech-inicio-activity-desc">
                                {(notif.descripcion || '').replace(/[\u{1F000}-\u{1FFFF}]|[\u{2600}-\u{27BF}]|[\u{1F300}-\u{1F9FF}]/gu, '').trim()}
                              </div>
                            </div>
                            <div className="edtech-inicio-activity-time">
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
              <div className="edtech-roles-wrapper">

                {/* ── PAGE HEADER / BANNER ── */}
                <div className="edtech-roles-banner">
                  <div className="edtech-roles-banner-mesh" />
                  <div className="edtech-roles-banner-grid" />
                  <div className="edtech-roles-orb edtech-roles-orb-1" />
                  <div className="edtech-roles-orb edtech-roles-orb-2" />
                  <div className="edtech-roles-banner-divider" />

                  <div className="edtech-roles-banner-content">
                    <div className="edtech-roles-banner-left">
                      <div className="edtech-roles-badge-pill">
                        <span className="edtech-roles-badge-dot" />
                        {lang === 'es' ? 'Administración del Sistema' : 'System Administration'}
                      </div>
                      <h2 className="edtech-roles-title">
                        {t.rolesPage.title} <em>{t.rolesPage.titleItalic}</em>
                      </h2>
                      <p className="edtech-roles-subtitle">{t.rolesPage.subtitle}</p>
                    </div>

                    {/* Mini stat counters */}
                    <div className="edtech-roles-mini-stats">
                      {[
                        { label: t.rolesPage.totalUsers, value: listaUsuarios.length },
                        { label: t.rolesPage.admins, value: listaUsuarios.filter(u => u.rol === 'admin').length },
                        { label: t.rolesPage.teachers, value: listaUsuarios.filter(u => u.rol === 'maestro').length },
                        { label: t.rolesPage.students, value: listaUsuarios.filter(u => u.rol === 'alumno').length },
                      ].map((stat, i) => (
                        <div className="edtech-roles-mini-stat" key={i}>
                          <div className="edtech-roles-mini-stat-val">{stat.value}</div>
                          <div className="edtech-roles-mini-stat-label">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── ASSIGN ROLE FORM CARD ── */}
                <div className="edtech-roles-card edtech-roles-card-delay-1">
                  <div className="edtech-roles-card-header">
                    <div className="edtech-roles-card-header-left">
                      <div className="edtech-roles-card-icon" style={{ background: 'rgba(0,48,135,0.08)', borderColor: 'rgba(0,48,135,0.15)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                          <line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" />
                        </svg>
                      </div>
                      <div>
                        <div className="edtech-roles-card-title">{t.rolesPage.formTitle}</div>
                        <div className="edtech-roles-card-sub">{t.rolesPage.formSubtitle}</div>
                      </div>
                    </div>
                  </div>

                  <div className="edtech-roles-card-body">
                    <form onSubmit={asignarRolAdmin}>
                      <div className="edtech-roles-form-grid">
                        <div>
                          <label className="edtech-roles-label">{t.rolesPage.emailLabel}</label>
                          <input
                            name="emailAsignar"
                            type="email"
                            className="edtech-roles-input"
                            placeholder={t.rolesPage.emailPlaceholder}
                            required
                          />
                        </div>
                        <div>
                          <label className="edtech-roles-label">{t.rolesPage.accessLevel}</label>
                          <select name="rolAsignar" className="edtech-roles-input" required style={{ cursor: 'pointer' }}>
                            <option value="">{t.rolesPage.selectRole}</option>
                            <option value="maestro">{t.rolesPage.roleTeacher}</option>
                            <option value="admin">{t.rolesPage.roleAdmin}</option>
                            <option value="alumno">{t.rolesPage.roleStudent}</option>
                          </select>
                        </div>
                        <button type="submit" className="edtech-roles-submit-btn">
                          {t.rolesPage.assignBtn}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {/* ── USERS TABLE CARD ── */}
                <div className="edtech-roles-card edtech-roles-card-delay-2">
                  {/* Table header */}
                  <div className="edtech-roles-card-header" style={{ justifyContent: 'space-between' }}>
                    <div className="edtech-roles-card-header-left">
                      <div className="edtech-roles-card-icon" style={{ background: 'rgba(124,58,237,0.08)', borderColor: 'rgba(124,58,237,0.15)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      <div>
                        <div className="edtech-roles-card-title">{t.rolesPage.tableTitle}</div>
                        <div className="edtech-roles-card-sub">{listaUsuarios.length} {t.rolesPage.tableSubtitle}</div>
                      </div>
                    </div>

                    {/* Role filter pills */}
                    <div className="edtech-roles-filter-pills">
                      {[
                        { rol: 'admin', label: t.roles.admin, color: '#dc2626', bg: 'rgba(220,38,38,0.08)' },
                        { rol: 'maestro', label: t.roles.maestro, color: '#003087', bg: 'rgba(0,48,135,0.06)' },
                        { rol: 'alumno', label: t.roles.alumno, color: '#00A33B', bg: 'rgba(0,163,59,0.06)' },
                      ].map(({ rol, label, color, bg }) => {
                        const count = listaUsuarios.filter(u => u.rol === rol).length;
                        return (
                          <div className="edtech-roles-filter-pill" key={rol} style={{ background: bg, borderColor: `${color}22` }}>
                            <span className="edtech-roles-filter-dot" style={{ background: color }} />
                            <span style={{ color }}>{count} {label}{count !== 1 ? 's' : ''}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Table */}
                  <div className="edtech-roles-table-wrap">
                    <table className="edtech-roles-table">
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
                          <tr className="edtech-roles-no-anim">
                            <td colSpan="4">
                              <div className="edtech-roles-empty">
                                <div className="edtech-roles-empty-icon">
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                                  </svg>
                                </div>
                                <p>{t.rolesPage.loadingUsers}</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          listaUsuarios.map((user, idx) => {
                            const esSelf = user.correo === usuarioActivo.email;
                            const avatarBg = user.rol === 'admin' ? 'rgba(220,38,38,0.08)' : user.rol === 'maestro' ? 'rgba(0,48,135,0.06)' : 'rgba(0,163,59,0.06)';
                            const avatarBorder = user.rol === 'admin' ? 'rgba(220,38,38,0.2)' : user.rol === 'maestro' ? 'rgba(0,48,135,0.15)' : 'rgba(0,163,59,0.15)';
                            const avatarColor = user.rol === 'admin' ? '#dc2626' : user.rol === 'maestro' ? '#003087' : '#00A33B';
                            const badgeClass = user.rol === 'admin' ? 'edtech-roles-rbadge-admin' : user.rol === 'maestro' ? 'edtech-roles-rbadge-maestro' : 'edtech-roles-rbadge-alumno';
                            return (
                              <tr key={user.id} style={{ animationDelay: `${0.25 + idx * 0.04}s` }}>
                                {/* Usuario */}
                                <td>
                                  <div className="edtech-roles-user-cell">
                                    <div className="edtech-roles-avatar" style={{ background: avatarBg, borderColor: avatarBorder }}>
                                      <span style={{ color: avatarColor }}>{user.correo.charAt(0)}</span>
                                    </div>
                                    <div>
                                      <div className="edtech-roles-user-name">
                                        {user.correo.split('@')[0]}
                                        {esSelf && <span className="edtech-roles-you-tag">{t.rolesPage.you}</span>}
                                      </div>
                                      <div className="edtech-roles-user-email">{user.correo}</div>
                                    </div>
                                  </div>
                                </td>

                                {/* Rol */}
                                <td>
                                  <div className="edtech-roles-access-cell">
                                    <select
                                      value={user.rol}
                                      onChange={(e) => actualizarRolUsuario(user.id, e.target.value, user.correo)}
                                      className="edtech-roles-select"
                                      disabled={esSelf}
                                    >
                                      <option value="admin">{t.rolesPage.roleAdmin}</option>
                                      <option value="maestro">{t.rolesPage.roleTeacher}</option>
                                      <option value="alumno">{t.rolesPage.roleStudent}</option>
                                    </select>
                                    <span className={`edtech-roles-rbadge ${badgeClass}`}>{traducirRol(user.rol)}</span>
                                  </div>
                                </td>

                                {/* Fecha */}
                                <td className="edtech-roles-date-cell">
                                  {user.fechaRegistro
                                    ? new Date(user.fechaRegistro).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
                                    : <span className="edtech-roles-no-date">—</span>}
                                </td>

                                {/* Acciones */}
                                <td style={{ textAlign: 'right' }}>
                                  <button
                                    className="edtech-roles-revoke-btn"
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
                    <div className="edtech-roles-table-footer">
                      <span className="edtech-roles-footer-count">
                        {t.rolesPage.showing} {listaUsuarios.length} {t.rolesPage.users}
                      </span>
                      <span className="edtech-roles-footer-note">
                        {t.rolesPage.changesApply}
                      </span>
                    </div>
                  )}
                </div>

                {/* ── SECCIÓN: CUENTAS CON ACCESO RESTRINGIDO (BLACKLIST) ── */}
                {listaBaneados.length > 0 && (
                  <div className="edtech-roles-card edtech-roles-card-delay-3" style={{ borderLeft: '4px solid #dc2626' }}>
                    <div className="edtech-roles-card-header">
                      <div className="edtech-roles-card-header-left">
                        <div className="edtech-roles-card-icon" style={{ background: 'rgba(220,38,38,0.08)', borderColor: 'rgba(220,38,38,0.15)' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                        <div>
                          <div className="edtech-roles-card-title">{lang === 'es' ? 'Cuentas con Acceso Restringido' : 'Restricted Access Accounts'}</div>
                          <div className="edtech-roles-card-sub">{listaBaneados.length} {lang === 'es' ? 'correos bloqueados por el sistema' : 'emails blocked by the system'}</div>
                        </div>
                      </div>
                    </div>

                    <div className="edtech-roles-table-wrap">
                      <table className="edtech-roles-table">
                        <thead>
                          <tr>
                            <th>{t.rolesPage.colUser}</th>
                            <th>{lang === 'es' ? 'Motivo' : 'Reason'}</th>
                            <th>{lang === 'es' ? 'Fecha de Restricción' : 'Restriction Date'}</th>
                            <th style={{ textAlign: 'right' }}>{t.rolesPage.colActions}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {listaBaneados.map((ban, idx) => (
                            <tr key={ban.id} className="edtech-roles-banned-row">
                              <td>
                                <div className="edtech-roles-user-cell">
                                  <div className="edtech-roles-avatar" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
                                    <span style={{ color: '#dc2626' }}>!</span>
                                  </div>
                                  <div className="edtech-roles-user-email" style={{ fontWeight: '600', color: '#475569' }}>{ban.email}</div>
                                </div>
                              </td>
                              <td>
                                <span style={{ fontSize: '12px', color: '#dc2626', fontWeight: '500' }}>
                                  {ban.motivo || 'Revocación manual'}
                                </span>
                              </td>
                              <td className="edtech-roles-date-cell">
                                {ban.fechaBaneo ? new Date(ban.fechaBaneo).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                              </td>
                              <td style={{ textAlign: 'right' }}>
                                <button
                                  className="btn-small btn-success"
                                  onClick={() => restaurarAcceso(ban.email)}
                                  style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '50px' }}
                                >
                                  {lang === 'es' ? 'Restaurar Acceso' : 'Restore Access'}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}


            {
              permisos.gestionAulas && vistaActual === 'aulas' && (
                <div className="edtech-aulas-wrapper">

                  {/* ── PAGE HEADER / BANNER ── */}
                  <div className="edtech-aulas-banner">
                    <div className="edtech-aulas-banner-mesh" />
                    <div className="edtech-aulas-banner-grid" />
                    <div className="edtech-aulas-orb edtech-aulas-orb-1" />
                    <div className="edtech-aulas-orb edtech-aulas-orb-2" />
                    <div className="edtech-aulas-banner-divider" />

                    <div className="edtech-aulas-banner-content">
                      <div className="edtech-aulas-banner-left">
                        <div className="edtech-aulas-badge-pill">
                          <span className="edtech-aulas-badge-dot" />
                          {t.classrooms.sectionLabel}
                        </div>
                        <h2 className="edtech-aulas-title">
                          {t.classrooms.title} <em>{t.classrooms.titleItalic}</em>
                        </h2>
                        <p className="edtech-aulas-subtitle">{t.classrooms.subtitle}</p>
                      </div>

                      {/* Mini stat counters */}
                      <div className="edtech-aulas-mini-stats">
                        {[
                          { label: t.classrooms.totalRooms, value: listaAulas.length, warn: false },
                          { label: t.classrooms.available, value: listaAulas.filter(a => a.estado === 'Disponible').length, warn: false },
                          { label: t.classrooms.maintenance, value: listaAulas.filter(a => a.estado === 'Mantenimiento').length, warn: listaAulas.filter(a => a.estado === 'Mantenimiento').length > 0 },
                          { label: t.classrooms.activeReservations, value: listaReservas.filter(r => r.estado === 'Confirmada').length, warn: false },
                        ].map((stat, i) => (
                          <div className={`edtech-aulas-mini-stat ${stat.warn ? 'edtech-aulas-mini-stat-warn' : ''}`} key={i}>
                            <div className={`edtech-aulas-mini-stat-val ${stat.warn ? 'warn' : ''}`}>{stat.value}</div>
                            <div className={`edtech-aulas-mini-stat-label ${stat.warn ? 'warn' : ''}`}>{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ── FORM CARD: NUEVA AULA ── */}
                  <div className="edtech-aulas-card edtech-aulas-card-delay-1">
                    <div className="edtech-aulas-card-header" style={{ justifyContent: 'space-between' }}>
                      <div className="edtech-aulas-card-header-left">
                        <div className="edtech-aulas-card-icon" style={{ background: 'rgba(0,163,59,0.08)', borderColor: 'rgba(0,163,59,0.15)' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A33B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                        <div>
                          <div className="edtech-aulas-card-title">{t.classrooms.newRoomTitle}</div>
                          <div className="edtech-aulas-card-sub">{t.classrooms.newRoomSubtitle}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowFormAula(!showFormAula)}
                        className={`edtech-aulas-toggle-btn ${showFormAula ? 'active' : ''}`}
                      >
                        {showFormAula ? t.classrooms.cancelBtn : t.classrooms.newRoomBtn}
                      </button>
                    </div>

                    {showFormAula && (
                      <div className="edtech-aulas-form-body">
                        <form onSubmit={guardarNuevaAula}>
                          <div className="edtech-aulas-form-grid">
                            <div>
                              <label className="edtech-aulas-label">{t.classrooms.nameLabel}</label>
                              <input
                                name="nombre"
                                className="edtech-aulas-input"
                                placeholder={t.classrooms.namePlaceholder}
                                required
                              />
                            </div>
                            <div>
                              <label className="edtech-aulas-label">{t.classrooms.capacityLabel}</label>
                              <input
                                name="capacidad"
                                type="number"
                                min="1"
                                className="edtech-aulas-input"
                                placeholder="30"
                                required
                              />
                            </div>
                            <div>
                              <label className="edtech-aulas-label">{t.classrooms.equipmentLabel}</label>
                              <select name="equipo" className="edtech-aulas-input" required style={{ cursor: 'pointer' }}>
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
                          <div className="edtech-aulas-form-actions">
                            <button type="button" className="edtech-aulas-btn-ghost" onClick={() => setShowFormAula(false)}>{t.classrooms.cancel}</button>
                            <button type="submit" className="edtech-aulas-btn-green">{t.classrooms.registerBtn}</button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>

                  {/* ── TABLE CARD: LISTADO DE AULAS ── */}
                  <div className="edtech-aulas-card edtech-aulas-card-delay-2">

                    {/* Sub-header with status pills */}
                    <div className="edtech-aulas-subheader">
                      <span className="edtech-aulas-subheader-text">
                        <span className="edtech-aulas-subheader-bold">{listaAulas.length}</span> {t.classrooms.tableSummary}{' '}
                        <span className="edtech-aulas-subheader-green">
                          {listaAulas.reduce((t, a) => t + (parseInt(a.capacidad) || 0), 0)}
                        </span> {t.classrooms.people}
                      </span>
                      <div className="edtech-aulas-filter-pills">
                        {[
                          { label: t.classrooms.available, count: listaAulas.filter(a => a.estado === 'Disponible').length, color: '#00A33B', bg: 'rgba(0,163,59,0.06)' },
                          { label: t.classrooms.maintenance, count: listaAulas.filter(a => a.estado === 'Mantenimiento').length, color: '#b45309', bg: 'rgba(180,83,9,0.06)' },
                        ].map(({ label, count, color, bg }) => (
                          <div className="edtech-aulas-filter-pill" key={label} style={{ background: bg, borderColor: `${color}22` }}>
                            <span className="edtech-aulas-filter-dot" style={{ background: color }} />
                            <span style={{ color }}>{count} {label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Table */}
                    <div className="edtech-aulas-table-wrap">
                      <table className="edtech-aulas-table">
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
                            <tr className="edtech-aulas-no-anim">
                              <td colSpan="7">
                                <div className="edtech-aulas-empty">
                                  <div className="edtech-aulas-empty-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                                      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                                    </svg>
                                  </div>
                                  <p>{t.classrooms.noRooms}</p>
                                  <p className="edtech-aulas-empty-hint">{t.classrooms.noRoomsHint}</p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            listaAulas.map((aula, idx) => {
                              const enMantenimiento = aula.estado === 'Mantenimiento';
                              const reservasAula = listaReservas.filter(r => r.aulaId === aula.id && r.estado === 'Confirmada').length;
                              const maxCap = Math.max(...listaAulas.map(a => parseInt(a.capacidad) || 0), 1);
                              const pct = Math.min(((parseInt(aula.capacidad) || 0) / maxCap) * 100, 100);
                              const barColor = enMantenimiento ? '#b45309' : '#00A33B';

                              return (
                                <tr key={aula.id} style={{ animationDelay: `${0.18 + idx * 0.035}s` }}>
                                  {/* Nombre */}
                                  <td>
                                    <div className="edtech-aulas-room-cell">
                                      <div className={`edtech-aulas-room-icon ${enMantenimiento ? 'maint' : ''}`}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={enMantenimiento ? '#b45309' : '#00A33B'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                                        </svg>
                                      </div>
                                      <div>
                                        <div className="edtech-aulas-room-name">{aula.nombre}</div>
                                        <div className="edtech-aulas-room-date">
                                          {aula.creada ? new Date(aula.creada).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}
                                        </div>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Capacidad */}
                                  <td>
                                    <div className="edtech-aulas-cap-cell">
                                      <div className="edtech-aulas-cap-num">{aula.capacidad}</div>
                                      <span className="edtech-aulas-cap-unit">{t.classrooms.people}</span>
                                    </div>
                                    <div className="edtech-aulas-bar-track">
                                      <div className="edtech-aulas-bar-fill" style={{ width: `${pct}%`, background: barColor, animationDelay: `${0.3 + idx * 0.04}s` }} />
                                    </div>
                                  </td>

                                  {/* Equipo */}
                                  <td>
                                    <span className="edtech-aulas-badge edtech-aulas-badge-slate">{aula.equipoDisponible ? traducirEquipo(aula.equipoDisponible) : '—'}</span>
                                  </td>

                                  {/* Estado */}
                                  <td>
                                    <span className={`edtech-aulas-badge ${enMantenimiento ? 'edtech-aulas-badge-amber' : 'edtech-aulas-badge-green'}`}>
                                      {traducirEstado(aula.estado || 'Disponible')}
                                    </span>
                                  </td>

                                  {/* Reservas activas */}
                                  <td>
                                    {reservasAula > 0 ? (
                                      <span className="edtech-aulas-badge edtech-aulas-badge-blue">{reservasAula} reserva{reservasAula !== 1 ? 's' : ''}</span>
                                    ) : (
                                      <span className="edtech-aulas-no-data">—</span>
                                    )}
                                  </td>

                                  {/* Fecha creación */}
                                  <td className="edtech-aulas-date-cell">
                                    {aula.creada
                                      ? new Date(aula.creada).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })
                                      : <span className="edtech-aulas-no-data">—</span>}
                                  </td>

                                  {/* Acciones */}
                                  <td style={{ textAlign: 'right' }}>
                                    <button className="edtech-aulas-btn-danger" onClick={() => eliminarAula(aula.id)}>
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
                      <div className="edtech-aulas-table-footer">
                        <span className="edtech-aulas-footer-count">
                          {listaAulas.length} {t.classrooms.tableSummary} · {listaAulas.reduce((t, a) => t + (parseInt(a.capacidad) || 0), 0)} {t.classrooms.people}
                        </span>
                        <span className="edtech-aulas-footer-note">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          {t.classrooms.footerNote}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )
            }


            {/* ============ VISTA GESTIÓN DE INVENTARIO (ADMIN) ============ */}
            {
              permisos.gestionEquipos && vistaActual === 'equipos' && (
                <div className="edtech-equipos-wrapper">

                  {/* ══════════════════════════════════════
                    HEADER BANNER
                ══════════════════════════════════════ */}
                  <div className="edtech-equipos-banner">
                    <div className="edtech-equipos-banner-mesh" />
                    <div className="edtech-equipos-banner-grid" />
                    <div className="edtech-equipos-orb edtech-equipos-orb-1" />
                    <div className="edtech-equipos-orb edtech-equipos-orb-2" />
                    <div className="edtech-equipos-banner-divider" />

                    <div className="edtech-equipos-banner-content">
                      <div className="edtech-equipos-banner-left">
                        <div className="edtech-equipos-badge-pill">
                          <span className="edtech-equipos-badge-dot" />
                          {lang === 'es' ? 'Gestión y Préstamos' : 'Management & Loans'}
                        </div>
                        <h2 className="edtech-equipos-title">
                          {t.inventoryAdmin.title} <em>{t.inventoryAdmin.titleItalic}</em>
                        </h2>
                        <p className="edtech-equipos-subtitle">{t.inventoryAdmin.subtitle}</p>
                      </div>

                      {/* Mini stat cards */}
                      <div className="edtech-equipos-mini-stats">
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
                            value: listaSolicitudesMaterial.filter(s => (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto).length + listaReservasMaterial.filter(r => (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto).length,
                            warn: false,
                          },
                          {
                            label: t.inventoryAdmin.overdue,
                            value: listaSolicitudesMaterial.filter(s => (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto && new Date(s.fechaDevolucionEsperada || s.fechaVencimiento) < new Date()).length + listaReservasMaterial.filter(r => (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto && new Date(r.fechaDevolucionEsperada || r.fechaVencimiento || r.fechaFin) < new Date()).length,
                            warn: (listaSolicitudesMaterial.filter(s => (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto && new Date(s.fechaDevolucionEsperada || s.fechaVencimiento) < new Date()).length + listaReservasMaterial.filter(r => (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto && new Date(r.fechaDevolucionEsperada || r.fechaVencimiento || r.fechaFin) < new Date()).length) > 0,
                          },
                        ].map((stat, i) => (
                          <div key={i} className={`edtech-equipos-mini-stat ${stat.warn ? 'edtech-equipos-mini-stat-warn' : ''}`}>
                            <div className={`edtech-equipos-mini-stat-val ${stat.warn ? 'warn' : ''}`}>
                              {stat.value}
                            </div>
                            <div className={`edtech-equipos-mini-stat-label ${stat.warn ? 'warn' : ''}`}>
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ══════════════════════════════════════
                    ADD EQUIPMENT FORM CARD
                ══════════════════════════════════════ */}
                  <div className="edtech-equipos-card edtech-equipos-card-delay-1" style={{ marginBottom: '16px' }}>
                    <div className="edtech-equipos-card-header" style={{ justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div className="edtech-equipos-card-icon" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </div>
                        <div>
                          <div className="edtech-equipos-card-title">{t.inventoryAdmin.addTitle}</div>
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
                      <div className="edtech-equipos-card-body">
                        <form onSubmit={guardarNuevoEquipo}>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 120px 160px', gap: '14px', alignItems: 'flex-end', marginBottom: '14px' }}>
                            <div className="edtech-equipos-input-group">
                              <label className="edtech-equipos-label">{t.inventoryAdmin.nameLabel}</label>
                              <input name="nombre" className="edtech-equipos-input" placeholder={t.inventoryAdmin.namePlaceholder} required />
                            </div>
                            <div className="edtech-equipos-input-group">
                              <label className="edtech-equipos-label">{t.inventoryAdmin.categoryLabel}</label>
                              <select name="categoria" className="edtech-equipos-input" required style={{ cursor: 'pointer' }}>
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
                            <div className="edtech-equipos-input-group">
                              <label className="edtech-equipos-label">{t.inventoryAdmin.qtyLabel}</label>
                              <input name="cantidad" type="number" min="1" className="edtech-equipos-input edtech-equipos-qty" placeholder="1" defaultValue="1" style={{ width: '100%' }} />
                            </div>
                            <div className="edtech-equipos-input-group">
                              <label className="edtech-equipos-label">{t.inventoryAdmin.statusLabel}</label>
                              <select name="estado" className="edtech-equipos-input" style={{ cursor: 'pointer' }}>
                                <option value="Disponible">{t.status.available}</option>
                                <option value="Mantenimiento">{t.status.maintenance}</option>
                                <option value="Inactivo">{t.status.inactive}</option>
                              </select>
                            </div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button type="button" className="edtech-equipos-btn-ghost" onClick={() => setShowFormReserva(false)}>{t.inventoryAdmin.cancel}</button>
                            <button type="submit" className="edtech-equipos-btn-primary" style={{ width: 'auto' }}>{t.inventoryAdmin.registerBtn}</button>
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
                    const pendientesMat = listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length + listaReservasMaterial.filter(r => r.estado === 'Pendiente').length;
                    const devolucionesPend = listaSolicitudesMaterial.filter(s => (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto).length + listaReservasMaterial.filter(r => (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto).length;
                    const atrasadosCount = listaSolicitudesMaterial.filter(s => (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto && new Date(s.fechaDevolucionEsperada || s.fechaVencimiento) < new Date()).length + listaReservasMaterial.filter(r => (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto && new Date(r.fechaDevolucionEsperada || r.fechaVencimiento || r.fechaFin) < new Date()).length;

                    return (
                      <div className="edtech-equipos-card" style={{ animationDelay: '0.14s' }}>

                        {/* Tab bar header */}
                        <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                          <div className="edtech-equipos-tab-bar">
                            {[
                              { key: 'gi-catalogo', label: t.inventoryAdmin.tabCatalog },
                              { key: 'gi-solicitudes', label: `${t.inventoryAdmin.tabRequests}${pendientesMat > 0 ? ` · ${pendientesMat}` : ''}` },
                              { key: 'gi-prestamos', label: `${t.inventoryAdmin.tabLoans}${devolucionesPend > 0 ? ` · ${devolucionesPend}` : ''}` },
                            ].map(({ key, label }) => (
                              <button
                                key={key}
                                className={`edtech-equipos-tab ${tabActual === key ? 'active' : ''}`}
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
                                  { label: t.inventoryAdmin.withStock, count: listaEquipos.filter(e => (e.cantidad || 0) > 0).length, color: '#059669', bg: '#f0fdf4' },
                                  { label: t.inventoryAdmin.noStockLabel, count: listaEquipos.filter(e => (e.cantidad || 0) === 0).length, color: '#dc2626', bg: '#fef2f2' },
                                  { label: t.inventoryAdmin.maintenanceLabel, count: listaEquipos.filter(e => e.estado === 'Mantenimiento').length, color: '#b45309', bg: '#fffbeb' },
                                ].map(({ label, count, color, bg }) => (
                                  <div key={label} style={{ background: bg, border: `1px solid ${color}20`, borderRadius: '4px', padding: '4px 11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                                    <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {label}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="edtech-equipos-table-container">
                              <table className="edtech-equipos-table">
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
                                        <div style={{ textAlign: 'center', padding: '44px 20px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                                          <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
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
                                      const prestamosActivos = listaSolicitudesMaterial.filter(s => s.equipoId === eq.id && (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto).reduce((t, s) => t + s.cantidad, 0) + listaReservasMaterial.filter(r => r.equipoId === eq.id && (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto).reduce((t, r) => t + (r.cantidad || 1), 0);
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
                                                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
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
                                            <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: '3px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.7px', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif', background: '#f1f5f9', color: '#475569' }}>{eq.categoria || '—'}</span>
                                          </td>

                                          {/* Stock editable */}
                                          <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                              <div>
                                                <input
                                                  type="number"
                                                  className="edtech-equipos-qty"
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
                                                <div style={{ height: '3px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden', marginTop: '5px', width: '60px' }}>
                                                  <div style={{ height: '100%', borderRadius: '2px', width: `${pct}%`, background: barColor, animationDelay: `${0.3 + idx * 0.04}s`, transition: 'width 0.4s ease' }} />
                                                </div>
                                              </div>
                                              <span style={{ fontSize: '10.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', whiteSpace: 'nowrap' }}>uds.</span>
                                            </div>
                                          </td>

                                          {/* En préstamo */}
                                          <td>
                                            {prestamosActivos > 0 ? (
                                              <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: '3px', fontSize: '10px', fontWeight: '700', letterSpacing: '0.7px', textTransform: 'uppercase', fontFamily: '"DM Sans", sans-serif', background: '#eff6ff', color: '#2563eb' }}>{prestamosActivos} uds.</span>
                                            ) : (
                                              <span style={{ fontSize: '12px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif' }}>—</span>
                                            )}
                                          </td>

                                          {/* Estado */}
                                          <td>
                                            <span className={`edtech-equipos-status ${sinStock ? 'edtech-equipos-status-baja' : enMantenimiento ? 'edtech-equipos-status-mant' : 'edtech-equipos-status-disp'}`}>
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
                                            <button className="edtech-equipos-btn-danger" onClick={() => eliminarEquipo(eq.id)}>
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
                                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
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

                            <div className="edtech-equipos-table-container">
                              <table className="edtech-equipos-table">
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
                                  {(() => {
                                    const combinedSolicitudes = [
                                      ...listaSolicitudesMaterial.filter(s => s.estado !== 'Rechazada').map(s => ({ ...s, isReserva: false, qty: s.cantidad, fechaEsperada: s.fechaDevolucionEsperada || s.fechaVencimiento, duracionStr: s.tiempoUso })),
                                      ...listaReservasMaterial.filter(r => r.estado !== 'Rechazada').map(r => ({ ...r, isReserva: true, qty: r.cantidad || 1, fechaEsperada: r.fechaDevolucionEsperada || r.fechaVencimiento || r.fechaFin, duracionStr: r.duracion || "24" }))
                                    ].sort((a, b) => new Date(b.fechaEsperada) - new Date(a.fechaEsperada));

                                    if (combinedSolicitudes.length === 0) {
                                      return (
                                        <tr style={{ opacity: 1 }}>
                                          <td colSpan="8">
                                            <div style={{ textAlign: 'center', padding: '44px 20px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                                              <p style={{ margin: 0, fontSize: '13px' }}>{t.adminRequests.noMaterial}</p>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    }

                                    return combinedSolicitudes.map((sol, idx) => {
                                      const equipo = listaEquipos.find(e => e.id === sol.equipoId);
                                      const ahora = new Date();
                                      const venc = new Date(sol.fechaEsperada);
                                      const esAtrasado = (sol.estado === 'Aprobada' || sol.estado === 'Confirmada') && !sol.devuelto && ahora > venc;

                                      let tiempo = sol.duracionStr;
                                      if (sol.isReserva && sol.fechaInicio && sol.fechaFin) {
                                        const diffMs = new Date(sol.fechaFin) - new Date(sol.fechaInicio);
                                        const diffHrs = Math.round(diffMs / 3600000);
                                        tiempo = (diffHrs > 0 ? diffHrs : 1);
                                      } else if (!tiempo) {
                                        tiempo = 24;
                                      }

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
                                              {(sol.solicitadoPor || sol.reservadoPor)?.split('@')[0]}
                                            </div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{sol.solicitadoPor || sol.reservadoPor}</div>
                                          </td>

                                          {/* Material */}
                                          <td>
                                            <div style={{ fontWeight: '500', color: '#334155', fontFamily: '"DM Sans", sans-serif' }}>
                                              {equipo?.nombre || sol.equipoNombre || 'Desconocido'}
                                            </div>
                                          </td>

                                          {/* Cantidad */}
                                          <td>
                                            <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: '17px', fontWeight: '300', color: '#0f172a' }}>×{sol.qty}</span>
                                          </td>

                                          {/* Motivo */}
                                          <td style={{ maxWidth: '160px' }}>
                                            <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif', lineHeight: '1.4', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                                              {sol.motivo || <span style={{ color: '#cbd5e1' }}>—</span>}
                                            </div>
                                          </td>

                                          {/* Duración */}
                                          <td>
                                            <span style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>{tiempo}h</span>
                                          </td>

                                          {/* Devolución esperada */}
                                          <td>
                                            <div style={{ fontSize: '12px', fontFamily: '"DM Sans", sans-serif', color: esAtrasado ? '#dc2626' : '#475569', fontWeight: esAtrasado ? '600' : '400' }}>
                                              {esAtrasado && <div style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#dc2626', marginBottom: '2px' }}>{t.messages.overdue}</div>}
                                              {venc.toLocaleString('es-ES', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </div>
                                          </td>

                                          {/* Estado */}
                                          <td>
                                            <span className={`edtech-equipos-status ${sol.estado === 'Aprobada' || sol.estado === 'Confirmada' ? 'edtech-equipos-status-disp' : sol.estado === 'Rechazada' ? 'edtech-equipos-status-baja' : 'edtech-equipos-status-mant'}`}>
                                              {traducirEstado(sol.estado)}
                                            </span>
                                          </td>

                                          {/* Acciones */}
                                          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                            {sol.estado === 'Pendiente' && (
                                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                                <button className="edtech-equipos-btn-primary" style={{ padding: '6px 14px', width: 'auto' }} onClick={() => sol.isReserva ? aprobarReservaMaterial(sol.id) : aprobarSolicitudMaterial(sol.id)}>Aprobar</button>
                                                <button className="edtech-equipos-btn-danger" onClick={() => sol.isReserva ? rechazarReservaMaterial(sol.id) : rechazarSolicitudMaterial(sol.id)}>Rechazar</button>
                                              </div>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    });
                                  })()}
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
                                { label: t.inventoryAdmin.overdueLabel, count: atrasadosCount, color: '#dc2626', bg: '#fef2f2' },
                              ].map(({ label, count, color, bg }) => (
                                <div key={label} style={{ background: bg, border: `1px solid ${color}20`, borderRadius: '4px', padding: '4px 11px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: color, display: 'inline-block', flexShrink: 0 }} />
                                  <span style={{ fontSize: '11px', fontWeight: '600', color, fontFamily: '"DM Sans", sans-serif' }}>{count} {label}</span>
                                </div>
                              ))}
                            </div>

                            <div className="edtech-equipos-table-container">
                              <table className="edtech-equipos-table">
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
                                  {(() => {
                                    const combinedDeudas = [
                                      ...listaSolicitudesMaterial.filter(s => (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto).map(s => ({ ...s, isReserva: false, qty: s.cantidad, fechaEsperada: s.fechaDevolucionEsperada || s.fechaVencimiento })),
                                      ...listaReservasMaterial.filter(r => (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto).map(r => ({ ...r, isReserva: true, qty: r.cantidad || 1, fechaEsperada: r.fechaDevolucionEsperada || r.fechaVencimiento || r.fechaFin }))
                                    ].sort((a, b) => new Date(a.fechaEsperada) - new Date(b.fechaEsperada));

                                    if (combinedDeudas.length === 0) {
                                      return (
                                        <tr style={{ opacity: 1 }}>
                                          <td colSpan="7">
                                            <div style={{ textAlign: 'center', padding: '44px 20px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                                              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #dcfce7', background: '#f0fdf4', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                  <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                              </div>
                                              <p style={{ margin: 0, fontSize: '13px', color: '#16a34a', fontWeight: '600' }}>Todo devuelto</p>
                                              <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#94a3b8' }}>{t.inventoryAdmin.noActiveLoans}</p>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    }

                                    return combinedDeudas.map((sol, idx) => {
                                      const equipo = listaEquipos.find(e => e.id === sol.equipoId);
                                      const ahora = new Date();
                                      const venc = new Date(sol.fechaEsperada);
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
                                                  {((sol.solicitadoPor || sol.reservadoPor) || '?').charAt(0)}
                                                </span>
                                              </div>
                                              <div>
                                                <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '12.5px', fontFamily: '"DM Sans", sans-serif' }}>
                                                  {(sol.solicitadoPor || sol.reservadoPor)?.split('@')[0]}
                                                </div>
                                                <div style={{ fontSize: '10.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{sol.solicitadoPor || sol.reservadoPor}</div>
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
                                            <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: '17px', fontWeight: '300', color: '#0f172a' }}>×{sol.qty}</span>
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
                                            <span className={`edtech-equipos-status ${esAtrasado ? 'edtech-equipos-status-baja' : 'edtech-equipos-status-disp'}`}>
                                              {esAtrasado ? 'Atrasado' : 'En tiempo'}
                                            </span>
                                          </td>

                                          {/* Acción */}
                                          <td style={{ textAlign: 'right' }}>
                                            <button className="edtech-equipos-btn-primary" style={{ padding: '6px 14px', width: 'auto' }} onClick={() => sol.isReserva ? registrarDevolucionReservaMaterial(sol.id) : registrarDevolucionMaterial(sol.id)}>
                                              Confirmar devolución
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    });
                                  })()}
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
              )
            }
            {/* ============ VISTA AULAS RESERVADAS ============ */}
            {
              vistaActual === 'aulasReservadas' && (
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
                  <div className="edtech-ar-banner">
                    <div className="edtech-ar-banner-mesh" />
                    <div className="edtech-ar-banner-grid" />
                    <div className="edtech-ar-orb edtech-ar-orb-1" />
                    <div className="edtech-ar-orb edtech-ar-orb-2" />
                    <div className="edtech-ar-banner-divider" />

                    <div className="edtech-ar-banner-content">
                      <div className="edtech-ar-banner-left">
                        <div className="edtech-ar-badge-pill">
                          <span className="edtech-ar-badge-dot" />
                          {lang === 'es' ? 'Gestión de Reservas' : 'Reservation Management'}
                        </div>
                        <h2 className="edtech-ar-title">
                          {t.reservedRooms.title} <em>{t.reservedRooms.titleItalic}</em>
                        </h2>
                        <p className="edtech-ar-subtitle">{t.reservedRooms.subtitle}</p>
                      </div>

                      {/* Mini stats */}
                      <div className="edtech-ar-mini-stats">
                        {[
                          { label: t.reservedRooms.totalRooms, value: listaAulas.length, warn: false },
                          { label: t.reservedRooms.withReservations, value: listaAulas.filter(a => listaReservas.some(r => r.aulaId === a.id && r.estado === 'Confirmada')).length, warn: false },
                          { label: t.reservedRooms.withoutReservations, value: listaAulas.filter(a => !listaReservas.some(r => r.aulaId === a.id && r.estado === 'Confirmada')).length, warn: false },
                          { label: t.reservedRooms.totalConfirmed, value: listaReservas.filter(r => r.estado === 'Confirmada').length, warn: false },
                        ].map((stat, i) => (
                          <div key={i} className={`edtech-ar-mini-stat ${stat.warn ? 'edtech-ar-mini-stat-warn' : ''}`}>
                            <div className={`edtech-ar-mini-stat-val ${stat.warn ? 'warn' : ''}`}>
                              {stat.value}
                            </div>
                            <div className={`edtech-ar-mini-stat-label ${stat.warn ? 'warn' : ''}`}>
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
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
                            <button
                              className={`ar-tab ${vistaTab === 'ar-solicitudes' ? 'ar-active' : ''}`}
                              onClick={() => setTabSolicitudesAdmin('ar-solicitudes')}
                            >
                              {lang === 'es' ? 'Solicitudes' : 'Requests'}
                              {listaReservas.some(r => r.estado === 'Pendiente' && (rolNormalizado === 'admin' || r.reservadoPor === usuarioActivo?.email)) && (
                                <span style={{ marginLeft: '6px', background: '#d97706', color: '#fff', padding: '2px 6px', borderRadius: '10px', fontSize: '9px', fontWeight: '700' }}>!</span>
                              )}
                            </button>
                          </div>

                          {/* Right side: summary pills + reserve action */}
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                            {[
                              { label: t.reservedRooms.confirmed, count: listaReservas.filter(r => r.estado === 'Confirmada').length, color: '#059669', bg: '#f0fdf4' },
                              { label: lang === 'es' ? 'Pendientes' : 'Pending', count: listaReservas.filter(r => r.estado === 'Pendiente').length, color: '#d97706', bg: '#fffbeb' },
                              { label: t.reservedRooms.cancelled, count: listaReservas.filter(r => r.estado !== 'Confirmada' && r.estado !== 'Pendiente').length, color: '#dc2626', bg: '#fef2f2' },
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
                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
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
                                        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                                      </svg>
                                    </div>
                                    <p style={{ margin: 0, fontSize: '13px' }}>{t.reservedRooms.noRooms}</p>
                                    <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>{t.reservedRooms.noRoomsHint}</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              listaAulas.map((aula, idx) => {
                                const hoyStr = obtenerFechaLocal();
                                const reservasAula = listaReservas.filter(r => r.aulaId === aula.id && r.estado === 'Confirmada' && r.fecha >= hoyStr);
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
                                  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
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
                                              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
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
                                {(() => {
                                  const hoy = obtenerFechaLocal();
                                  const confirmadasFuturas = listaReservas.filter(r => r.estado === 'Confirmada' && r.fecha >= hoy).length;
                                  return (
                                    <>
                                      <span style={{ fontWeight: '600', color: '#1e293b' }}>{confirmadasFuturas}</span> {t.home.activeReservations}
                                    </>
                                  );
                                })()}
                              </span>
                              {/* Role pills */}
                              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {[
                                  { label: t.roles.admin, count: listaReservas.filter(r => r.rol === 'admin' && r.estado === 'Confirmada' && r.fecha >= obtenerFechaLocal()).length, color: '#dc2626', bg: '#fef2f2' },
                                  { label: t.roles.maestro, count: listaReservas.filter(r => r.rol === 'maestro' && r.estado === 'Confirmada' && r.fecha >= obtenerFechaLocal()).length, color: '#2563eb', bg: '#eff6ff' },
                                  { label: t.roles.alumno, count: listaReservas.filter(r => r.rol === 'alumno' && r.estado === 'Confirmada' && r.fecha >= obtenerFechaLocal()).length, color: '#16a34a', bg: '#f0fdf4' },
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
                                  {(() => {
                                    const hoy = obtenerFechaLocal();
                                    const reservasFiltradas = listaReservas.filter(r => r.fecha >= hoy);

                                    if (reservasFiltradas.length === 0) {
                                      return (
                                        <tr style={{ opacity: 1 }}>
                                          <td colSpan="8">
                                            <div className="ar-empty">
                                              <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #e2e8f0', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5">
                                                  <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                                </svg>
                                              </div>
                                              <p style={{ margin: 0, fontSize: '13px' }}>{t.allReservations.noReservations}</p>
                                              <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#cbd5e1' }}>{t.allReservations.noReservationsHint || t.reservedRooms.noReservationsHint}</p>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    }

                                    return reservasFiltradas.map((res, idx) => {
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
                                                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
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
                                    });
                                  })()}
                                </tbody>
                              </table>
                            </div>

                            {/* Footer */}
                            {(() => {
                              const hoy = obtenerFechaLocal();
                              const filtradasTotal = listaReservas.filter(r => r.fecha >= hoy).length;
                              const filtradasConfirmadas = listaReservas.filter(r => r.estado === 'Confirmada' && r.fecha >= hoy).length;

                              if (filtradasTotal > 0) {
                                return (
                                  <div style={{ padding: '10px 20px', borderTop: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '11.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                                      {filtradasTotal} reserva(s) en total · {filtradasConfirmadas} confirmada(s)
                                    </span>
                                    <span style={{ fontSize: '11px', color: '#cbd5e1', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                      </svg>
                                      {t.reservedRooms.adminOnly}
                                    </span>
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </div>
                        )}

                        {/* ════════════════════════════
              VIEW: PENDING REQUESTS (ADMIN / USER)
          ════════════════════════════ */}
                        {vistaTab === 'ar-solicitudes' && (
                          <div className="ar-card" style={{ animationDelay: '0.1s' }}>
                            <div style={{ padding: '12px 20px', borderBottom: '1px solid #f1f5f9' }}>
                              <span style={{ fontSize: '11.5px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
                                <span style={{ fontWeight: '600', color: '#d97706' }}>
                                  {listaReservas.filter(r => r.estado === 'Pendiente' && (rolNormalizado === 'admin' || r.reservadoPor === usuarioActivo?.email)).length}
                                </span> {lang === 'es' ? 'solicitudes pendientes' : 'pending requests'}
                              </span>
                            </div>
                            <div style={{ overflowX: 'auto' }}>
                              <table className="ar-table">
                                <thead>
                                  <tr>
                                    <th>{t.reservedRooms.colRoom}</th>
                                    <th>{t.reservedRooms.colDate}</th>
                                    <th>{t.reservedRooms.colSchedule}</th>
                                    <th>{t.reservedRooms.colSubject}</th>
                                    <th>{t.reservedRooms.colStatus}</th>
                                    <th style={{ textAlign: 'right' }}>{t.reservedRooms.colActions}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {(() => {
                                    const pendientes = listaReservas.filter(r => r.estado === 'Pendiente' && (rolNormalizado === 'admin' || r.reservadoPor === usuarioActivo?.email));
                                    if (pendientes.length === 0) {
                                      return (
                                        <tr>
                                          <td colSpan="6">
                                            <div className="ar-empty">
                                              <p style={{ margin: 0, fontSize: '13px' }}>{lang === 'es' ? 'No hay solicitudes pendientes.' : 'No pending requests.'}</p>
                                            </div>
                                          </td>
                                        </tr>
                                      );
                                    }
                                    return pendientes.map((res) => (
                                      <tr key={res.id}>
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fffbeb', border: '1px solid #fde68a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                              <span style={{ fontSize: '11px', fontWeight: '700', color: '#d97706', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase' }}>
                                                {(res.nombreReservador || res.reservadoPor || '?').charAt(0)}
                                              </span>
                                            </div>
                                            <div>
                                              <div style={{ fontWeight: '600', color: '#1e293b', fontSize: '12.5px', fontFamily: '"DM Sans", sans-serif' }}>{res.aulaNombre}</div>
                                              <div style={{ fontSize: '10.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{res.nombreReservador || res.reservadoPor?.split('@')[0]}</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>
                                          <span style={{ fontSize: '12.5px', color: '#1e293b', fontWeight: '500', fontFamily: '"DM Sans", sans-serif' }}>
                                            {new Date(res.fecha + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' })}
                                          </span>
                                        </td>
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: '"DM Sans", sans-serif' }}>
                                            <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#1e293b' }}>{res.horaInicio}</span>
                                            <span style={{ fontSize: '10px', color: '#94a3b8' }}>→</span>
                                            <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#1e293b' }}>{res.horaFin}</span>
                                          </div>
                                        </td>
                                        <td style={{ maxWidth: '200px' }}>
                                          <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {res.descripcion || <span style={{ color: '#cbd5e1' }}>—</span>}
                                          </div>
                                        </td>
                                        <td>
                                          <span className="ar-badge ar-badge-amber">{lang === 'es' ? 'Pendiente' : 'Pending'}</span>
                                        </td>
                                        <td style={{ textAlign: 'right' }}>
                                          {rolNormalizado === 'admin' ? (
                                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                              <button onClick={() => aprobarReserva(res.id)} style={{ padding: '6px 14px', borderRadius: '8px', background: '#f0fdf4', color: '#059669', border: '1px solid #d1fae5', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif' }}>
                                                {lang === 'es' ? 'Aprobar' : 'Approve'}
                                              </button>
                                              <button onClick={() => rechazarReserva(res.id)} style={{ padding: '6px 14px', borderRadius: '8px', background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif' }}>
                                                {lang === 'es' ? 'Rechazar' : 'Reject'}
                                              </button>
                                            </div>
                                          ) : (
                                            <button onClick={() => cancelarReserva(res.id)} className="ar-btn-danger">
                                              {lang === 'es' ? 'Cancelar' : 'Cancel'}
                                            </button>
                                          )}
                                        </td>
                                      </tr>
                                    ));
                                  })()}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )
            }



            {/* ============ VISTA MIS SOLICITUDES (ALUMNO Y MAESTRO) ============ */}
            {
              permisos.solicitarEquipos && vistaActual === 'solicitudes' && (
                <div style={{ animation: 'adFadeIn 0.5s ease' }}>
                  {/* ── HEADER BANNER ── */}
                  <div style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                    borderRadius: '24px',
                    padding: '40px 48px',
                    marginBottom: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                    flexWrap: 'wrap',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }}>
                    {/* Decorative elements */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '-40px', left: '20%', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6', boxShadow: '0 0 10px #3b82f6' }} />
                        <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#ffffff', fontFamily: '"DM Sans", sans-serif' }}>Trámites Personales</span>
                      </div>
                      <h1 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.2' }}>
                        Estado de <span style={{ fontStyle: 'italic', color: '#60a5fa' }}>Mis Solicitudes</span>
                      </h1>
                      <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', maxWidth: '500px' }}>
                        Gesto de tus peticiones de aulas y materiales. Recibirás una notificación cuando sean procesadas por administración.
                      </p>
                    </div>

                    {/* Quick Stats */}
                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '16px' }}>
                      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px 24px', textAlign: 'center', minWidth: '100px', backdropFilter: 'blur(10px)' }}>
                        <div style={{ fontSize: '28px', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '4px' }}>
                          {listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).length}
                        </div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>Aulas</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '16px 24px', textAlign: 'center', minWidth: '100px', backdropFilter: 'blur(10px)' }}>
                        <div style={{ fontSize: '28px', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '4px' }}>
                          {listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).length}
                        </div>
                        <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '1px' }}>Materiales</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                    {/* Room Requests Section */}
                    <div className="req-card">
                      <div className="req-card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eff6ff', border: '1px solid #dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                          </div>
                          <div>
                            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a', fontFamily: '"DM Sans", sans-serif' }}>{t.myRequests.pendingRooms}</h2>
                            <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>Solicitudes para uso de espacios compartidos</p>
                          </div>
                        </div>
                        <span className="req-section-badge">{listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).length + listaReservas.filter(r => r.reservadoPor === usuarioActivo.email && r.estado === 'Pendiente').length}</span>
                      </div>

                      <div style={{ overflowX: 'auto' }}>
                        <table className="req-table">
                          <thead>
                            <tr>
                              <th>{t.myRequests.colRoom}</th>
                              <th>{t.myRequests.colDateTime}</th>
                              <th>{t.myRequests.colReason}</th>
                              <th>{t.myRequests.colStatus}</th>
                              <th style={{ textAlign: 'right' }}>{t.myRequests.colActions}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              const unifiedRooms = [
                                ...listaSolicitudes.filter(s => s.solicitadoPor === usuarioActivo.email).map(s => ({ ...s, isReserva: false })),
                                ...listaReservas.filter(r => r.reservadoPor === usuarioActivo.email).map(r => ({
                                  id: r.id,
                                  aulaNombre: r.aulaNombre,
                                  tipo: 'Aula',
                                  fechaSolicitada: r.fecha,
                                  horaInicio: r.horaInicio,
                                  horaFin: r.horaFin,
                                  descripcion: r.descripcion,
                                  estado: r.estado,
                                  isReserva: true
                                }))
                              ];
                              unifiedRooms.sort((a, b) => new Date(b.fechaSolicitada) - new Date(a.fechaSolicitada));

                              if (unifiedRooms.length === 0) {
                                return (
                                  <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
                                      <div style={{ fontSize: '14px', opacity: 0.6 }}>{t.myRequests.noRoomRequests}</div>
                                    </td>
                                  </tr>
                                );
                              }

                              return unifiedRooms.map(sol => (
                                <tr key={sol.id}>
                                  <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: '12px', fontWeight: '800', color: '#334155' }}>{(sol.aulaNombre || sol.tipo).charAt(0)}</span>
                                      </div>
                                      <strong style={{ fontWeight: '700', color: '#0f172a' }}>{sol.aulaNombre || sol.tipo}</strong>
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{ fontWeight: '600', color: '#334155' }}>{sol.fechaSolicitada}</div>
                                    <div style={{ fontSize: '11px', color: '#64748b' }}>{sol.horaInicio} — {sol.horaFin}</div>
                                  </td>
                                  <td style={{ fontSize: '13px', color: '#64748b', maxWidth: '250px' }}>
                                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sol.descripcion}</div>
                                  </td>
                                  <td>
                                    <span className={`ad-badge ${sol.estado === 'Aprobada' || sol.estado === 'Confirmada' ? 'ad-badge-green' : sol.estado === 'Rechazada' ? 'ad-badge-red' : 'ad-badge-amber'}`}>
                                      {traducirEstado(sol.estado)}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    {sol.estado === 'Pendiente' && (
                                      <button className="req-btn-withdraw" onClick={() => sol.isReserva ? cancelarReserva(sol.id) : cancelarSolicitudPropia(sol.id, "solicitudes", `Aula ${sol.aulaNombre}`)}>
                                        {t.myRequests.withdrawBtn}
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ));
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Material Requests Section */}
                    <div className="req-card">
                      <div className="req-card-header">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f0fdf4', border: '1px solid #d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                            </svg>
                          </div>
                          <div>
                            <h2 style={{ margin: 0, fontSize: '16px', fontWeight: '800', color: '#0f172a', fontFamily: '"DM Sans", sans-serif' }}>{t.myRequests.materials}</h2>
                            <p style={{ margin: 0, fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>Préstamos de equipos y materiales tecnológicos</p>
                          </div>
                        </div>
                        <span className="req-section-badge">{listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).length + listaReservasMaterial.filter(r => (r.reservadoPor || r.solicitadoPor) === usuarioActivo.email).length}</span>
                      </div>

                      <div style={{ overflowX: 'auto' }}>
                        <table className="req-table">
                          <thead>
                            <tr>
                              <th>{t.myRequests.colMaterial}</th>
                              <th>{t.myRequests.colQty}</th>
                              <th>{t.myRequests.colDueDate}</th>
                              <th>{t.myRequests.colStatusReturn}</th>
                              <th style={{ textAlign: 'right' }}>{t.myRequests.colActions}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(() => {
                              const unifiedMaterials = [
                                ...listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo.email).map(s => ({
                                  ...s,
                                  isReserva: false,
                                  qty: s.cantidad,
                                  fechaVenc: s.fechaDevolucionEsperada || s.fechaVencimiento
                                })),
                                ...listaReservasMaterial.filter(r => (r.reservadoPor || r.solicitadoPor) === usuarioActivo.email).map(r => ({
                                  ...r,
                                  isReserva: true,
                                  equipoNombre: r.equipoNombre,
                                  qty: r.cantidad || 1,
                                  fechaVenc: r.fechaDevolucionEsperada || r.fechaFin || r.fechaVencimiento,
                                  motivo: r.motivo || r.descripcion
                                }))
                              ];
                              unifiedMaterials.sort((a, b) => new Date(b.fechaVenc) - new Date(a.fechaVenc));

                              if (unifiedMaterials.length === 0) {
                                return (
                                  <tr>
                                    <td colSpan="5" style={{ textAlign: 'center', padding: '60px', color: '#94a3b8' }}>
                                      <div style={{ fontSize: '14px', opacity: 0.6 }}>{t.myRequests.noMaterialRequests}</div>
                                    </td>
                                  </tr>
                                );
                              }

                              return unifiedMaterials.map(sol => (
                                <tr key={sol.id}>
                                  <td>
                                    <strong style={{ fontWeight: '700', color: '#0f172a' }}>{sol.equipoNombre}</strong>
                                    <div style={{ fontSize: '11px', color: '#94a3b8' }}>{sol.motivo ? (sol.motivo.length > 30 ? sol.motivo.slice(0, 30) + '...' : sol.motivo) : '—'}</div>
                                  </td>
                                  <td>
                                    <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: '18px', fontWeight: '300', color: '#334155' }}>×{sol.qty}</span>
                                  </td>
                                  <td>
                                    <div style={{ fontWeight: '600', color: '#334155' }}>
                                      {new Date(sol.fechaVenc).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                    </div>
                                    <div style={{ fontSize: '11px', color: '#64748b' }}>
                                      {new Date(sol.fechaVenc).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                  </td>
                                  <td>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                      <span className={`ad-badge ${sol.estado === 'Aprobada' || sol.estado === 'Confirmada' ? 'ad-badge-green' : sol.estado === 'Rechazada' ? 'ad-badge-red' : 'ad-badge-amber'}`}>
                                        {traducirEstado(sol.estado)}
                                      </span>
                                      {(sol.estado === 'Aprobada' || sol.estado === 'Confirmada') && (
                                        <span className={`ad-badge ${sol.devuelto ? 'ad-badge-indigo' : 'ad-badge-slate'}`} style={{ fontSize: '9px', padding: '2px 8px' }}>
                                          {sol.devuelto ? '✓ ' + t.myRequests.returned : '• Posesión'}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                  <td style={{ textAlign: 'right' }}>
                                    {sol.estado === 'Pendiente' && (
                                      <button className="req-btn-cancel" onClick={() => sol.isReserva ? cancelarReservaMaterial(sol.id) : cancelarSolicitudPropia(sol.id, "solicitudes_material", `Material ${sol.equipoNombre}`)}>
                                        {t.myRequests.cancelBtn}
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ));
                            })()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            {/* ============ VISTA RESERVAS ADMIN ============ */}
            {
              permisos.verReservas && vistaActual === 'reservasAdmin' && (
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
                        {(() => {
                          const hoy = obtenerFechaLocal();
                          const reservasFiltradas = listaReservas.filter(r => r.fecha >= hoy);

                          if (reservasFiltradas.length === 0) {
                            return <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>{t.allReservations.noReservations}</td></tr>;
                          }

                          return reservasFiltradas.map((res) => (
                            <tr key={res.id}>
                              <td>
                                <div style={{ fontWeight: 'bold' }}>{res.aulaNombre}</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>Cap: {res.aulaCapacidad}</div>
                              </td>
                              <td>
                                <div style={{ fontWeight: '500' }}>{res.nombreReservador}</div>
                                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{res.reservadoPor}</div>
                              </td>
                              <td style={{ fontWeight: '500' }}>{new Date(res.fecha + 'T12:00:00').toLocaleDateString('es-ES')}</td>
                              <td style={{ fontWeight: '500' }}>{res.horaInicio} - {res.horaFin}</td>
                              <td style={{ fontSize: '12px', color: '#475569', maxWidth: '200px' }}>
                                {res.descripcion}
                              </td>
                              <td>
                                <span className={`badge ${res.estado === 'Confirmada' ? 'badge-success' : res.estado === 'Pendiente' ? 'badge-warning' : 'badge-danger'}`} style={{ backgroundColor: res.estado === 'Pendiente' ? '#f59e0b' : undefined }}>
                                  {traducirEstado(res.estado)}
                                </span>
                              </td>
                              <td>
                                {res.estado === 'Pendiente' ? (
                                  <div style={{ display: 'flex', gap: '5px' }}>
                                    <button
                                      className="btn-small"
                                      style={{ backgroundColor: '#10b981', color: 'white' }}
                                      onClick={() => aprobarReserva(res.id)}
                                    >
                                      ✓
                                    </button>
                                    <button
                                      className="btn-small"
                                      style={{ backgroundColor: '#ef4444', color: 'white' }}
                                      onClick={() => rechazarReserva(res.id)}
                                    >
                                      ✕
                                    </button>
                                  </div>
                                ) : res.estado === 'Confirmada' ? (
                                  <button
                                    className="btn-small btn-danger"
                                    onClick={() => cancelarReserva(res.id)}
                                  >
                                    {t.allReservations.cancelBtn}
                                  </button>
                                ) : null}
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              )
            }


            {/* ============ VISTA AULAS PÚBLICAS (RESERVAR / SOLICITAR) ============ */}


            {
              vistaActual === 'aulasPúblicas' && (
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
        padding: 16px 20px;
        border: 1px solid #e4e8ef;
        border-radius: 12px;
        background: #ffffff;
        cursor: pointer;
        text-align: left;
        font-family: 'DM Sans', sans-serif;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
        opacity: 0;
        animation: adSlideUp 0.4s ease forwards;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
      }
      .ad-aula-btn::before {
        content: '';
        position: absolute;
        left: 0; top: 0; bottom: 0;
        width: 4px;
        background: transparent;
        transition: all 0.2s ease;
      }
      .ad-aula-btn:hover {
        border-color: #059669;
        box-shadow: 0 10px 25px rgba(0, 163, 59, 0.06);
        transform: translateY(-3px);
      }
      .ad-aula-btn:hover::before {
        background: #059669;
        width: 4px;
      }
      .ad-aula-btn.ad-selected {
        border-color: #059669;
        background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
        box-shadow: 0 12px 30px rgba(5, 150, 105, 0.1);
        transform: translateY(-2px);
      }
      .ad-aula-btn.ad-selected::before {
        background: #059669;
        width: 6px;
      }

      /* ── Time slot grid ── */
      .ad-slot {
        border: 1px solid transparent;
        border-radius: 12px;
        padding: 0;
        cursor: pointer;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        position: relative;
        overflow: hidden;
        font-family: 'DM Sans', sans-serif;
        background: #ffffff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
      }
      .ad-slot-inner {
        padding: 14px 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        height: 100%;
        box-sizing: border-box;
      }
      .ad-slot.ad-slot-free {
        background: #ffffff;
        border-color: #e2e8f0;
      }
      .ad-slot.ad-slot-free:hover {
        background: #f0fdf4;
        border-color: #059669;
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 25px rgba(5, 150, 105, 0.08);
      }
      .ad-slot.ad-slot-selected {
        background: linear-gradient(135deg, #059669 0%, #047857 100%);
        border-color: #047857;
        box-shadow: 0 15px 35px rgba(5, 150, 105, 0.2);
        transform: translateY(-4px) scale(1.03);
      }
      .ad-slot.ad-slot-occupied {
        background: #ffffff;
        border: 1px solid #fee2e2;
        cursor: pointer;
        transition: all 0.2s;
      }
      .ad-slot.ad-slot-occupied:hover {
        background: #fef2f2;
        border-color: #fca5a5;
        transform: translateY(-2px);
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
        border-radius: 16px;
        overflow: hidden;
        animation: adScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      /* ── Textarea ── */
      .ad-textarea {
        width: 100%;
        padding: 11px 14px;
        border: 1.5px solid #e4e8ef;
        border-radius: 8px;
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
        padding: 12px 28px;
        background: #059669;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: all 0.2s;
        letter-spacing: 0.2px;
      }
      .ad-btn-submit:hover {
        background: #047857;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(5,150,105,0.3);
      }
      .ad-btn-submit-blue {
        padding: 12px 28px;
        background: #2563eb;
        color: #ffffff;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        font-family: 'DM Sans', sans-serif;
        cursor: pointer;
        transition: all 0.2s;
        letter-spacing: 0.2px;
      }
      .ad-btn-submit-blue:hover {
        background: #1d4ed8;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(37,99,235,0.3);
      }
      .ad-btn-ghost {
        padding: 11px 20px;
        background: transparent;
        color: #64748b;
        border: 1.5px solid #e4e8ef;
        border-radius: 8px;
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
        padding: 4px 11px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        font-family: 'DM Sans', sans-serif;
      }
      .ad-badge-green  { background: #f0fdf4; color: #16a34a; border: 1px solid #d1fae5; }
      .ad-badge-red    { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }
      .ad-badge-amber  { background: #fffbeb; color: #b45309; border: 1px solid #fef3c7; }
      .ad-badge-blue   { background: #eff6ff; color: #2563eb; border: 1px solid #dbeafe; }
      .ad-badge-slate  { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; }
      .ad-badge-indigo { background: #eef2ff; color: #4338ca; border: 1px solid #e0e7ff; }

      /* ── Legend dot ── */
      .ad-legend-dot {
        width: 12px;
        height: 12px;
        border-radius: 4px;
        flex-shrink: 0;
      }

      /* ── Occupancy micro-bar ── */
      .ad-occ-track {
        height: 3px;
        background: #f1f5f9;
        border-radius: 2px;
        overflow: hidden;
        width: 100%;
        margin-top: 6px;
      }
      .ad-occ-fill {
        height: 100%;
        border-radius: 2px;
        transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      }

      /* ── Mis Solicitudes Premium Redesign ── */
      .req-card {
        background: #ffffff;
        border: 1px solid #e4e8ef;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 4px 25px rgba(0,0,0,0.03);
        margin-bottom: 30px;
        animation: adSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }
      .req-card-header {
        padding: 24px 30px;
        background: #ffffff;
        border-bottom: 1px solid #f1f5f9;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .req-table {
        width: 100%;
        border-collapse: collapse;
      }
      .req-table th {
        padding: 14px 30px;
        text-align: left;
        font-size: 10px;
        font-weight: 800;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 1.2px;
        border-bottom: 1px solid #f1f5f9;
        background: #fafbfc;
      }
      .req-table td {
        padding: 20px 30px;
        border-bottom: 1px solid #f1f5f9;
        font-size: 13.5px;
        color: #334155;
        vertical-align: middle;
        font-family: 'DM Sans', sans-serif;
      }
      .req-table tr:last-child td {
        border-bottom: none;
      }
      .req-table tr:hover {
        background: #fafbfc;
      }
      .req-btn-withdraw {
        padding: 8px 18px;
        background: #fef2f2;
        color: #dc2626;
        border: 1px solid #fee2e2;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'DM Sans', sans-serif;
      }
      .req-btn-withdraw:hover {
        background: #dc2626;
        color: #ffffff;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(220,38,38,0.2);
        border-color: #dc2626;
      }
      .req-btn-cancel {
        padding: 8px 18px;
        background: #f8fafc;
        color: #64748b;
        border: 1px solid #e2e8f0;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'DM Sans', sans-serif;
      }
      .req-btn-cancel:hover {
        background: #f1f5f9;
        color: #334155;
        border-color: #cbd5e1;
        transform: translateY(-2px);
      }
      .req-section-badge {
        background: #f1f5f9;
        color: #475569;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 800;
        font-family: 'DM Sans', sans-serif;
      }
        border-radius: 4px;
        overflow: hidden;
        margin-top: 4px;
      }
      .ad-occ-fill {
        height: 100%;
        border-radius: 4px;
        animation: adExpandBar 0.8s ease both;
      }
    `}</style>

                  {/* ══════════════════════════════════════════════════
        HEADER BANNER
    ══════════════════════════════════════════════════ */}
                  <div style={{
                    background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 60%, #065f46 100%)',
                    borderRadius: '16px',
                    padding: '40px',
                    marginBottom: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '24px',
                    flexWrap: 'wrap',
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                    animation: 'adSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                  }}>
                    {/* Grid texture */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.5 }} />
                    {/* Glow accents */}
                    <div style={{ position: 'absolute', top: '-100px', right: '-50px', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '-80px', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    {/* Left: text */}
                    <div style={{ position: 'relative', zIndex: 2 }}>
                      <div style={{ display: 'inline-flex', padding: '6px 14px', background: 'rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px', fontSize: '10px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: '#6ee7b7', fontFamily: '"DM Sans", sans-serif', marginBottom: '16px', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }} />
                        {t.availableRooms.sectionLabel}
                      </div>
                      <h2 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.2' }}>
                        {t.availableRooms.title} <span style={{ fontStyle: 'italic', color: '#a7f3d0' }}>{t.availableRooms.titleItalic}</span>
                      </h2>
                      <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.65)', fontSize: '14px', fontFamily: '"DM Sans", sans-serif', maxWidth: '400px', lineHeight: '1.6' }}>
                        {t.availableRooms.subtitle}
                      </p>
                    </div>

                    {/* Right: date picker + mini stats */}
                    <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '20px' }}>
                      {/* Date picker */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255, 255, 255, 0.5)', fontFamily: '"DM Sans", sans-serif' }}>
                          {t.availableRooms.dateLabel}
                        </span>
                        <input
                          type="date"
                          className="ad-date-input"
                          style={{
                            padding: '10px 16px',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            borderRadius: '12px',
                            fontSize: '14px',
                            fontWeight: '600',
                            fontFamily: '"DM Sans", sans-serif',
                            color: '#ffffff',
                            background: 'rgba(255, 255, 255, 0.08)',
                            backdropFilter: 'blur(5px)',
                            outline: 'none',
                            cursor: 'pointer',
                            width: '180px',
                            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                          }}
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
                      <div style={{ display: 'flex', gap: '12px' }}>
                        {[
                          { label: t.availableRooms.totalRooms, value: listaAulas.length },
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
                          <div key={i} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '12px 20px', textAlign: 'center', minWidth: '85px', backdropFilter: 'blur(5px)' }}>
                            <div style={{ fontSize: '24px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '4px' }}>{stat.value}</div>
                            <div style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* ══════════════════════════════════════════════════
        LAYOUT: SIDEBAR (aula selector) + MAIN (schedule)
    ══════════════════════════════════════════════════ */}
                  <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', alignItems: 'flex-start', opacity: 0, animation: 'adSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards' }}>

                    {/* ────────────────────────
          LEFT: AULA SELECTOR
      ──────────────────────── */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#ffffff', padding: '24px', borderRadius: '16px', border: '1px solid #e4e8ef', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)' }}>
                      <p style={{ margin: '0 0 12px 0', fontSize: '11px', fontWeight: '800', letterSpacing: '2px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                        {t.availableRooms.selectRoom}
                      </p>

                      {listaAulas.length === 0 ? (
                        <div style={{ background: '#f8fafc', border: '1px dashed #ced4da', borderRadius: '12px', padding: '36px 20px', textAlign: 'center' }}>
                          <div style={{ width: '42px', height: '42px', borderRadius: '50%', border: '1px solid #e9ecef', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#ffffff' }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ced4da" strokeWidth="1.5">
                              <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                            </svg>
                          </div>
                          <p style={{ margin: 0, fontSize: '13px', color: '#6c757d', fontFamily: '"DM Sans", sans-serif', fontWeight: '500' }}>{t.availableRooms.noRooms}</p>
                        </div>
                      ) : (
                        listaAulas.map((aula, idx) => {
                          const horariosAula = generarHorarios(aula.id, fechaSeleccionada);
                          const hoyStr = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; })();
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
                                      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
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
                        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
                          <p style={{ margin: '0 0 12px 0', fontSize: '11px', fontWeight: '800', letterSpacing: '1.2px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.availableRooms.legend}</p>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            {[
                              { color: '#ffffff', border: '#e2e8f0', label: t.availableRooms.legendFree },
                              { color: '#059669', border: '#059669', label: t.availableRooms.legendSelected, text: '#ffffff' },
                              { color: '#fef2f2', border: '#fee2e2', label: t.availableRooms.legendOccupied, text: '#dc2626' },
                              { color: '#fffbeb', border: '#fef3c7', label: t.availableRooms.legendPending, text: '#d97706' },
                              { color: '#f1f5f9', border: '#e2e8f0', label: t.availableRooms.legendPast, opacity: 0.5 },
                            ].map(({ color, border, label, text, opacity }) => (
                              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: opacity || 1 }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '4px', background: color, border: `1px solid ${border}`, flexShrink: 0 }} />
                                <span style={{ fontSize: '11px', color: text || '#64748b', fontFamily: '"DM Sans", sans-serif', fontWeight: '600' }}>{label}</span>
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
                          borderRadius: '16px',
                          padding: '100px 40px',
                          textAlign: 'center',
                          opacity: 0,
                          animation: 'adFadeIn 0.6s ease 0.2s forwards',
                          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <div style={{ width: '72px', height: '72px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)', boxShadow: '0 8px 16px rgba(0,0,0,0.03)' }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18M9 21V10" />
                            </svg>
                          </div>
                          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: '400', color: '#0f172a', fontFamily: '"DM Serif Display", serif' }}>
                            {t.availableRooms.selectRoomPrompt}
                          </h3>
                          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', maxWidth: '300px', lineHeight: '1.6' }}>
                            {t.availableRooms.selectRoomHint}
                          </p>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                          {/* ── Aula header card ── */}
                          <div style={{
                            background: '#ffffff',
                            border: '1px solid #e4e8ef',
                            borderRadius: '16px',
                            padding: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '20px',
                            flexWrap: 'wrap',
                            animation: 'adSlideRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <div style={{
                                width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
                                background: aulaActual.estado === 'Mantenimiento' ? '#fffbeb' : '#f0fdf4',
                                border: `1px solid ${aulaActual.estado === 'Mantenimiento' ? '#fde68a' : '#d1fae5'}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 2px 10px rgba(0, 163, 59, 0.05)'
                              }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={aulaActual.estado === 'Mantenimiento' ? '#b45309' : '#059669'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
                                </svg>
                              </div>
                              <div>
                                <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '400', color: '#0f172a', fontFamily: '"DM Serif Display", serif' }}>
                                  {aulaActual.nombre}
                                </h1>
                                <div style={{ fontSize: '12.5px', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', marginTop: '4px', fontWeight: '500' }}>
                                  {t.availableRooms.people} {aulaActual.capacidad} · {aulaActual.equipoDisponible || t.availableRooms.noSpecialEquip}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>
                                  {new Date(fechaSeleccionada + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </div>
                                <div style={{ fontSize: '11px', color: '#059669', fontFamily: '"DM Sans", sans-serif', marginTop: '2px', fontWeight: '600' }}>
                                  {generarHorarios(aulaActual.id, fechaSeleccionada).filter(h => !h.ocupado && !h.pasado && !h.conSolicitud).length} bloques libres
                                </div>
                              </div>
                              <div className={`ad-badge ${aulaActual.estado === 'Mantenimiento' ? 'ad-badge-amber'
                                : generarHorarios(aulaActual.id, fechaSeleccionada).some(h => !h.ocupado && !h.pasado) ? 'ad-badge-green'
                                  : 'ad-badge-red'
                                }`} style={{ padding: '6px 14px', borderRadius: '8px' }}>
                                {aulaActual.estado === 'Mantenimiento' ? t.availableRooms.statusMaintenance
                                  : generarHorarios(aulaActual.id, fechaSeleccionada).some(h => !h.ocupado && !h.pasado) ? t.availableRooms.statusAvailable
                                    : t.availableRooms.statusNoSlots}
                              </div>
                            </div>
                          </div>

                          {/* ── Time slots grid container ── */}
                          <div style={{
                            background: '#ffffff',
                            border: '1px solid #e4e8ef',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            animation: 'adSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.06s forwards',
                            opacity: 0,
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
                          }}>
                            {/* Slots header */}
                            <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1f5f9', background: '#fafbfc', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>
                                {t.availableRooms.slotsHeader}
                              </span>
                              {horarioSeleccionado && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#f0fdf4', padding: '4px 12px', borderRadius: '20px', border: '1px solid #d1fae5' }}>
                                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669', animation: 'adPulse 1.5s ease infinite' }} />
                                  <span style={{ fontSize: '11px', fontWeight: '700', color: '#059669', fontFamily: '"DM Sans", sans-serif' }}>
                                    {t.availableRooms.slotSelected.replace('{inicio}', horarioSeleccionado?.horaInicio).replace('{fin}', horarioSeleccionado?.horaFin)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Slots */}
                            <div style={{ padding: '24px' }}>
                              {/* Banner: fecha pasada */}
                              {(() => {
                                const hoyStr = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })();
                                if (fechaSeleccionada >= hoyStr) return null;
                                return (
                                  <div style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: '12px 16px', marginBottom: '20px',
                                    background: '#fff1f2', border: '1px solid #fecaca', borderRadius: '12px',
                                  }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#991b1b', fontFamily: '"DM Sans", sans-serif' }}>
                                      {t.availableRooms.pastDateWarning}
                                    </span>
                                  </div>
                                );
                              })()}

                              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                                {(() => {
                                  const hoyStr = (() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })();
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
                                                <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
                                              </svg>
                                            ) : isSelected ? (
                                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                              </svg>
                                            ) : (
                                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
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
                            <div className="ad-detail-panel" style={{ border: 'none', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', animation: 'adScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                              {/* Panel header */}
                              <div style={{ padding: '18px 24px', background: '#ffffff', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef2f2', border: '1px solid #fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0f172a', fontFamily: '"DM Sans", sans-serif' }}>Bloque Reservado</h3>
                                    <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif', marginTop: '2px' }}>
                                      {reservaDetalle.horaInicio} – {reservaDetalle.horaFin}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => setReservaDetalle(null)}
                                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#94a3b8', cursor: 'pointer', padding: '6px', borderRadius: '8px', fontSize: '14px', transition: 'all 0.2s' }}
                                >
                                  ✕
                                </button>
                              </div>

                              {/* Panel body */}
                              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
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
                                  <div style={{ gridColumn: '1 / -1', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                                    <p style={{ margin: '0 0 8px', fontSize: '10px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.availableRooms.description}</p>
                                    <div style={{ fontSize: '13px', color: '#475569', fontFamily: '"DM Sans", sans-serif', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                                      {reservaDetalle.descripcion}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* ── RESERVATION FORM ── */}
                          {horarioSeleccionado && !reservaDetalle && (
                            <div
                              className="ad-detail-panel"
                              style={{ border: 'none', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', animation: 'adScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                            >
                              {/* Form header */}
                              <div style={{
                                padding: '18px 24px',
                                background: '#ffffff',
                                borderBottom: '1px solid #f1f5f9',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                  <div style={{
                                    width: '40px', height: '40px', borderRadius: '10px',
                                    background: usuarioActivo.rol === 'alumno' ? '#eff6ff' : '#f0fdf4',
                                    border: `1px solid ${usuarioActivo.rol === 'alumno' ? '#dbeafe' : '#d1fae5'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                                  }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={usuarioActivo.rol === 'alumno' ? '#2563eb' : '#059669'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      {usuarioActivo.rol === 'alumno'
                                        ? <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        : <polyline points="20 6 9 17 4 12" />
                                      }
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '800', color: '#0f172a', fontFamily: '"DM Sans", sans-serif' }}>
                                      {usuarioActivo?.rol === 'alumno' ? 'Enviar Solicitud de Reserva' : 'Confirmar Reserva Directa'}
                                    </h3>
                                    <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif', marginTop: '2px' }}>
                                      {aulaActual.nombre} · {horarioSeleccionado.horaInicio}—{horarioSeleccionado.horaFin}
                                    </div>
                                  </div>
                                </div>
                                <button
                                  onClick={() => { setHorarioSeleccionado(null); setShowSolicitudDesdeAula(false); }}
                                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#94a3b8', cursor: 'pointer', padding: '6px', borderRadius: '8px', fontSize: '14px' }}
                                >
                                  ✕
                                </button>
                              </div>

                              {/* Booking summary strip */}
                              <div style={{
                                padding: '16px 24px',
                                borderBottom: '1px solid #f1f5f9',
                                background: '#fafbfc',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                                gap: '16px',
                              }}>
                                {[
                                  { label: t.availableRooms.room, value: aulaActual.nombre },
                                  { label: t.availableRooms.time, value: `${horarioSeleccionado.horaInicio}—${horarioSeleccionado.horaFin}` },
                                  { label: t.availableRooms.mode, value: usuarioActivo.rol === 'alumno' ? t.availableRooms.modeRequest : t.availableRooms.modeDirectReserve },
                                ].map(({ label, value }) => (
                                  <div key={label}>
                                    <div style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif', marginBottom: '4px' }}>
                                      {label}
                                    </div>
                                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', fontFamily: '"DM Sans", sans-serif' }}>
                                      {value}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Form body */}
                              <div style={{ padding: '24px' }}>
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
                                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
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
              )
            }
            {/* ============ VISTA INVENTARIO DE MATERIALES ============ */}
            {
              (permisos.verInventario || permisos.solicitarEquipos) && vistaActual === 'inventario' && (
                <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
                  {(() => {
                    const rolNormalizado = usuarioActivo?.rol?.toLowerCase() || 'alumno';
                    return (
                      <>
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
                      padding: 11px 14px;
                      border: 1.5px solid #e4e8ef;
                      border-radius: 8px;
                      font-size: 13px;
                      font-family: 'DM Sans', sans-serif;
                      color: #1e293b;
                      background: #fafbfc;
                      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
                      outline: none;
                      box-sizing: border-box;
                    }
                    .inv-input:focus {
                      border-color: #059669;
                      box-shadow: 0 0 0 4px rgba(5,150,105,0.08);
                      background: #ffffff;
                    }
                    .inv-input::placeholder { color: #b8c0cc; }

                    .inv-btn-primary {
                      padding: 12px 28px;
                      background: #0f172a;
                      color: white;
                      border: none;
                      border-radius: 10px;
                      font-size: 14px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      letter-spacing: 0.3px;
                      transition: all 0.2s;
                      white-space: nowrap;
                    }
                    .inv-btn-primary:hover {
                      background: #1e293b;
                      transform: translateY(-2px);
                      box-shadow: 0 10px 20px rgba(15,23,42,0.2);
                    }

                    .inv-btn-green {
                      padding: 12px 28px;
                      background: #059669;
                      color: white;
                      border: none;
                      border-radius: 10px;
                      font-size: 14px;
                      font-weight: 600;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      transition: all 0.2s;
                      white-space: nowrap;
                      letter-spacing: 0.2px;
                    }
                    .inv-btn-green:hover {
                      background: #047857;
                      transform: translateY(-2px);
                      box-shadow: 0 10px 20px rgba(5,150,105,0.25);
                    }

                    .inv-btn-outline {
                      padding: 8px 16px;
                      background: transparent;
                      border: 1.5px solid #e4e8ef;
                      border-radius: 8px;
                      font-size: 12px;
                      font-weight: 700;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      color: #64748b;
                      transition: all 0.2s;
                    }
                    .inv-btn-outline:hover {
                      border-color: #94a3b8;
                      background: #f8fafc;
                      color: #334155;
                    }

                    .inv-btn-danger-outline {
                      padding: 8px 16px;
                      background: #fef2f2;
                      border: 1px solid #fee2e2;
                      border-radius: 8px;
                      font-size: 11px;
                      font-weight: 700;
                      font-family: 'DM Sans', sans-serif;
                      cursor: pointer;
                      color: #dc2626;
                      transition: all 0.2s;
                    }
                    .inv-btn-danger-outline:hover {
                      background: #dc2626;
                      color: #ffffff;
                      border-color: #dc2626;
                      box-shadow: 0 5px 15px rgba(220,38,38,0.2);
                    }

                    .inv-table {
                      width: 100%;
                      border-collapse: collapse;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .inv-table thead tr {
                      background: #fafbfc;
                      border-bottom: 2px solid #f1f5f9;
                    }
                    .inv-table thead th {
                      padding: 16px 24px;
                      text-align: left;
                      font-size: 10px;
                      font-weight: 800;
                      letter-spacing: 1.5px;
                      text-transform: uppercase;
                      color: #94a3b8;
                    }
                    .inv-table tbody tr {
                      border-bottom: 1px solid #f1f5f9;
                      transition: all 0.2s;
                      opacity: 0;
                      animation: invFadeRow 0.3s ease forwards;
                    }
                    .inv-table tbody tr:last-child { border-bottom: none; }
                    .inv-table tbody tr:hover { background: #fafbfc; }
                    .inv-table td {
                      padding: 18px 24px;
                      font-size: 14px;
                      color: #334155;
                      vertical-align: middle;
                    }

                    .inv-stock-track {
                      height: 5px;
                      background: #f1f5f9;
                      border-radius: 3px;
                      overflow: hidden;
                      margin-top: 8px;
                      width: 100px;
                    }
                    .inv-stock-fill {
                      height: 100%;
                      border-radius: 3px;
                      background: #059669;
                      width: 0;
                      transition: width 1s cubic-bezier(0.16, 1, 0.3, 1);
                    }

                    .inv-badge-loan {
                      display: inline-flex;
                      align-items: center;
                      padding: 4px 12px;
                      border-radius: 20px;
                      font-size: 11px;
                      font-weight: 800;
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                      font-family: 'DM Sans', sans-serif;
                    }
                    .inv-badge-green    { background: #f0fdf4; color: #16a34a; border: 1px solid #d1fae5; }
                    .inv-badge-red      { background: #fef2f2; color: #dc2626; border: 1px solid #fee2e2; }
                    .inv-badge-amber    { background: #fffbeb; color: #b45309; border: 1px solid #fef3c7; }
                    .inv-badge-blue     { background: #eff6ff; color: #2563eb; border: 1px solid #dbeafe; }
                    .inv-badge-gray     { background: #f8fafc; color: #94a3b8; border: 1px solid #e2e8f0; }

                    .inv-card {
                      background: #ffffff;
                      border: 1px solid #e4e8ef;
                      border-radius: 16px;
                      overflow: hidden;
                      box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                      opacity: 0;
                      animation: invSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                    .inv-card-header {
                      padding: 24px 30px;
                      border-bottom: 1px solid #f1f5f9;
                      display: flex;
                      align-items: center;
                      gap: 15px;
                    }

                    .inv-qty-input {
                      width: 70px;
                      padding: 8px 10px;
                      border: 1.5px solid #e4e8ef;
                      border-radius: 8px;
                      font-size: 14px;
                      font-weight: 700;
                      font-family: 'DM Sans', sans-serif;
                      text-align: center;
                      outline: none;
                      transition: border-color 0.2s;
                      background: #fafbfc;
                    }
                    .inv-qty-input:focus { border-color: #059669; background: #fff; }
                  `}</style>

                        {/* ── HEADER BANNER ── */}
                        <div style={{
                          background: 'linear-gradient(135deg, #0f172a 0%, #064e3b 100%)',
                          borderRadius: '24px',
                          padding: '40px 48px',
                          marginBottom: '32px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '24px',
                          flexWrap: 'wrap',
                          position: 'relative',
                          overflow: 'hidden',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                        }}>
                          {/* Decorative elements */}
                          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                          <div style={{ position: 'absolute', top: '-60px', right: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

                          <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: 'rgba(255,255,255,0.1)', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
                              <span style={{ fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#ffffff', fontFamily: '"DM Sans", sans-serif' }}>Recursos Materiales</span>
                            </div>
                            <h1 style={{ margin: '0 0 12px 0', fontSize: '32px', fontWeight: '400', color: '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: '1.2' }}>
                              Inventario de <span style={{ fontStyle: 'italic', color: '#34d399' }}>Equipos y Material</span>
                            </h1>
                            <p style={{ margin: 0, color: 'rgba(255,255,255,0.5)', fontSize: '15px', fontFamily: '"DM Sans", sans-serif', maxWidth: '500px' }}>
                              Control centralizado de tecnología educativa. Consulta disponibilidad y solicita préstamos para tus actividades.
                            </p>
                          </div>

                          {/* Stats strip */}
                          <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {[
                              { label: t.inventoryUser.equipmentTypes, value: listaEquipos.length },
                              { label: t.inventoryUser.totalStock, value: listaEquipos.reduce((t, eq) => t + (Number(eq.cantidad) || 0), 0) },
                              { label: t.inventoryUser.activeLoans, value: listaSolicitudesMaterial.filter(s => (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto).length + listaReservasMaterial.filter(r => (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto).length, color: '#60a5fa' },
                              { label: t.inventoryUser.noStock, value: listaEquipos.filter(eq => (Number(eq.cantidad) || 0) === 0).length, color: listaEquipos.some(eq => (Number(eq.cantidad) || 0) === 0) ? '#fca5a5' : 'rgba(255,255,255,0.3)' },
                            ].map((s, i) => (
                              <div key={i} style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '16px',
                                padding: '12px 20px',
                                textAlign: 'center',
                                minWidth: '90px',
                                backdropFilter: 'blur(10px)',
                                flex: '1 1 auto'
                              }}>
                                <div style={{ fontSize: '24px', color: s.color || '#ffffff', fontFamily: '"DM Serif Display", serif', lineHeight: 1, marginBottom: '2px' }}>{s.value}</div>
                                <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', fontFamily: '"DM Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>{s.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* ── ADMIN ONLY: FORM TO ADD EQUIPMENT ── */}
                        {permisos.gestionEquipos && (
                          <div className="inv-card" style={{ marginBottom: '24px', border: '1px solid #d1fae5' }}>
                            <div className="inv-card-header" style={{ background: '#f0fdf4' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#ffffff', border: '1px solid #d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                              </div>
                              <div>
                                <div style={{ fontSize: '15px', fontWeight: '800', color: '#064e3b', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.registerEquipment}</div>
                                <div style={{ fontSize: '12px', color: '#059669', opacity: 0.7, fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.registerEquipmentDesc}</div>
                              </div>
                              <button
                                onClick={() => setShowFormReserva(!showFormReserva)}
                                className="inv-btn-outline"
                                style={{ marginLeft: 'auto', background: showFormReserva ? '#fff' : '#059669', color: showFormReserva ? '#059669' : '#fff', borderColor: '#059669' }}
                              >
                                {showFormReserva ? t.inventoryUser.cancelBtn : t.inventoryUser.addEquipmentBtn}
                              </button>
                            </div>

                            {showFormReserva && (
                              <div style={{ padding: '30px' }}>
                                <form onSubmit={guardarNuevoEquipo}>
                                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 140px 160px', gap: '16px', alignItems: 'flex-end' }}>
                                    <div>
                                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.equipmentName}</label>
                                      <input name="nombre" className="inv-input" placeholder={t.inventoryUser.equipmentNamePlaceholder} required />
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.category}</label>
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
                                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.quantity}</label>
                                      <input name="cantidad" type="number" min="1" className="inv-input" placeholder="1" defaultValue="1" />
                                    </div>
                                    <div>
                                      <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.status}</label>
                                      <select name="estado" className="inv-input" style={{ cursor: 'pointer' }}>
                                        <option value="Disponible">{t.inventoryUser.available}</option>
                                        <option value="Mantenimiento">{t.inventoryUser.maintenance}</option>
                                        <option value="Inactivo">{t.inventoryUser.inactive}</option>
                                      </select>
                                    </div>
                                  </div>
                                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button type="submit" className="inv-btn-green">{t.inventoryUser.registerBtn}</button>
                                  </div>
                                </form>
                              </div>
                            )}
                          </div>
                        )}

                        {/* ── STOCK TABLE CARD ── */}
                        <div className="inv-card" style={{ marginBottom: '32px' }}>
                          <div className="inv-card-header" style={{ justifyContent: 'space-between', padding: '24px 30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                </svg>
                              </div>
                              <div>
                                <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', fontFamily: '"DM Sans", sans-serif' }}>{t.inventoryUser.catalogTitle}</div>
                                <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>Listado de recursos tecnológicos disponibles para préstamo.</div>
                              </div>
                            </div>

                            {/* Category Quick Filters */}
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {['Todo', 'Disponible', 'Mantenimiento'].map(cat => (
                                <div
                                  key={cat}
                                  onClick={() => setFiltroInventario(cat)}
                                  style={{
                                    padding: '6px 14px',
                                    borderRadius: '30px',
                                    background: filtroInventario === cat ? '#0f172a' : '#f1f5f9',
                                    color: filtroInventario === cat ? '#fff' : '#64748b',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease',
                                    border: filtroInventario === cat ? '1px solid #0f172a' : '1px solid transparent',
                                    transform: filtroInventario === cat ? 'scale(1.05)' : 'scale(1)'
                                  }}
                                >
                                  {cat === 'Todo' ? (lang === 'es' ? 'Todo' : 'All')
                                    : cat === 'Disponible' ? (lang === 'es' ? 'Disponible' : 'Available')
                                      : (lang === 'es' ? 'Mantenimiento' : 'Maintenance')}
                                </div>
                              ))}
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
                                {(() => {
                                  const equiposFiltrados = listaEquipos.filter(eq => {
                                    if (filtroInventario === 'Todo') return true;
                                    if (filtroInventario === 'Disponible') return eq.estado === 'Disponible' && (Number(eq.cantidad) || 0) > 0;
                                    if (filtroInventario === 'Mantenimiento') return eq.estado === 'Mantenimiento';
                                    return true;
                                  });

                                  if (equiposFiltrados.length === 0) {
                                    return (
                                      <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '80px', color: '#94a3b8' }}>
                                          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f8fafc', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="2">
                                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                            </svg>
                                          </div>
                                          <div style={{ fontSize: '14px', fontWeight: '600' }}>
                                            {filtroInventario === 'Todo'
                                              ? (t.inventoryUser.noEquipmentRegistered || 'No hay equipos registrados')
                                              : (lang === 'es'
                                                ? `No hay equipos con estado "${filtroInventario}"`
                                                : `No equipment with status "${filtroInventario}"`)}
                                          </div>
                                          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>
                                            {filtroInventario !== 'Todo'
                                              ? (lang === 'es'
                                                ? 'Prueba cambiando el filtro a "Todo" para ver todos los equipos.'
                                                : 'Try switching the filter to "All" to see all equipment.')
                                              : (lang === 'es'
                                                ? 'El inventario se encuentra actualmente vacío.'
                                                : 'The inventory is currently empty.')}
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  }

                                  return equiposFiltrados.map((eq, idx) => {
                                    const sinStock = (Number(eq.cantidad) || 0) === 0;
                                    const enMantenimiento = eq.estado === 'Mantenimiento';
                                    const maxRef = Math.max(...listaEquipos.map(e => Number(e.cantidad) || 0), 1);
                                    const pct = Math.min(((Number(eq.cantidad) || 0) / maxRef) * 100, 100);

                                    return (
                                      <tr key={eq.id} style={{ animationDelay: `${0.1 + idx * 0.05}s` }}>
                                        {/* Equipment Info */}
                                        <td>
                                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: sinStock ? '#fef2f2' : '#f0fdf4', border: `1px solid ${sinStock ? '#fee2e2' : '#d1fae5'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sinStock ? '#dc2626' : '#059669'} strokeWidth="2.5">
                                                <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
                                              </svg>
                                            </div>
                                            <div>
                                              <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{eq.nombre}</div>
                                              <div style={{ fontSize: '11px', color: '#94a3b8' }}>Ref: {eq.id.slice(0, 8).toUpperCase()}</div>
                                            </div>
                                          </div>
                                        </td>

                                        {/* Category */}
                                        <td>
                                          <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '6px' }}>
                                            {eq.categoria || 'General'}
                                          </span>
                                        </td>

                                        {/* Stock Levels */}
                                        <td>
                                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                            {rolNormalizado === 'admin' ? (
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                                                  onKeyDown={(e) => { if (e.key === 'Enter') e.target.blur(); }}
                                                />
                                                <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>uds.</span>
                                              </div>
                                            ) : (
                                              <>
                                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                                                  <span style={{ fontSize: '24px', fontWeight: '400', fontFamily: '"DM Serif Display", serif', color: sinStock ? '#dc2626' : '#0f172a', lineHeight: 1 }}>{eq.cantidad || 0}</span>
                                                  <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>unidades</span>
                                                </div>
                                                <div className="inv-stock-track">
                                                  <div className="inv-stock-fill" style={{ width: `${pct}%`, background: sinStock ? '#dc2626' : enMantenimiento ? '#d97706' : '#059669' }} />
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </td>

                                        {/* Availability Badge / Admin Status Changer */}
                                        <td>
                                          {rolNormalizado === 'admin' ? (
                                            <select
                                              value={eq.estado || 'Disponible'}
                                              onChange={(e) => actualizarEstadoEquipo(eq.id, e.target.value)}
                                              style={{
                                                padding: '6px 10px',
                                                borderRadius: '8px',
                                                border: `1.5px solid ${eq.estado === 'Mantenimiento' ? '#fde68a' : eq.estado === 'Inactivo' ? '#fecaca' : '#d1fae5'}`,
                                                background: eq.estado === 'Mantenimiento' ? '#fffbeb' : eq.estado === 'Inactivo' ? '#fef2f2' : '#f0fdf4',
                                                color: eq.estado === 'Mantenimiento' ? '#b45309' : eq.estado === 'Inactivo' ? '#dc2626' : '#059669',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                                cursor: 'pointer',
                                                fontFamily: '"DM Sans", sans-serif',
                                                outline: 'none',
                                                transition: 'all 0.2s ease'
                                              }}
                                            >
                                              <option value="Disponible">{lang === 'es' ? '✅ Disponible' : '✅ Available'}</option>
                                              <option value="Mantenimiento">{lang === 'es' ? '🔧 Mantenimiento' : '🔧 Maintenance'}</option>
                                              <option value="Inactivo">{lang === 'es' ? '❌ Inactivo' : '❌ Inactive'}</option>
                                            </select>
                                          ) : (
                                            <span className={`inv-badge-loan ${sinStock ? 'inv-badge-red' : enMantenimiento ? 'inv-badge-amber' : 'inv-badge-green'}`}>
                                              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', marginRight: '8px', opacity: 0.8 }} />
                                              {sinStock ? t.inventoryUser.noStock : enMantenimiento ? t.inventoryUser.maintenance : t.inventoryUser.available}
                                            </span>
                                          )}
                                        </td>

                                        {/* Admin Actions */}
                                        {rolNormalizado === 'admin' && (
                                          <td style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
                                            {eq.registradoPor?.split('@')[0] || 'Desconocido'}
                                          </td>
                                        )}
                                        {rolNormalizado === 'admin' && (
                                          <td style={{ textAlign: 'right' }}>
                                            <button className="inv-btn-danger-outline" onClick={() => eliminarEquipo(eq.id)}>
                                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                                                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                              </svg>
                                              {t.inventoryUser.deleteBtn}
                                            </button>
                                          </td>
                                        )}
                                      </tr>
                                    );
                                  })
                                })()}
                              </tbody>
                            </table>
                          </div >

                          {
                            listaEquipos.length > 0 && (
                              <div style={{ padding: '16px 30px', background: '#fafbfc', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>
                                  {(() => {
                                    const equiposFiltrados = listaEquipos.filter(eq => {
                                      if (filtroInventario === 'Todo') return true;
                                      if (filtroInventario === 'Disponible') return eq.estado === 'Disponible' && (Number(eq.cantidad) || 0) > 0;
                                      if (filtroInventario === 'Mantenimiento') return eq.estado === 'Mantenimiento';
                                      return true;
                                    });
                                    return `${equiposFiltrados.length} ${t.inventoryUser.typesLabel || 'tipo(s)'} · ${equiposFiltrados.reduce((acc, eq) => acc + (Number(eq.cantidad) || 0), 0)} ${t.inventoryUser.unitsLabel || 'unidades totales'}`;
                                  })()}
                                </span>
                                {rolNormalizado === 'admin' && (
                                  <span style={{ fontSize: '11px', color: '#94a3b8', fontStyle: 'italic' }}>
                                    Tip: Registra cambios editando la cantidad directamente.
                                  </span>
                                )}
                              </div>
                            )
                          }
                        </div>

                        {/* ── RESERVA DE MATERIAL (Solicitud + Vista Pública) ── */}
                        <div className="inv-card" style={{ marginBottom: '32px' }}>
                          <div className="inv-card-header" style={{ justifyContent: 'space-between', padding: '24px 30px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                              </div>
                              <div>
                                <div style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', fontFamily: '"DM Sans", sans-serif' }}>
                                  {lang === 'es' ? 'Reservas de Material' : 'Material Reservations'}
                                </div>
                                <div style={{ fontSize: '12px', color: '#64748b', fontFamily: '"DM Sans", sans-serif' }}>
                                  {lang === 'es' ? 'Solicita un préstamo de equipo. El administrador aprobará tu solicitud.' : 'Request an equipment loan. The admin will approve your request.'}
                                </div>
                              </div>
                            </div>
                            {permisos.solicitarEquipos && (
                              <button
                                onClick={() => setShowFormReservaMaterial(!showFormReservaMaterial)}
                                style={{
                                  padding: '8px 18px', borderRadius: '10px',
                                  background: showFormReservaMaterial ? '#fee2e2' : 'linear-gradient(135deg, #003087, #0052cc)',
                                  color: showFormReservaMaterial ? '#dc2626' : '#fff',
                                  border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer',
                                  fontFamily: '"DM Sans", sans-serif', transition: 'all 0.2s ease'
                                }}
                              >
                                {showFormReservaMaterial
                                  ? (lang === 'es' ? '✕ Cancelar' : '✕ Cancel')
                                  : (lang === 'es' ? '+ Solicitar Reserva' : '+ Request Reservation')}
                              </button>
                            )}
                          </div>

                          {/* New Reservation Form */}
                          {showFormReservaMaterial && (
                            <div style={{ padding: '0 30px 24px' }}>
                              <form onSubmit={guardarReservaMaterial} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '24px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                  <div style={{ gridColumn: '1 / -1' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8' }}>
                                      {lang === 'es' ? 'Equipo / Material' : 'Equipment / Material'}
                                    </label>
                                    <select name="equipoId" className="inv-input" required style={{ cursor: 'pointer' }}>
                                      <option value="">{lang === 'es' ? 'Seleccionar equipo...' : 'Select equipment...'}</option>
                                      {listaEquipos
                                        .filter(eq => eq.estado === 'Disponible' && (Number(eq.cantidad) || 0) > 0)
                                        .map(eq => (
                                          <option key={eq.id} value={eq.id}>
                                            {eq.nombre} ({eq.cantidad} {lang === 'es' ? 'disponibles' : 'available'})
                                          </option>
                                        ))}
                                    </select>
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8' }}>
                                      {lang === 'es' ? 'Fecha y Hora de Préstamo' : 'Loan Date & Time'}
                                    </label>
                                    <input
                                      name="fechaInicio"
                                      type="datetime-local"
                                      className="inv-input"
                                      required
                                      min={obtenerFechaLocal() + "T00:00"}
                                      value={fechaMaterialSeleccionada}
                                      onChange={(e) => setFechaMaterialSeleccionada(e.target.value)}
                                    />
                                  </div>
                                  <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8' }}>
                                      {lang === 'es' ? 'Fecha y Hora de Devolución' : 'Return Date & Time'}
                                    </label>
                                    <input
                                      name="fechaFin"
                                      type="datetime-local"
                                      className="inv-input"
                                      required
                                      min={fechaMaterialSeleccionada || obtenerFechaLocal() + "T00:00"}
                                    />
                                  </div>
                                </div>
                                <div style={{ marginBottom: '16px' }}>
                                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', color: '#94a3b8' }}>
                                    {lang === 'es' ? 'Motivo / Actividad' : 'Reason / Activity'}
                                  </label>
                                  <input
                                    name="motivo"
                                    className="inv-input"
                                    placeholder={lang === 'es' ? 'Ej: Proyecto de clase, grabación, práctica...' : 'Ex: Class project, recording, practice...'}
                                    style={{ width: '100%' }}
                                  />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
                                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                                    {lang === 'es' ? 'Tu solicitud será revisada por el administrador.' : 'Your request will be reviewed by the admin.'}
                                  </span>
                                  <button type="submit" className="inv-btn-green" style={{ padding: '10px 24px' }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: '6px' }}>
                                      <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4z" />
                                    </svg>
                                    {lang === 'es' ? 'Enviar Solicitud' : 'Send Request'}
                                  </button>
                                </div>
                              </form>
                            </div>
                          )}

                          {/* All Reservations (visible to everyone) */}
                          <div style={{ padding: '0 30px 24px' }}>
                            {(() => {
                              const todasReservas = listaReservasMaterial.filter(r => r.estado !== 'Rechazada');
                              const pendientes = todasReservas.filter(r => r.estado === 'Pendiente');
                              const aprobadas = todasReservas.filter(r => r.estado === 'Aprobada' && new Date(r.fechaFin) >= new Date(obtenerFechaLocal()));
                              const pasadas = todasReservas.filter(r => r.estado === 'Aprobada' && new Date(r.fechaFin) < new Date(obtenerFechaLocal()));

                              if (todasReservas.length === 0) {
                                return (
                                  <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" strokeWidth="1.5" style={{ marginBottom: '12px' }}>
                                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <div style={{ fontSize: '13px', fontWeight: '600' }}>
                                      {lang === 'es' ? 'No hay reservas de material registradas' : 'No material reservations registered'}
                                    </div>
                                    <div style={{ fontSize: '11px', marginTop: '4px' }}>
                                      {lang === 'es' ? 'Haz click en "Solicitar Reserva" para reservar equipo.' : 'Click "Request Reservation" to reserve equipment.'}
                                    </div>
                                  </div>
                                );
                              }

                              return (
                                <>
                                  {/* PENDING REQUESTS */}
                                  {pendientes.length > 0 && (
                                    <>
                                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#d97706', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d97706', animation: 'pulse 2s infinite' }} />
                                        {lang === 'es' ? `Solicitudes Pendientes (${pendientes.length})` : `Pending Requests (${pendientes.length})`}
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                                        {pendientes.map(r => {
                                          const dias = Math.ceil((new Date(r.fechaFin) - new Date(r.fechaInicio)) / (1000 * 60 * 60 * 24)) + 1;
                                          const esMio = r.reservadoPor === usuarioActivo?.email;
                                          return (
                                            <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '12px' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                                </div>
                                                <div>
                                                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>{r.equipoNombre}</div>
                                                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                                    <span style={{ fontWeight: '700', color: '#003087' }}>{r.nombreReservador}</span>
                                                    {' · '}{r.fechaInicio} → {r.fechaFin}
                                                    <span style={{ marginLeft: '8px', padding: '2px 8px', background: '#d97706', color: '#fff', borderRadius: '10px', fontSize: '10px', fontWeight: '700' }}>
                                                      {dias} {dias === 1 ? (lang === 'es' ? 'día' : 'day') : (lang === 'es' ? 'días' : 'days')}
                                                    </span>
                                                  </div>
                                                  {r.motivo && <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px', fontStyle: 'italic' }}>"{r.motivo}"</div>}
                                                </div>
                                              </div>
                                              <div style={{ display: 'flex', gap: '6px' }}>
                                                {rolNormalizado === 'admin' ? (
                                                  <>
                                                    <button onClick={() => aprobarReservaMaterial(r.id)} style={{ padding: '6px 14px', borderRadius: '8px', background: '#f0fdf4', border: '1px solid #d1fae5', color: '#059669', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif' }}>
                                                      ✅ {lang === 'es' ? 'Aprobar' : 'Approve'}
                                                    </button>
                                                    <button onClick={() => rechazarReservaMaterial(r.id)} style={{ padding: '6px 14px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif' }}>
                                                      ❌ {lang === 'es' ? 'Rechazar' : 'Reject'}
                                                    </button>
                                                  </>
                                                ) : esMio ? (
                                                  <button onClick={() => cancelarReservaMaterial(r.id)} style={{ padding: '6px 14px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif' }}>
                                                    {lang === 'es' ? 'Cancelar' : 'Cancel'}
                                                  </button>
                                                ) : (
                                                  <span style={{ fontSize: '10px', padding: '4px 10px', background: '#fef3c7', color: '#d97706', borderRadius: '8px', fontWeight: '700' }}>⏳ {lang === 'es' ? 'Pendiente' : 'Pending'}</span>
                                                )}
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}

                                  {/* APPROVED / ACTIVE RESERVATIONS */}
                                  {aprobadas.length > 0 && (
                                    <>
                                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} />
                                        {lang === 'es' ? `Material Reservado Actualmente (${aprobadas.length})` : `Currently Reserved Materials (${aprobadas.length})`}
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                                        {aprobadas.map(r => {
                                          const dias = Math.ceil((new Date(r.fechaFin) - new Date(r.fechaInicio)) / (1000 * 60 * 60 * 24)) + 1;
                                          const esMio = r.reservadoPor === usuarioActivo?.email;
                                          return (
                                            <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#f0fdf4', border: '1px solid #d1fae5', borderRadius: '12px' }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                                </div>
                                                <div>
                                                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#0f172a' }}>{r.equipoNombre}</div>
                                                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                                                    <span style={{ fontWeight: '700', color: '#003087' }}>{r.nombreReservador}</span>
                                                    {' · '}{r.fechaInicio} → {r.fechaFin}
                                                    <span style={{ marginLeft: '8px', padding: '2px 8px', background: '#003087', color: '#fff', borderRadius: '10px', fontSize: '10px', fontWeight: '700' }}>
                                                      {dias} {dias === 1 ? (lang === 'es' ? 'día' : 'day') : (lang === 'es' ? 'días' : 'days')}
                                                    </span>
                                                  </div>
                                                  {r.motivo && <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px', fontStyle: 'italic' }}>"{r.motivo}"</div>}
                                                </div>
                                              </div>
                                              {rolNormalizado === 'admin' && (
                                                <button onClick={() => cancelarReservaMaterial(r.id)} style={{ padding: '6px 14px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                                  {lang === 'es' ? 'Cancelar' : 'Cancel'}
                                                </button>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}

                                  {/* PAST RESERVATIONS */}
                                  {pasadas.length > 0 && (
                                    <>
                                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                                        {lang === 'es' ? `Historial (${pasadas.length})` : `History (${pasadas.length})`}
                                      </div>
                                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        {pasadas.slice(0, 5).map(r => {
                                          const dias = Math.ceil((new Date(r.fechaFin) - new Date(r.fechaInicio)) / (1000 * 60 * 60 * 24)) + 1;
                                          return (
                                            <div key={r.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fafbfc', border: '1px solid #f1f5f9', borderRadius: '10px', opacity: 0.7 }}>
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                                </div>
                                                <div>
                                                  <div style={{ fontWeight: '600', fontSize: '12px', color: '#64748b' }}>{r.equipoNombre} — {r.nombreReservador}</div>
                                                  <div style={{ fontSize: '10px', color: '#94a3b8' }}>{r.fechaInicio} → {r.fechaFin} · {dias} {lang === 'es' ? 'días' : 'days'}</div>
                                                </div>
                                              </div>
                                              <span style={{ fontSize: '10px', fontWeight: '600', color: '#94a3b8', background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px' }}>
                                                {lang === 'es' ? 'Finalizada' : 'Completed'}
                                              </span>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </>
                                  )}
                                </>
                              );
                            })()}
                          </div>
                        </div>



                        {/* ── MY REQUESTS (maestro / alumno) ── */}



                        {
                          permisos.solicitarEquipos && listaSolicitudesMaterial.filter(s => s.solicitadoPor === usuarioActivo?.email).length > 0 && (
                            <div className="inv-card" style={{ animationDelay: '0.24s' }}>
                              <div className="inv-card-header" style={{ justifyContent: 'space-between' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div style={{ width: '28px', height: '28px', borderRadius: '4px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
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
                          )
                        }

                      </>
                    );
                  })()
                  }
                </div >
              )
            }

            {
              permisos.verSolicitudes && vistaActual === 'solicitudesAdmin' && (
                <div className="seccion-blanca">
                  <div className="section-header">
                    <h2>{t.adminRequests.title}</h2>
                  </div>

                  {/* TABS */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px' }}>
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
                      📚 {t.adminRequests.tabRooms} ({listaSolicitudes.filter(s => s.estado === 'Pendiente').length + listaReservas.filter(r => r.estado === 'Pendiente').length})
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
                      {t.adminRequests.tabMateriales} ({listaSolicitudesMaterial.filter(s => s.estado === 'Pendiente').length + listaReservasMaterial.filter(r => r.estado === 'Pendiente').length})
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
                      {t.adminRequests.tabReturns} ({listaSolicitudesMaterial.filter(s => (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto).length + listaReservasMaterial.filter(r => (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto).length})
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
                          {(() => {
                            const solicitudesAulas = [
                              ...listaSolicitudes.map(s => ({ ...s, isReserva: false })),
                              ...listaReservas.filter(r => r.estado === 'Pendiente').map(r => ({
                                id: r.id,
                                solicitadoPor: r.reservadoPor,
                                tipo: t.nav?.classrooms || 'Aula',
                                descripcion: `Reserva pendiente: ${r.aulaNombre} para el ${r.fecha} (${r.horaInicio} - ${r.horaFin})`,
                                estado: r.estado,
                                isReserva: true
                              }))
                            ];

                            if (solicitudesAulas.length === 0) {
                              return <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>{t.adminRequests.noRequests}</td></tr>;
                            }

                            return solicitudesAulas.map((sol) => (
                              <tr key={sol.id} className={sol.estado === 'Pendiente' ? 'row-highlight' : ''}>
                                <td><strong>{sol.solicitadoPor}</strong></td>
                                <td>{sol.tipo}</td>
                                <td style={{ fontSize: '13px', maxWidth: '300px' }}>{sol.descripcion}</td>
                                <td>
                                  <span className={`badge ${sol.estado === 'Aprobada' || sol.estado === 'Confirmada' ? 'badge-success' :
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
                                        onClick={() => sol.isReserva ? aprobarReserva(sol.id) : aprobarSolicitud(sol.id)}
                                      >
                                        {t.adminRequests.approveBtn}
                                      </button>
                                      <button
                                        className="btn-small btn-danger"
                                        onClick={() => sol.isReserva ? rechazarReserva(sol.id) : rechazarSolicitud(sol.id)}
                                      >
                                        {t.adminRequests.rejectBtn}
                                      </button>
                                    </>
                                  )}
                                </td>
                              </tr>
                            ));
                          })()}
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
                          {(() => {
                            const solicitudesYReservasMaterial = [
                              ...listaSolicitudesMaterial.filter(s => s.estado !== 'Rechazada').map(s => ({ ...s, isReserva: false })),
                              ...listaReservasMaterial.filter(r => r.estado === 'Pendiente').map(r => ({ ...r, isReserva: true }))
                            ];

                            if (solicitudesYReservasMaterial.length === 0) {
                              return <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>{t.adminRequests.noMaterial}</td></tr>;
                            }

                            return solicitudesYReservasMaterial.map((sol) => {
                              const equipo = listaEquipos.find(e => e.id === sol.equipoId);
                              const ahora = new Date();
                              const vencimientoStr = sol.fechaDevolucionEsperada || sol.fechaVencimiento || sol.fechaFin;
                              const vencimiento = vencimientoStr ? new Date(vencimientoStr) : new Date();
                              const esAtrasado = (sol.estado === 'Aprobada' || sol.estado === 'Confirmada') && !sol.devuelto && ahora > vencimiento;

                              let tiempo = sol.tiempoUso || sol.duracion;
                              if (sol.isReserva && sol.fechaInicio && sol.fechaFin) {
                                const diffMs = new Date(sol.fechaFin) - new Date(sol.fechaInicio);
                                const diffHrs = Math.round(diffMs / 3600000);
                                tiempo = (diffHrs > 0 ? diffHrs : 1);
                              } else if (!tiempo) {
                                tiempo = 24;
                              }

                              return (
                                <tr key={sol.id} className={sol.estado === 'Pendiente' ? 'row-highlight' : ''} style={{ backgroundColor: esAtrasado ? '#fee2e2' : '' }}>
                                  <td><strong>{sol.solicitadoPor || sol.reservadoPor}</strong></td>
                                  <td>{equipo ? equipo.nombre : t.adminRequests.unknown} <b>(x{sol.cantidad || 1})</b></td>
                                  <td style={{ fontSize: '12px', maxWidth: '150px' }}>{sol.motivo || t.adminRequests.notSpecified}</td> {/* <--- NUEVA CELDA */}
                                  <td style={{ fontSize: '13px' }}>{tiempo} horas</td>
                                  <td style={{ fontSize: '13px', color: esAtrasado ? '#dc2626' : '#64748b' }}>
                                    {esAtrasado && '⚠️ '}
                                    {vencimientoStr ? vencimiento.toLocaleString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : 'No definida'}
                                  </td>
                                  <td>
                                    <span className={`badge ${sol.estado === 'Aprobada' || sol.estado === 'Confirmada' ? 'badge-success' :
                                      sol.estado === 'Rechazada' ? 'badge-danger' :
                                        'badge-warning'
                                      }`}>
                                      {traducirEstado(sol.estado)}
                                    </span>
                                  </td>
                                  <td style={{ whiteSpace: 'nowrap' }}>
                                    {sol.estado === 'Pendiente' && (
                                      <>
                                        <button
                                          className="btn-small btn-success"
                                          onClick={() => sol.isReserva ? aprobarReservaMaterial(sol.id) : aprobarSolicitudMaterial(sol.id)}
                                        >
                                          {t.adminRequests.approveBtn}
                                        </button>
                                        <button
                                          className="btn-small btn-danger"
                                          onClick={() => sol.isReserva ? rechazarReservaMaterial(sol.id) : rechazarSolicitudMaterial(sol.id)}
                                        >
                                          {t.adminRequests.rejectBtn}
                                        </button>
                                      </>
                                    )}
                                  </td>
                                </tr>
                              );
                            });
                          })()}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* TAB: DEVOLUCIONES */}
                  {tabSolicitudesAdmin === 'devoluciones' && (
                    <div className="table-container">
                      {/* Botón dinámico para ejecutar la función de atrasos */}
                      <div style={{ padding: '15px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#f8fafc' }}>
                        <button className="btn-small btn-danger" onClick={enviarNotificacionesPorAtrasos} style={{ padding: '8px 15px' }}>
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
                          {(() => {
                            const devolucionesPendientes = [
                              ...listaSolicitudesMaterial.filter(s => (s.estado === 'Aprobada' || s.estado === 'Confirmada') && !s.devuelto).map(s => ({ ...s, isReserva: false, qty: s.cantidad, fechaEsperada: s.fechaDevolucionEsperada || s.fechaVencimiento })),
                              ...listaReservasMaterial.filter(r => (r.estado === 'Aprobada' || r.estado === 'Confirmada') && !r.devuelto).map(r => ({ ...r, isReserva: true, qty: r.cantidad || 1, fechaEsperada: r.fechaDevolucionEsperada || r.fechaVencimiento || r.fechaFin }))
                            ].sort((a, b) => new Date(a.fechaEsperada) - new Date(b.fechaEsperada));

                            if (devolucionesPendientes.length === 0) {
                              return <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>{t.adminRequests.allReturned}</td></tr>;
                            }

                            return devolucionesPendientes.map((sol) => {
                              const equipo = listaEquipos.find(e => e.id === sol.equipoId);
                              const ahora = new Date();
                              const vencimiento = new Date(sol.fechaEsperada);
                              const esAtrasado = ahora > vencimiento;
                              const horasAtrasado = esAtrasado ? Math.floor((ahora - vencimiento) / (1000 * 60 * 60)) : null;

                              return (
                                <tr key={sol.id} style={{ backgroundColor: esAtrasado ? '#fee2e2' : '#f0fdf4', borderLeft: esAtrasado ? '4px solid #dc2626' : '4px solid #22c55e' }}>
                                  <td><strong>{sol.solicitadoPor || sol.reservadoPor}</strong></td>
                                  <td>{equipo ? equipo.nombre : 'Desconocido'}</td>
                                  <td>{sol.qty}</td>
                                  <td style={{ fontSize: '13px', color: esAtrasado ? '#dc2626' : '#16a34a' }}>
                                    {esAtrasado ? `⚠️ ${t.adminRequests.delayedStatus} ${horasAtrasado}h` : '✅ ' + t.adminRequests.onTimeStatus} <br />
                                    {vencimiento.toLocaleString('es-ES', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                                  </td>
                                  <td>
                                    <span className={`badge ${esAtrasado ? 'badge-danger' : 'badge-success'}`}>
                                      {esAtrasado ? t.adminRequests.delayedBadge : t.adminRequests.onTimeBadge}
                                    </span>
                                  </td>
                                  <td>
                                    <button
                                      className="btn-small btn-success"
                                      onClick={() => sol.isReserva ? registrarDevolucionReservaMaterial(sol.id) : registrarDevolucionMaterial(sol.id)}
                                      style={{ backgroundColor: '#16a34a' }}
                                    >
                                      ✅ {t.adminRequests.confirmReturnBtn}
                                    </button>
                                  </td>
                                </tr>
                              );
                            });
                          })()}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )
            }

            {/* FALLBACK si no hay vista */}
            {
              !vistaActual && (
                <div style={{ padding: '20px', color: 'red', fontSize: '16px', fontWeight: 'bold' }}>
                  {t.messages.viewNotSelected}
                </div>
              )
            }
          </div >
        </main >
      </div >
    );
  }

  if (autenticando) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        gap: '20px'
      }}>
        <div className="loader-pill">
          <div className="loader-dot" />
        </div>
        <p style={{ color: '#64748b', fontWeight: '500', letterSpacing: '0.5px' }}>Verificando Sesión...</p>
      </div>
    );
  }

  // ====================================================
  // ACCESS GATE - PUERTA DE SEGURIDAD INSTITUCIONAL
  // ====================================================
  if (!accessGatePassed) {
    return (
      <div className="access-gate-container">
        {/* Partículas de fondo animadas */}
        <div className="ag-particles">
          <div className="ag-particle ag-particle-1" />
          <div className="ag-particle ag-particle-2" />
          <div className="ag-particle ag-particle-3" />
          <div className="ag-particle ag-particle-4" />
          <div className="ag-particle ag-particle-5" />
          <div className="ag-particle ag-particle-6" />
        </div>

        {/* Grid de fondo */}
        <div className="ag-grid-bg" />

        {/* Orbs de fondo */}
        <div className="ag-orb ag-orb-1" />
        <div className="ag-orb ag-orb-2" />
        <div className="ag-orb ag-orb-3" />

        {/* Switcher de idioma */}
        <button
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          className="ag-lang-btn"
          title={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
        >
          <span className="lang-flag-circle">{lang === 'es' ? '🇺🇸' : '🇲🇽'}</span>
        </button>

        {/* Tarjeta central del Access Gate */}
        <div className={`ag-card ${accessGateShake ? 'ag-shake' : ''}`}>

          {/* Barra tricolor superior */}
          <div className="ag-tricolor-bar" />

          {/* Escudo de seguridad animado */}
          <div className="ag-shield-container">
            <div className="ag-shield-glow" />
            <div className="ag-shield">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="url(#shieldGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#003087" />
                    <stop offset="50%" stopColor="#00A33B" />
                    <stop offset="100%" stopColor="#FBC02D" />
                  </linearGradient>
                </defs>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" stroke="#00A33B" strokeWidth="2" />
              </svg>
            </div>
          </div>

          {/* Logo */}
          <div className="ag-logo">
            <img src={logo} alt="EdTech+ Logo" />
          </div>

          {/* Badge institucional */}
          <div className="ag-badge">
            <span className="ag-badge-dot" />
            {lang === 'es' ? 'ACCESO INSTITUCIONAL PROTEGIDO' : 'PROTECTED INSTITUTIONAL ACCESS'}
          </div>

          {/* Título */}
          <h1 className="ag-title">
            {lang === 'es' ? 'Puerta de Acceso' : 'Access Gate'}
          </h1>
          <p className="ag-subtitle">
            {lang === 'es'
              ? 'Ingresa el código de acceso proporcionado por tu institución para continuar al sistema.'
              : 'Enter the access code provided by your institution to continue to the system.'}
          </p>

          {/* Error */}
          {accessGateError && (
            <div className="ag-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              {accessGateError}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={validarAccessGate} className="ag-form">
            <div className="ag-input-group">
              <label>
                {lang === 'es' ? 'Código de Acceso' : 'Access Code'}
              </label>
              <div className="ag-input-wrapper">
                <input
                  id="access-gate-code"
                  type="password"
                  placeholder={lang === 'es' ? 'Ingresa tu código institucional' : 'Enter your institutional code'}
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  autoFocus
                  className="ag-input"
                  autoComplete="off"
                />
                <span className="ag-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
              </div>
            </div>

            <button
              id="access-gate-submit"
              type="submit"
              className="ag-submit-btn"
              disabled={accessGateLoading}
            >
              {accessGateLoading ? (
                <>
                  <span className="ag-spinner" />
                  {lang === 'es' ? 'Verificando...' : 'Verifying...'}
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  {lang === 'es' ? 'Verificar Acceso' : 'Verify Access'}
                </>
              )}
            </button>
          </form>

          {/* Separador */}
          <div className="ag-divider" />

          {/* Info de seguridad */}
          <div className="ag-security-info">
            <div className="ag-info-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00A33B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{lang === 'es' ? 'Conexión cifrada SSL/TLS' : 'SSL/TLS encrypted connection'}</span>
            </div>
            <div className="ag-info-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#003087" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{lang === 'es' ? 'Autenticación de dos capas' : 'Two-layer authentication'}</span>
            </div>
            <div className="ag-info-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FBC02D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{lang === 'es' ? 'Acceso institucional verificado' : 'Verified institutional access'}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="ag-footer">
            <p>EdTech+ © 2025 · {lang === 'es' ? 'Sistema de Seguridad Institucional' : 'Institutional Security System'}</p>
          </div>
        </div>
      </div>
    );
  }

  // ====================================================
  // VISTA LOGIN - DISEÑO INSTITUCIONAL EDTECH+
  // ====================================================
  return (
    <div className="split-screen-login">

      {/* ── PANEL IZQUIERDO ── */}
      <div className="login-left-panel">
        {/* Orbs decorativos */}
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
        <div className="login-orb login-orb-3" />
        <div className="login-left-divider" />

        <div className="edu-content">
          <div className="lr-brand">
            <img src={logo} alt="EdTech+ Logo" />
          </div>

          <div className="lr-brand-badge">
            <span className="badge-dot" />
            PLATAFORMA EDUCATIVA INSTITUCIONAL
          </div>

          <p className="brand-tagline">
            Sistema Integral para la Gestión de Espacios<br />
            y Recursos Tecnológicos Educativos.
          </p>
          <div className="edu-divider" />

          <div className="edu-features">
            <div className="feature-item">
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(100,180,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <h3>Gestión Académica</h3>
                <p>Administración centralizada de aulas y laboratorios para docentes y alumnos.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(100,220,140,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                </svg>
              </div>
              <div>
                <h3>Control de Inventario</h3>
                <p>Seguimiento en tiempo real de equipos, préstamos y estado de mantenimiento.</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,210,80,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <h3>Acceso Seguro</h3>
                <p>Autenticación estructurada por niveles de permisos y roles institucionales.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PANEL DERECHO ── */}
      <div className="login-right-panel">

        <button onClick={() => setLang(lang === 'es' ? 'en' : 'es')} className="lang-switcher-login only-flag">
          <span className="lang-flag-circle">{lang === 'es' ? '🇺🇸' : '🇲🇽'}</span>
        </button>

        <div className="login-form-container">

          <div className="form-header">
            <div className="form-header-pill">
              <span className="pill-dot" />
              Sistema Activo
            </div>
            <h2>{esRegistro ? 'Crear Cuenta' : 'Bienvenido de vuelta'}</h2>
            <p className="form-subtitle">
              {esRegistro
                ? 'Regístrate con tu correo institucional'
                : 'Ingresa tus credenciales para acceder'}
            </p>
          </div>

          {mensaje && (
            <div className={`alert-form alert-${tipoMensaje}`}>
              {mensaje}
            </div>
          )}

          <form onSubmit={esRegistro ? manejarRegistro : manejarIngreso} className="modern-login-form">
            <div className="form-group-split">
              <label>Correo Institucional</label>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="usuario@institucion.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-split"
                />
                <span className="field-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
              </div>
            </div>

            <div className="form-group-split">
              <label>Contraseña</label>
              <div className="input-field">
                <input
                  type="password"
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input-split"
                />
                <span className="field-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Enlace de recuperar contraseña - solo en login */}
            {!esRegistro && (
              <div className="forgot-password-row">
                <button
                  type="button"
                  className="btn-forgot-password"
                  onClick={manejarRecuperarPassword}
                  disabled={cargando}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  {lang === 'es' ? '¿Olvidaste tu contraseña?' : 'Forgot your password?'}
                </button>
              </div>
            )}

            <button className="btn-submit-split" type="submit" disabled={cargando}>
              {cargando
                ? 'Procesando...'
                : esRegistro ? 'Registrar Cuenta' : 'Iniciar Sesión'}
            </button>

            {/* Opciones de Login Social */}
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                className="btn-google-split"
                onClick={() => manejarLoginSocial('google')}
                disabled={cargando}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.11c-.22-.66-.35-1.36-.35-2.11s.13-1.45.35-2.11V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.83z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.83c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {esRegistro ? 'Registrarse con Google' : 'Entrar con Google'}
              </button>

            </div>
          </form>

          <div className="form-divider">
            <span>o</span>
          </div>

          <div className="form-toggle-split">
            <p>
              {esRegistro
                ? '¿Ya tienes una cuenta institucional?'
                : '¿Aún no tienes acceso al sistema?'}
            </p>
            <button
              onClick={() => { setEsRegistro(!esRegistro); setMensaje(''); }}
              className="btn-toggle-split"
              type="button"
            >
              {esRegistro ? 'Ir a Inicio de Sesión' : 'Solicitar Registro'}
            </button>
          </div>

          <div className="form-footer-split">
            <p>EdTech+ © 2026 · Plataforma de Gestión Educativa</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;

// Archivo: frontend/src/App.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import './App.css'; // ¡NUEVO! Conectamos nuestro diseño perrón

function App() {
  // Estados de Autenticación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rolSeleccionado, setRolSeleccionado] = useState('usuario');
  const [mensaje, setMensaje] = useState('');
  const [esRegistro, setEsRegistro] = useState(false);
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  // NUEVO: Estado para saber qué pestaña del menú estamos viendo
  const [vistaActual, setVistaActual] = useState('inicio'); 

  // --- Funciones de Firebase (iguales que antes) ---
  const manejarRegistro = async (e) => {
    e.preventDefault();
    setMensaje('Creando cuenta...');
    try {
      const credencial = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "usuarios", credencial.user.uid), { correo: email, rol: rolSeleccionado });
      setUsuarioActivo({ email: credencial.user.email, rol: rolSeleccionado });
      setMensaje('');
    } catch (error) { setMensaje('Error: ' + error.message); }
  };

  const manejarIngreso = async (e) => {
    e.preventDefault();
    setMensaje('Ingresando...');
    try {
      const credencial = await signInWithEmailAndPassword(auth, email, password);
      const docSnap = await getDoc(doc(db, "usuarios", credencial.user.uid));
      const rolUsuario = docSnap.exists() ? docSnap.data().rol : 'usuario';
      setUsuarioActivo({ email: credencial.user.email, rol: rolUsuario });
      setMensaje('');
    } catch (error) { setMensaje('Error: Credenciales incorrectas.'); }
  };

  const cerrarSesion = () => {
    signOut(auth).then(() => { setUsuarioActivo(null); setVistaActual('inicio'); });
  };

  // ====================================================
  // VISTA DEL SISTEMA (DASHBOARD COQUETO)
  // ====================================================
  if (usuarioActivo) {
    return (
      <div className="dashboard-layout">
        
        {/* MENÚ LATERAL OSCURO */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <h3>🏫 Lab Inmersivo</h3>
            <p style={{fontSize: '12px', color: '#94a3b8'}}>Modo: {usuarioActivo.rol.toUpperCase()}</p>
          </div>
          <nav className="sidebar-menu">
            <button className={`menu-btn ${vistaActual === 'inicio' ? 'activo' : ''}`} onClick={() => setVistaActual('inicio')}>📊 Panel de Inicio</button>
            <button className={`menu-btn ${vistaActual === 'aulas' ? 'activo' : ''}`} onClick={() => setVistaActual('aulas')}>🚪 Aulas Inmersivas</button>
            <button className={`menu-btn ${vistaActual === 'equipos' ? 'activo' : ''}`} onClick={() => setVistaActual('equipos')}>🥽 Equipos y RV</button>
            <button className={`menu-btn ${vistaActual === 'reservas' ? 'activo' : ''}`} onClick={() => setVistaActual('reservas')}>📅 Mis Reservas</button>
          </nav>
        </aside>

        {/* ÁREA PRINCIPAL */}
        <main className="main-content">
          <header className="topbar">
            <h2>Sistema de Gestión de Recursos</h2>
            <div>
              <span style={{marginRight: '15px'}}>👤 {usuarioActivo.email}</span>
              <button className="btn-formal btn-peligro" onClick={cerrarSesion}>Salir</button>
            </div>
          </header>

          <div className="content-area">
            {/* Si la pestaña es INICIO */}
            {vistaActual === 'inicio' && (
              <div>
                <h3 style={{marginTop: 0}}>Resumen General</h3>
                <div className="cards-grid">
                  <div className="card"><h4>Total Equipos RV</h4><p>24</p></div>
                  <div className="card"><h4>Aulas Disponibles</h4><p>3</p></div>
                  <div className="card"><h4>Reservas Activas</h4><p>5</p></div>
                </div>
                <div className="seccion-blanca">
                  <h3>Bienvenido al nuevo sistema</h3>
                  <p>Selecciona una opción en el menú lateral para comenzar a gestionar los recursos de la escuela.</p>
                </div>
              </div>
            )}

            {/* Si la pestaña es AULAS */}
            {vistaActual === 'aulas' && (
              <div className="seccion-blanca">
                <h3>🚪 Gestión de Aulas Inmersivas</h3>
                {usuarioActivo.rol === 'admin' ? (
                  <button className="btn-formal" style={{width: 'auto', marginBottom: '20px'}}>+ Registrar Nueva Aula</button>
                ) : null}
                <p>Aquí mostraremos la tabla con el Studio Verde, el Aula Interactiva, etc.</p>
              </div>
            )}

            {/* Si la pestaña es EQUIPOS */}
            {vistaActual === 'equipos' && (
              <div className="seccion-blanca">
                <h3>🥽 Inventario de Equipos y RV</h3>
                {usuarioActivo.rol === 'admin' ? (
                  <button className="btn-formal" style={{width: 'auto', marginBottom: '20px'}}>+ Registrar Nuevo Equipo</button>
                ) : null}
                <p>Aquí pondremos la lista de Gafas Meta Quest, Cámaras 360, Controles, etc.</p>
              </div>
            )}

            {/* Si la pestaña es RESERVAS */}
            {vistaActual === 'reservas' && (
              <div className="seccion-blanca">
                <h3>📅 Control de Reservas</h3>
                <p>Aquí verás tu calendario y el estado de tus solicitudes.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // ====================================================
  // VISTA DE LOGIN / REGISTRO (Ahora más formal)
  // ====================================================
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 style={{color: 'var(--color-primario)'}}>{esRegistro ? 'Registrar Cuenta' : 'Portal del Laboratorio'}</h2>
        <p style={{color: '#64748b', marginBottom: '20px'}}>Universidad / Escuela</p>
        
        <form onSubmit={esRegistro ? manejarRegistro : manejarIngreso}>
          <input className="input-formal" type="email" placeholder="Correo institucional" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="input-formal" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          {esRegistro && (
            <select className="input-formal" value={rolSeleccionado} onChange={(e) => setRolSeleccionado(e.target.value)}>
              <option value="usuario">Estudiante</option>
              <option value="profesor">Profesor</option>
              <option value="admin">Administrador (TI)</option>
            </select>
          )}

          <button className="btn-formal" type="submit" style={{marginTop: '15px'}}>
            {esRegistro ? 'Crear Cuenta' : 'Ingresar al Sistema'}
          </button>
        </form>
        
        <p style={{ fontWeight: 'bold', color: '#ef4444' }}>{mensaje}</p>

        <button onClick={() => { setEsRegistro(!esRegistro); setMensaje(''); }} style={{ marginTop: '15px', background: 'none', border: 'none', color: 'var(--color-secundario)', cursor: 'pointer' }}>
          {esRegistro ? '¿Ya tienes cuenta? Inicia sesión' : '¿Eres nuevo? Regístrate aquí'}
        </button>
      </div>
    </div>
  );
}

export default App;
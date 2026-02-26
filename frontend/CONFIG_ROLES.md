# 🏫 Lab Reserva - Sistema de Roles y Permisos

## Descripción General

El sistema de **Lab Reserva** implementa un sistema robusto de control de acceso basado en tres roles principales, cada uno con permisos específicos y funcionalidades limitadas.

---

## 👥 Roles Disponibles

### 1. **ADMINISTRADOR (Admin)**
El administrador tiene acceso completo al sistema e implementa controles de gestión.

#### Permisos:
- ✅ **Gestión de Aulas**: Crear, editar y eliminar aulas
- ✅ **Gestión de Equipos**: Registrar, actualizar y gestionar inventario
- ✅ **Ver todas las Reservas**: Visualizar reservas de todos los usuarios
- ✅ **Gestionar Solicitudes**: Ver, aprobar y rechazar solicitudes de estudiantes
- ✅ **Reservar Equipos**: Hacer reservas directas sin necesidad de solicitud

#### Funcionalidades Específicas:
- Registrar nuevas aulas con capacidad y tipo de equipo principal
- Crear y mantener inventario de equipos (categorías: Gafas RV, Cámaras, Laptops, etc.)
- Aprobar/Rechazar solicitudes de estudiantes
- Ver solicitudes pendientes en el menú lateral (contador de solicitudes)
- Acceso a reportes (En desarrollo)

---

### 2. **MAESTRO (Profesor)**
Los profesores pueden reservar recursos directamente sin necesidad de solicitud.

#### Permisos:
- ✅ **Reservar Aulas**: Crear reservas directas de aulas
- ✅ **Reservar Equipos**: Acceso directo a equipos disponibles
- ✅ **Ver sus Reservas**: Visualizar solo sus propias reservas
- ❌ **NO Gestionar Aulas**: No puede crear ni modificar aulas
- ❌ **NO Gestionar Equipos**: No puede crear ni modificar equipos
- ❌ **NO Aprobar Solicitudes**: No puede ver ni aprobar solicitudes

#### Flujo de Trabajo:
1. El profesor inicia sesión con rol **"maestro"**
2. Accede a la sección **"Mis Reservas"**
3. Selecciona un aula disponible
4. Define fecha, horario y propósito
5. La reserva se confirma inmediatamente

---

### 3. **ALUMNO (Estudiante)**
Los estudiantes deben solicitar autorización para usar aulas y equipos.

#### Permisos:
- ✅ **Solicitar Aulas**: Crear solicitudes de reserva de aulas
- ✅ **Solicitar Equipos**: Crear solicitudes de equipos
- ✅ **Ver sus Solicitudes**: Visualizar estado de sus solicitudes
- ❌ **NO Reservar Directamente**: Debe esperar aprobación
- ❌ **NO Gestionar Recursos**: Sin acceso a gestión
- ❌ **NO Aprobar Solicitudes**: No puede aprobar nada

#### Flujo de Trabajo:
1. El estudiante inicia sesión con rol **"alumno"**
2. Accede a la sección **"Mis Solicitudes"**
3. Crea una nueva solicitud indicando:
   - Tipo (Aula / Equipo / Otro)
   - Descripción detallada
   - Fecha solicitada (opcional)
4. El administrador revisa y aprueba/rechaza
5. El estudiante ve el estado actualizado

---

## 📊 Estructura de Datos en Firestore

### Colecciones Principales:

#### `usuarios`
```
{
  uid: "firebase-uid",
  correo: "usuario@email.com",
  rol: "admin" | "maestro" | "alumno",
  fechaRegistro: "2025-02-25T10:00:00Z"
}
```

#### `aulas`
```
{
  id: "auto-generated",
  nombre: "Laboratorio A",
  capacidad: 30,
  equipoDisponible: "Gafas RV" | "Cámaras" | "Laptops" | "Múltiple",
  estado: "Disponible" | "Ocupada",
  creada: "2025-02-25T10:00:00Z"
}
```

#### `equipos`
```
{
  id: "auto-generated",
  nombre: "Gafas Oculus Quest 3",
  categoria: "Gafas RV",
  cantidad: 5,
  estado: "Disponible" | "Mantenimiento" | "Inactivo",
  registradoPor: "admin@email.com",
  fecha: "2025-02-25T10:00:00Z"
}
```

#### `reservas`
```
{
  id: "auto-generated",
  aulaId: "aula-id",
  aulaAula: "Laboratorio A",
  fecha: "2025-02-28",
  horaInicio: "09:00",
  horaFin: "11:00",
  proposito: "Clase de inmersión XR",
  reservadoPor: "maestro@email.com",
  rol: "maestro",
  estado: "Confirmada",
  fechaReserva: "2025-02-25T10:00:00Z"
}
```

#### `solicitudes`
```
{
  id: "auto-generated",
  tipo: "Aula" | "Equipo" | "Otro",
  descripcion: "Necesito usar la sala para proyecto final",
  fechaSolicitada: "2025-02-28",
  solicitadoPor: "alumno@email.com",
  rol: "alumno",
  estado: "Pendiente" | "Aprobada" | "Rechazada",
  fechaSolicitud: "2025-02-25T10:00:00Z",
  fechaAprobacion: "2025-02-25T11:00:00Z",  // Si se aprueba
  fechaRechazo: "2025-02-25T11:00:00Z"      // Si se rechaza
}
```

---

## 🔑 Sistema de Permisos (PERMISOS object)

```javascript
const PERMISOS = {
  admin: {
    gestionAulas: true,           // Crear/Editar/Eliminar aulas
    gestionEquipos: true,         // Crear/Editar/Eliminar equipos
    verReservas: true,            // Ver todas las reservas
    verSolicitudes: true,         // Ver todas las solicitudes
    aprobarSolicitudes: true,     // Aprobar/Rechazar solicitudes
    reservarEquipos: true,        // Reserva directa
    solicitarEquipos: false       // No necesita solicitar
  },
  maestro: {
    gestionAulas: false,
    gestionEquipos: false,
    verReservas: true,            // Solo sus reservas
    verSolicitudes: false,
    aprobarSolicitudes: false,
    reservarEquipos: true,        // Reserva directa
    solicitarEquipos: false       // No necesita solicitar
  },
  alumno: {
    gestionAulas: false,
    gestionEquipos: false,
    verReservas: false,           // No ve reservas
    verSolicitudes: false,        // Ve solo sus solicitudes
    aprobarSolicitudes: false,
    reservarEquipos: false,
    solicitarEquipos: true        // Debe solicitar
  }
};
```

---

## 🎨 Interfaz de Usuario por Rol

### Panel Lateral (Sidebar)
Cambia dinámicamente según el rol del usuario:

- **Admin**: 📊 Inicio | 🚪 Aulas | 🥽 Inventario | ✅ Solicitudes
- **Maestro**: 📊 Inicio | 📅 Mis Reservas
- **Alumno**: 📊 Inicio | 📝 Mis Solicitudes

### Dashboard Principal
Muestra tarjetas con estadísticas relevantes al rol:
- Equipos Disponibles
- Aulas Disponibles
- Reservas Activas (Solo Admin)
- Solicitudes Pendientes (Solo Admin)

---

## 📝 Casos de Uso Comunes

### Caso 1: Profesor reserva un aula
1. Inicia sesión como "maestro"
2. Ve el menú "Mis Reservas"
3. Hace clic en "Nueva Reserva"
4. Selecciona: Aula, Fecha, Horario, Propósito
5. Confirma la reserva ✓

### Caso 2: Estudiante solicita equipo
1. Inicia sesión como "alumno"
2. Ve el menú "Mis Solicitudes"
3. Hace clic en "Nueva Solicitud"
4. Selecciona tipo "Equipo"
5. Describe qué equipo necesita y para qué
6. Envía la solicitud
7. Espera aprobación del admin

### Caso 3: Admin aprueba solicitud
1. Inicia sesión como "admin"
2. Ve "✅ Solicitudes (3)" en el sidebar
3. Abre la sección de Solicitudes
4. Revisa cada solicitud pendiente
5. Hace clic en "✅ Aprobar" o "❌ Rechazar"
6. El sistema notifica al solicitante

### Caso 4: Admin registra un aula
1. Inicia sesión como "admin"
2. Accede a "🚪 Aulas"
3. Hace clic en "➕ Nueva Aula"
4. Ingresa: Nombre, Capacidad, Equipo principal
5. Confirma el registro
6. El aula está inmediatamente disponible

---

## 🚀 Mejoras Futuras

- [ ] Notificaciones por email/SMS
- [ ] Reportes avanzados (uso de recursos, estadísticas)
- [ ] Historial de reservas
- [ ] Conflictos de horario automáticos
- [ ] Sistema de puntuaciones/reseñas
- [ ] Integración con calendario externo (Google Calendar)
- [ ] Exportar datos a Excel/PDF
- [ ] Panel analítico avanzado

---

## ⚙️ Configuración de Reglas de Firestore

Para máxima seguridad, se recomienda establecer estas reglas:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Usuarios solo ven su propio documento
    match /usuarios/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
    
    // Aulas - leer todos, admin escribe
    match /aulas/{document=**} {
      allow read: if request.auth != null;
      allow write: if getUserRole() == 'admin';
    }
    
    // Equipos - leer todos, admin escribe
    match /equipos/{document=**} {
      allow read: if request.auth != null;
      allow write: if getUserRole() == 'admin';
    }
    
    // Reservas
    match /reservas/{document=**} {
      allow read: if request.auth != null;
      allow create: if getUserRole() in ['admin', 'maestro'];
      allow update: if getUserRole() == 'admin' || isOwner();
      allow delete: if getUserRole() == 'admin' || isOwner();
    }
    
    // Solicitudes
    match /solicitudes/{document=**} {
      allow read: if request.auth != null;
      allow create: if getUserRole() == 'alumno';
      allow update: if getUserRole() == 'admin' || isOwner();
      allow delete: if getUserRole() == 'admin';
    }
    
    // Funciones auxiliares
    function getUserRole() {
      return get(/databases/$(database)/documents/usuarios/$(request.auth.uid)).data.rol;
    }
    
    function isOwner() {
      return resource.data.solicitadoPor == request.auth.token.email ||
             resource.data.reservadoPor == request.auth.token.email;
    }
  }
}
```

---

## 📞 Soporte

Para reportar problemas o sugerencias, contacta al administrador del sistema.

**Versión**: 1.0.0
**Última actualización**: February 25, 2025

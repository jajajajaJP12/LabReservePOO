# LabReservePOO Backend - Estructura del Proyecto

## 📁 Estructura de Carpetas

```
src/main/java/com/labreserve/
├── MainApp.java                          # Punto de entrada principal
│
├── config/
│   └── FirebaseConfig.java              # Configuración de Firebase
│
├── model/                               # Entidades del sistema
│   ├── Usuario.java                     # Modelo de Usuario (admin, maestro, alumno)
│   ├── Aula.java                        # Modelo de Aula/Laboratorio
│   ├── Equipo.java                      # Modelo de Equipos
│   ├── Reserva.java                     # Modelo de Reservas de Aula
│   ├── SolicitudMaterial.java           # Modelo de Solicitudes de Material
│   └── Notificacion.java                # Modelo de Notificaciones
│
├── repository/                          # Capa de acceso a datos (DAO)
│   ├── BaseRepository.java              # Clase base con CRUD genérico
│   ├── UsuarioRepository.java           # Operaciones CRUD de Usuario
│   ├── AulaRepository.java              # Operaciones CRUD de Aula
│   ├── EquipoRepository.java            # Operaciones CRUD de Equipo
│   ├── ReservaRepository.java           # Operaciones CRUD de Reserva
│   ├── SolicitudMaterialRepository.java # Operaciones CRUD de Solicitud Material
│   └── NotificacionRepository.java      # Operaciones CRUD de Notificación
│
├── service/                             # Capa de lógica de negocio
│   ├── LabReserveService.java          # Facade/Orquestrador principal
│   ├── UsuarioService.java             # Lógica de Usuarios
│   ├── EquipoService.java              # Lógica de Equipos
│   ├── ReservaService.java             # Lógica de Reservas
│   └── SolicitudMaterialService.java   # Lógica de Solicitudes de Material
│
└── util/
    └── LabReserveUtil.java             # Utilidades generales
```

## 🏗️ Arquitectura (Patrón MVC/Layered)

### 1. **Model (Modelos/Entidades)**
- Clases POJO que representan las entidades principales
- Incluyen getters, setters y métodos de validación

### 2. **Repository (Acceso a Datos)**
- Interactúan directamente con Firestore
- Heredan de `BaseRepository` para operaciones CRUD genéricas
- Cada repositorio maneja una entidad específica

### 3. **Service (Lógica de Negocio)**
- Contienen la lógica de negocio de la aplicación
- Usan repositorios para acceder a datos
- Manejan validaciones, cálculos y notificaciones

### 4. **Util (Utilidades)**
- Funciones auxiliares reutilizables
- Conversiones de datos, validaciones, etc.

## 🔑 Clases Principales

### Usuario
```java
- Rol: admin, maestro, alumno
- Email, nombre, departamento
- Activo/Inactivo
- Métodos: esAdmin(), esMaestro(), esAlumno()
```

### Aula
```java
- Nombre, edificio, piso, capacidad
- Disponibilidad y estado
- Responsable (profesor)
- Métodos: isDisponible()
```

### Equipo
```java
- Nombre, categoría, cantidad
- Estado (Disponible, Mantenimiento, Dañado)
- Ubicación, código de serie
- Métodos: estaDisponible(), restarCantidad(), agregarCantidad()
```

### SolicitudMaterial
```java
- EquipoId, cantidad, motivo
- TiempoUso (horas)
- Estado (Pendiente, Aprobada, Rechazada)
- Fecha de devolución esperada y real
- Métodos: esAtrasada(), getDiasAtraso()
```

### Reserva
```java
- AulaId, usuarioEmail, fecha
- HoraInicio, horaFin
- Estado (Pendiente, Confirmada, Cancelada)
- Métodos: confirmar(), cancelar()
```

### Notificacion
```java
- Para, de, asunto, mensaje
- Tipo (solicitud_material, devolucion, reserva, general)
- Prioridad (baja, normal, alta)
- Métodos: marcarComoLeida()
```

## 🔄 Flujos Principales

### 1. Solicitud de Material
1. Usuario crea `SolicitudMaterial` via `SolicitudMaterialService`
2. Se guarda con estado "Pendiente" en Firestore
3. Se notifica al admin
4. Admin aprueba:
   - Cantidad se resta de `Equipo`
   - Se calcula `fechaDevolucionEsperada`
   - Se notifica al usuario
5. Usuario devuelve material:
   - Se marca como `devuelto=true`
   - Cantidad se suma de nuevo a `Equipo`
   - Se notifica al admin

### 2. Reserva de Aula
1. Usuario crea `Reserva` via `ReservaService`
2. Se valida disponibilidad horaria
3. Se guarda y se notifica al usuario
4. Se confirma cuando el responsable lo aprueban

### 3. Gestión de Usuarios
1. Admin crea usuario via `UsuarioService`
2. Se asigna rol (admin, maestro, alumno)
3. Se valida email único
4. Puede activarse/desactivarse

## 📦 Dependencias Principales

- Firebase Admin SDK
- Google Cloud Firestore
- Java 11+
- Gradle

## 🚀 Uso

```java
// Obtener el servicio principal
LabReserveService labReserve = LabReserveService.getInstance();

// Acceder a servicios específicos
UsuarioService usuarios = labReserve.getUsuarioService();
EquipoService equipos = labReserve.getEquipoService();
SolicitudMaterialService solicitudes = labReserve.getSolicitudMaterialService();
ReservaService reservas = labReserve.getReservaService();

// Ejemplos de uso
Usuario usuario = usuarios.obtenerPorEmail("alumno@labreserve.com");
List<Equipo> disponibles = equipos.obtenerDisponibles();
List<SolicitudMaterial> pendientes = solicitudes.obtenerSolicitudesPendientes();
```

## 📝 Notas de Desarrollo

- Todos los repositorios usan Firestore como base de datos
- Los servicios manejan la lógica de negocio
- Las entidades incluyen métodos utilitarios
- El patrón Facade (LabReserveService) centraliza el acceso

## 🔐 Validaciones

- Emails únicos para usuarios
- Roles válidos (admin, maestro, alumno)
- Cantidades no negativas
- Horarios sin conflictos en reservas
- Estados válidos para entidades

## 📊 Próximas Mejoras

- [ ] Implementar DTOs (Data Transfer Objects)
- [ ] Agregar caché en memoria para consultas frecuentes
- [ ] Implementar paginación en consultas grandes
- [ ] Agregar logs y auditoría
- [ ] Crear excepciones personalizadas
- [ ] Implementar transacciones en operaciones complejas
- [ ] Agregar API REST controllers

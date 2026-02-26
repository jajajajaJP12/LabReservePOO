# 🔧 Especificaciones Técnicas v1.1

## 📌 Resumen de Implementación

### Funcionalidad 1: Descripción en Reservas

**Componente:** Formulario de Reserva (Maestro)

**HTML/JSX:**
```jsx
<textarea 
  name="descripcion" 
  className="input-formal" 
  placeholder="Descripción de la clase o actividad..." 
  required 
  style={{gridColumn: 'span 2'}}
  rows="4"
></textarea>
```

**Validación:**
- Required field
- Mínimo: 1 carácter
- Máximo: Ilimitado (Firestore lo maneja)

**Almacenamiento:**
```javascript
const descripcion = e.target.descripcion.value;

await addDoc(collection(db, "reservas"), {
  // ... otros datos
  descripcion,  // Se guarda en Firestore
  // ...
});
```

---

### Funcionalidad 2: Cancelación de Reservas

**Función:**
```javascript
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
```

**Flujo:**
1. Usuario hace clic en "❌ Cancelar"
2. Aparece `confirm()` dialog
3. Si confirma:
   - `deleteDoc()` elimina de Firestore
   - Alert verde "Reserva cancelada"
   - Tabla se actualiza en tiempo real
4. Si cancela: No pasa nada

**Permisos:**
- Maestro: Puede cancelar solo sus propias reservas
- Admin: Puede cancelar cualquier reserva

---

### Funcionalidad 3: Información de Quién Reservó

**Datos Capturados:**
```javascript
reservadoPor: usuarioActivo.email,          // "profesor@email.com"
nombreReservador: usuarioActivo.email.split('@')[0],  // "profesor"
rol: usuarioActivo.rol                      // "maestro"
```

**Dónde se muestra:**
- **Tabla Admin (Todas las Reservas):**
  ```jsx
  <div style={{fontWeight: '500'}}>{res.nombreReservador}</div>
  <div style={{fontSize: '11px', color: '#94a3b8'}}>{res.reservadoPor}</div>
  ```
  
- **Columna:** "Reservado por"

---

### Funcionalidad 4: Nueva Sección Admin

**Ubicación en Sidebar:**
```jsx
{permisos.verReservas && (
  <button 
    className={`menu-btn ${vistaActual === 'reservasAdmin' ? 'activo' : ''}`} 
    onClick={() => setVistaActual('reservasAdmin')}
  >
    📅 Todas las Reservas
  </button>
)}
```

**Vista:**
```jsx
{permisos.verReservas && vistaActual === 'reservasAdmin' && (
  <div className="seccion-blanca">
    {/* Tabla completa */}
  </div>
)}
```

**Tabla:**
- 7 columnas: Aula, Reservado por, Fecha, Horario, Descripción, Estado, Acciones
- Sin filtros (muestra todas)
- Contador de activas
- Botón cancelar en cada fila

---

## 🎯 Casos de Uso Técnicos

### UC1: Maestro Crea Reserva con Descripción

**Inicio:**
```
Usuario: Maestro logueado
Acción: Clic en "Mis Reservas" → "Nueva Reserva"
```

**Datos Capturados:**
```javascript
{
  aula: "aula-id-123",
  fecha: "2025-02-28",
  horaInicio: "09:00",
  horaFin: "11:00",
  descripcion: "Taller interactivo de XR..."
}
```

**Procesamiento:**
```javascript
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
```

**Resultado:**
```
✅ Alert: "Aula reservada correctamente"
✅ Formulario se limpia
✅ Tabla se actualiza en tiempo real
✅ Documento en Firestore: 8 campos
```

---

### UC2: Maestro Cancela Reserva

**Inicio:**
```
Usuario: Maestro con reserva activa
Acción: Clic en "❌ Cancelar"
```

**Flujo:**
```
confirm("¿Estás seguro de que quieres cancelar esta reserva?")
  ├─ Sí → deleteDoc(doc(db, "reservas", id))
  │       ├─ Alert: "Reserva cancelada"
  │       └─ Tabla actualizada
  └─ No → No pasa nada
```

**Verificación:**
- El documento se elimina de Firestore
- No hay "soft delete" (no est marcado como cancelado)
- La tabla se actualiza automáticamente (onSnapshot)

---

### UC3: Admin Ve Todas las Reservas

**Inicio:**
```
Usuario: Admin logueado
Acción: Clic en "📅 Todas las Reservas"
```

**Montaje de Datos:**
```javascript
const listaReservas = []; // Loaded by onSnapshot from DB

// Se muestra tabla con:
listaReservas.map((res) => (
  <tr key={res.id}>
    <td>{res.aulaNombre}</td>
    <td>{res.nombreReservador}</td>
    <td>{new Date(res.fecha).toLocaleDateString('es-ES')}</td>
    <td>{res.horaInicio} - {res.horaFin}</td>
    <td>{res.descripcion}</td>
    <td>{res.estado}</td>
    <td>Botón Cancelar</td>
  </tr>
))
```

**Contador:**
```jsx
{listaSolicitudes.filter(r => r.estado === 'Confirmada').length}
// "15 Activas"
```

---

## 🔌 Integración Firestore

### Colección `reservas` - Estructura:

```
Documento ID: auto-generado

Campos:
├─ aulaId (string)
├─ aulaNombre (string) ✨
├─ aulaCapacidad (number) ✨
├─ aulaEquipo (string) ✨
├─ fecha (string - date)
├─ horaInicio (string - time)
├─ horaFin (string - time)
├─ descripcion (string - large) ✨
├─ reservadoPor (string - email)
├─ nombreReservador (string) ✨
├─ rol (string - enum)
├─ estado (string - "Confirmada")
└─ fechaReserva (string - ISO8601)
```

**Campos nuevos en v1.1:** 
- aulaNombre, aulaCapacidad, aulaEquipo
- descripcion
- nombreReservador

### Índices Recomendados:

Para optimizar queries:

```
Colección: reservas
├─ Índice 1: (fecha ASC, horaInicio ASC)
│  └─ Uso: Detectar conflictos de horario
├─ Índice 2: (reservadoPor ASC, estado ASC)
│  └─ Uso: Filtrar por usuario
└─ Índice 3: (estado ASC, fechaReserva DESC)
   └─ Uso: Listar activas
```

---

## 🎨 Cambios CSS

### Nueva Clase:
```css
.badge-info {
  background-color: #dbeafe;
  color: #1e40af;
}
```

### Mejora de Tabla:
```css
td[style*="maxWidth"] {
  word-wrap: break-word;
  white-space: normal;
  line-height: 1.4;
}
```

**Uso:**
```jsx
<td style={{fontSize: '12px', color: '#475569', maxWidth: '200px'}}>
  {res.descripcion}
</td>
```

---

## 🔐 Control de Acceso

### Permisos Maestro:
```javascript
maestro: {
  verReservas: true,      // Ver sus propias reservas
  reservarEquipos: true,  // Crear nuevas reservas
  // Puede cancelar solo sus propias reservas
}
```

**Protección:**
```javascript
listaReservas.filter(r => r.reservadoPor === usuarioActivo.email)
// Solo muestra reservas del usuario actual
```

### Permisos Admin:
```javascript
admin: {
  verReservas: true,      // Ver TODAS las reservas
  // Puede cancelar CUALQUIER reserva
}
```

**Acceso:**
```javascript
{permisos.verReservas && vistaActual === 'reservasAdmin' && (
  // Muestra todas las reservas sin filtro
)}
```

---

## 🧪 Casos de Test

### Test 1: Crear Reserva con Descripción
```
Setup: Admin registró aula, Maestro logueado
Paso 1: Clic "Mis Reservas"
Paso 2: Clic "Nueva Reserva"
Paso 3: Llenar todos los campos
Paso 4: Escribir descripción larga (200+ caracteres)
Paso 5: Clic "Confirmar"
Esperado: Descripción visible en tabla
```

### Test 2: Cancelar Reserva
```
Setup: Maestro tiene reserva activa
Paso 1: Clic "❌ Cancelar"
Paso 2: Confirmar en dialog
Esperado: Reserva desaparece de tabla
Esperado: Alert verde "Reserva cancelada"
```

### Test 3: Admin Ve Todas
```
Setup: Múltiples maestros con reservas
Paso 1: Admin entra
Paso 2: Clic "📅 Todas las Reservas"
Esperado: Tabla con TODAS las reservas
Esperado: Columnmas con info de cada maestro
Esperado: Contador correcto
```

### Test 4: Tiempo Real
```
Setup: 2 tabs abiertas (Maestro + Admin)
Paso 1: Maestro crea reserva en tab 1
Esperado: Aparece inmediatamente en tab 2
Paso 2: Admin cancela en tab 2
Esperado: Desaparece inmediatamente en tab 1
```

---

## 📊 Comparativa Anterior vs Actual

| Aspecto | v1.0 | v1.1 |
|---------|------|------|
| **Función `guardarReserva()`** | 5 params | 6 params |
| **Función `cancelarReserva()`** | No existe | ✅ |
| **Campos guardados** | 7 | 13 (+6) |
| **Vistas del Maestro** | 1 | 1 (mejorada) |
| **Vistas del Admin** | 3 | 4 (+1 de reservas) |
| **Documentación** | 6 archivos | +3 archivos |
| **Líneas de código** | ~800 | ~900 |

---

## 🚀 Performance

### Queries Optimizadas:
```javascript
// Obtener reservas (con ordenamiento)
const qReservas = query(
  collection(db, "reservas"), 
  orderBy("fecha", "desc")
);

// Filtrar en memoria
listaReservas.filter(r => r.reservadoPor === usuarioActivo.email)
```

### Actualizaciones:
```javascript
// onSnapshot escucha cambios en tiempo real
const unsub = onSnapshot(qReservas, (snapshot) => {
  // Se ejecuta al agregar/eliminar/modificar
});
```

---

## 📝 Notas Técnicas

1. **Sin Edición:** Las reservas se pueden crear o cancelar, no editar
   - Razón: Simplificar lógica
   - Mejora futura: Implementar `updateDoc()`

2. **Soft Delete Vs Hard Delete:** Usamos hard delete (eliminar)
   - Razón: Menos necesari o historial crítico
   - Mejora futura: Agregar colección `reservasArchivadas`

3. **Confirmación del Usuario:** Usamos `confirm()` (nativo)
   - Razón: Simple y directo
   - Mejora futura: Modal personalizado

4. **Extracción de Nombre:** Usando `.split('@')[0]`
   - Razón: Simple y confiable
   - Mejora futura: Campo separado en usuario

---

## ✅ Checklist de Implementación

- [x] Agregar campo descripción en formulario
- [x] Guardar descripción en Firestore
- [x] Crear función `cancelarReserva()`
- [x] Agregar botón "Cancelar" en tabla Maestro
- [x] Extraer nombre del email
- [x] Agregar Nueva sección Admin
- [x] Crear tabla de todas las reservas
- [x] Mostrar info de reservador
- [x] Agregar contador de activas
- [x] Documentación completa
- [x] Git commit y push

---

**Versión:** 1.1.0  
**Completado:** 25 de febrero de 2025  
**Estado:** ✅ Producción

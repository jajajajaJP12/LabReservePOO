# 🧪 Plan de Pruebas - Lab Reserva

## Pruebas Funcionales Paso a Paso

### PRUEBA 1: Crear Cuenta Admin

**Objetivo**: Verificar que el registro funciona y se guarda el rol correctamente

1. Abre http://localhost:5174
2. Haz clic en \"¿No tienes cuenta? Regístrate\"
3. Ingresa:
   - Email: `admin@test.com`
   - Contraseña: `admin123456`
   - Rol: **Administrador**
4. Haz clic en \"Registrarse\"

**Resultado esperado** ✅:
- Desaparece el formulario de login
- Aparece el dashboard
- El sidebar muestra badge **ADMIN**
- El sidebar muestra opciones: Inicio, Aulas, Inventario, Solicitudes

**Si falla** ❌:
- Verifica que Firebase esté correctamente configurado
- Revisa la consola del navegador (F12) para errores
- Intenta en navegador de incógnito

---

### PRUEBA 2: Registrar una Aula (Admin)

**Objetivo**: Verificar que se pueden crear aulas y que aparecen en la tabla

1. Estando como admin, haz clic en **\"🚪 Aulas\"**
2. Haz clic en **\"➕ Nueva Aula\"**
3. Completa el formulario:
   - Nombre: `Laboratorio de Realidad Virtual`
   - Capacidad: `25`
   - Equipo: `Gafas RV`
4. Haz clic en \"Registrar Aula\"

**Resultado esperado** ✅:
- Aparece una alerta verde \"Aula registrada correctamente\"
- Se desaparece el formulario
- La aula aparece inmediatamente en la tabla
- El botón vuelve a \"➕ Nueva Aula\"
- En la tarjeta \"Aulas Disponibles\" aumenta el contador

**Si falla** ❌:
- Verifica que escribiste nombre y capacidad
- Revisa que hayas seleccionado equipo
- Abre DevTools y busca errores de Firestore

---

### PRUEBA 3: Registrar Equipos (Admin)

**Objetivo**: Verificar que se pueden crear equipos con categorías

1. Haz clic en **\"🥽 Inventario\"**
2. Haz clic en **\"➕ Nuevo Equipo\"**
3. Completa el formulario:
   - Nombre: `Meta Quest 3`
   - Categoría: `Gafas RV`
   - Cantidad: `5`
   - Estado: `Disponible`
4. Haz clic en \"Registrar Equipo\"

**Resultado esperado** ✅:
- Alerta verde \"Equipo registrado correctamente\"
- El equipo aparece en la tabla
- La cantidad muestra \"5\"
- El estado muestra un badge verde \"Disponible\"

**Repetir** 3-4 veces con diferentes equipos:
```
Nombre: \"Canon EOS R6\" | Categoría: \"Cámara\" | Cantidad: 3
Nombre: \"Laptop Dell XPS\" | Categoría: \"Laptop\" | Cantidad: 8
Nombre: \"Micrófono Shure\" | Categoría: \"Micrófono\" | Cantidad: 10
```

---

### PRUEBA 4: Crear Cuenta Profesor

**Objetivo**: Verificar que un profesor puede registrarse

1. **Abre una pestaña nueva de incógnito** (Ctrl + Shift + N)
2. Abre http://localhost:5174
3. Haz clic en \"¿No tienes cuenta? Regístrate\"
4. Ingresa:
   - Email: `profesor@test.com`
   - Contraseña: `prof123456`
   - Rol: **Profesor/Maestro**
5. Registra

**Resultado esperado** ✅:
- Dashboard aparece
- Badge muestra **MAESTRO**
- Sidebar mostrá: Inicio, Mis Reservas
- **NO aparece**: Aulas, Inventario, Solicitudes
- El email \"profesor@test.com\" aparece en sidebar-footer

---

### PRUEBA 5: Profesor Reserva un Aula

**Objetivo**: Verificar que un profesor puede reservar directamente

1. Siendo profesor, haz clic en **\"📅 Mis Reservas\"**
2. Haz clic en **\"➕ Nueva Reserva\"**
3. Completa el formulario:
   - Aula: Selecciona \"Laboratorio de Realidad Virtual (25 personas)\"
   - Fecha: `2025-02-28` (fecha futura)
   - Hora Inicio: `09:00`
   - Hora Fin: `11:00`
   - Propósito: `Clase teórica de XR para alumnos de 4to semestre`
4. Haz clic en \"Confirmar Reserva\"

**Resultado esperado** ✅:
- Alerta verde \"Aula reservada correctamente\"
- Se desaparece el formulario
- La reserva aparece en la tabla debajo
- Muestra: Laboratorio, Fecha, Horario (09:00 - 11:00), Propósito, Estado \"Confirmada\"

**Si no funciona** ❌:
- Verifica que no haya aulas registradas (vuelve a Prueba 2)
- Asegúrate de usar fecha futura
- Verifica que el tiempo inicio < tiempo fin

---

### PRUEBA 6: Crear Cuenta Alumno

**Objetivo**: Verificar que un alumno ve opciones diferentes

1. **Abre otra pestaña de incógnito**
2. Abre http://localhost:5174
3. Regístrate con:
   - Email: `alumno@test.com`
   - Contraseña: `alumno123456`
   - Rol: **Estudiante**

**Resultado esperado** ✅:
- Badge muestra **ALUMNO**
- Sidebar muestra: Inicio, Mis Solicitudes
- **NO aparece**: Aulas, Inventario, Reservas, Solicitudes Admin
- Dashboard diferente (tarjetas apropiadas)

---

### PRUEBA 7: Alumno Crea Solicitud

**Objetivo**: Verificar que un alumno puede solicitar sin poder reservar

1. Siendo alumno, haz clic en **\"📝 Mis Solicitudes\"**
2. Haz clic en **\"➕ Nueva Solicitud\"**
3. Completa:
   - Tipo: `Aula`
   - Descripción: `Necesito el Laboratorio de RV para presentación de proyecto final sobre tecnología inmersiva. El grupo son 8 personas y necesitaríamos una hora y media.`
   - Fecha Solicitada: `2025-03-01`
4. Haz clic en \"Enviar Solicitud\"

**Resultado esperado** ✅:
- Alerta verde \"Solicitud enviada. Espera la aprobación del administrador.\"
- Se desaparece el formulario
- La solicitud aparece en tabla con estado **\"Pendiente\"** (amarillo)
- Almacena: Tipo, Descripción, Fecha, Estado, Fecha de Solicitud

---

### PRUEBA 8: Admin Aprueba/Rechaza Solicitudes

**Objetivo**: Verificar que admin puede gestionar solicitudes

1. **Vuelve a la pestaña del Admin**
2. Haz clic en **\"✅ Solicitudes\"** (debería mostrar contador, ej: \"Solicitudes (1)\")
3. En la tabla, busca la solicitud del alumno `alumno@test.com`
4. Verifica que muestre:
   - Nombre: alumno@test.com
   - Tipo: Aula
   - Descripción: (el texto que escribió)
   - Estado: **Pendiente** con badge amarillo

**APROBAR LA SOLICITUD:**
5. Haz clic en el botón **\"✅ Aprobar\"**

**Resultado esperado** ✅:
- La alerta verde \"Solicitud aprobada\"
- El estado en la tabla cambia a **\"Aprobada\"** (verde)
- Los botones desaparecen (ya no se puede cambiar)

**RECHAZAR OTRA SOLICITUD (opcional):**
1. Crea otra solicitud como alumno
2. Vuelve como admin
3. Haz clic en **\"❌ Rechazar\"**

**Resultado esperado** ✅:
- Alerta verde \"Solicitud rechazada\"
- Estado cambia a **\"Rechazada\"** (rojo)

---

### PRUEBA 9: Verificar Actualización en Tiempo Real

**Objetivo**: Verificar que los cambios se ven en tiempo real

1. **Abre dos pestañas lado a lado**:
   - Izquierda: Admin logueado
   - Derecha: Alumno logueado

2. En la pestaña ALUMNO:
   - Haz clic en \"Mis Solicitudes\"
   - El estado debe decir \"Aprobada\"

3. En la pestaña ADMIN:
   - El estado también debe decir \"Aprobada\"

4. En la pestaña PROFESOR:
   - Haz clic en \"Mis Reservas\"
   - Debería mostrar la reserva creada

**Resultado esperado** ✅:
- Los cambios se ven instantáneamente (sin refrescar)
- Gracias a `onSnapshot` de Firestore

---

### PRUEBA 10: Responsivo (Móvil)

**Objetivo**: Verificar que funciona en pantallas pequeñas

1. Abre DevTools (F12)
2. Haz clic en el icono de móvil (Dispositivo)
3. Selecciona un teléfono (ej: iPhone 12)

**Verificar que:**
- ✅ El sidebar se adapta
- ✅ Las tablas son scrolleables
- ✅ Los botones sonaccesibles en móvil
- ✅ El formulario se ve bien
- ✅ Los textos son legibles

---

## 📊 Resumen de Pruebas

| #  | Prueba | Resultado | Notas |
|----|--------|-----------|-------|
| 1  | Crear Admin | ✅ |  |
| 2  | Registrar Aula | ✅ |  |
| 3  | Registrar Equipo | ✅ |  |
| 4  | Crear Profesor | ✅ |  |
| 5  | Profesor Reserva | ✅ |  |
| 6  | Crear Alumno | ✅ |  |
| 7  | Alumno Solicita | ✅ |  |
| 8  | Admin Aprueba | ✅ |  |
| 9  | Tiempo Real | ✅ |  |
| 10 | Responsivo | ✅ |  |

---

## 🐛 Si Algo No Funciona

### Error: \"Email already in use\"
- Intenta con un email diferente
- El email debe ser único en Firebase

### Error: \"Cannot read property of undefined\"
- Abre F12 (DevTools)
- Mira la consola para errores específicos
- Generalmente indica un campo no lleno

### Las aulas no aparecen al elegir
- Verifica que haya aulas registradas (Prueba 2)
- Recarga la página

### Los datos no se actualizan
- Verifica conexión a Firestore
- Revisa que no haya errores en DevTools
- Intenta cerrar sesión y volver a entrar

### Permiso denegado en Firestore
- Las reglas de Firestore podrían estar restrictivas
- Ve a Firebase Console y revisa las reglas
- Usa modo de prueba temporalmente (NO en producción)

---

## ✅ Checklist Final

Cuando completes todas las pruebas:

- [ ] Admin funciona completamente
- [ ] Profesor puede reservar
- [ ] Alumno puede solicitar
- [ ] las solicitudes se aprueban/rechazan
- [ ] Los datos en tiempo real funcionan
- [ ] Responsivo en móvil
- [ ] Sin errores en consola
- [ ] Alertas funcionan

¡Si todo esto funciona, tu sistema está 100% listo! 🎉

---

**Versión**: 1.0.0  
**Fecha**: Febrero 25, 2025

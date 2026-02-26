# 🎯 Guía de Inicio Rápido - Lab Reserva

## Primeros Pasos

### 1. Crear tu Cuenta de Administrador

1. Abre la aplicación en `http://localhost:5174`
2. Haz clic en "¿No tienes cuenta? Regístrate"
3. Ingresa un correo (ej: `admin@labreserva.com`)
4. Define una contraseña segura
5. **Selecciona el rol: "Administrador"**
6. Haz clic en "Registrarse"

### 2. Registrar Aulas

Una vez dentro como admin:

1. En el sidebar lateral, haz clic en **"🚪 Aulas"**
2. Haz clic en **"➕ Nueva Aula"**
3. Completa los campos:
   - **Nombre**: Ej. "Laboratorio A" o "Sala Control XR"
   - **Capacidad**: Número de personas (ej. 30)
   - **Equipo principal**: Selecciona el equipo principal disponible
4. Haz clic en "Registrar Aula"
5. ¡Listo! El aula aparecerá inmediatamente en la tabla

**Ejemplo de Aulas:**
```
Laboratorio A - 30 personas - Gafas RV
Sala Edición - 10 personas - Laptops  
Estudio 360° - 20 personas - Cámaras
Aula Múltiple - 50 personas - Múltiple
```

### 3. Registrar Equipos

En el mismo dashboard admin:

1. Haz clic en **"🥽 Inventario"**
2. Haz clic en **"➕ Nuevo Equipo"**
3. Completa los campos:
   - **Nombre**: Ej. "Meta Quest 3" o "Canon EOS R6"
   - **Categoría**: Elige entre las opciones disponibles
   - **Cantidad**: Cuántas unidades tienes (ej. 5)
   - **Estado**: Disponible, Mantenimiento o Inactivo
4. Haz clic en "Registrar Equipo"

**Categorías Disponibles:**
- Gafas RV
- Cámara
- Laptop
- Micrófono
- Otro

---

## 👥 Crear Usuarios de Prueba

### Usuario Profesor/Maestro

1. Abre una pestaña privada/incógnito
2. En la pantalla de login, regístrate con:
   - Correo: `profesor1@labreserva.com`
   - Contraseña: `profesor123`
   - Rol: **"Profesor/Maestro"**
3. El profesor ahora puede reservar aulas directamente

### Usuario Alumno/Estudiante

1. Abre otra pestaña privada/incógnito
2. En la pantalla de login, regístrate con:
   - Correo: `estudiante1@labreserva.com`
   - Contraseña: `estudiante123`
   - Rol: **"Estudiante"**
3. El estudiante ahora puede hacer solicitudes

---

## 📅 Diferentes Flujos por Rol

### Flujo MAESTRO (Profesor)

```
1. Inicia Sesión
         ↓
2. Ve el Dashboard
         ↓
3. Haz clic en "📅 Mis Reservas"
         ↓
4. Haz clic en "➕ Nueva Reserva"
         ↓
5. Selecciona Aula, Fecha, Horario, Propósito
         ↓
6. Confirma ✓
         ↓
7. La reserva aparece en tu listado
```

### Flujo ALUMNO (Estudiante)

```
1. Inicia Sesión
         ↓
2. Ve el Dashboard
         ↓
3. Haz clic en "📝 Mis Solicitudes"
         ↓
4. Haz clic en "➕ Nueva Solicitud"
         ↓
5. Elige Tipo (Aula/Equipo/Otro)
         ↓
6. Escribe descripción detallada
         ↓
7. (Opcional) Selecciona fecha solicitada
         ↓
8. Envía Solicitud
         ↓
9. Estado: "Pendiente" ⏳
         ↓
10. Espera aprobación del Admin...
```

### Flujo ADMIN (Aprobación de Solicitudes)

```
1. Inicia Sesión
         ↓
2. Ve el contador en el sidebar: "✅ Solicitudes (5)"
         ↓
3. Haz clic en la sección de Solicitudes
         ↓
4. Revisa cada solicitud pendiente
         ↓
5. Para cada una:
    - Lee los detalles
    - ¿Es apropiada? → Haz clic "✅ Aprobar"
    - ¿Hay problema? → Haz clic "❌ Rechazar"
         ↓
6. El sistema actualiza automáticamente
         ↓
7. El solicitante verá su solicitud aprobada/rechazada
```

---

## 🔐 Cuentas de Demostración Recomendadas

| Rol | Email | Contraseña | Permisos |
|-----|-------|-----------|----------|
| Admin | `admin@demo.com` | `admin123` | Todo ✅ |
| Profesor | `prof@demo.com` | `prof123` | Reservar directamente |
| Estudiante | `student@demo.com` | `student123` | Solo solicitar |

---

## 🎨 Cómo se Ve Según tu Rol

### Sidebar para Administrador 🏫 Lab Reserva
```
📊 Inicio
🚪 Aulas
🥽 Inventario
✅ Solicitudes (2)
---
admin@demo.com
[Cerrar Sesión]
```

### Sidebar para Profesor 🏫 Lab Reserva
```
📊 Inicio
📅 Mis Reservas
---
prof@demo.com
[Cerrar Sesión]
```

### Sidebar para Alumno 🏫 Lab Reserva
```
📊 Inicio
📝 Mis Solicitudes
---
student@demo.com
[Cerrar Sesión]
```

---

## ⚡ Características del Nuevo Diseño

✨ **Interfaz Profesional**
- Colores modernos y consistentes
- Diseño responsive (funciona en móviles)
- Animaciones suaves
- Gradientes atractivos

🔐 **Sistema de Roles Robusto**
- Permisos granulares por rol
- Vistas específicas según el usuario
- Seguridad completa

📱 **Funcionalidades Completas**
- Registro de aulas y equipos
- Reservas directas para profesores
- Sistema de solicitudes para alumnos
- Aprobación de solicitudes por admin
- Estados de solicitudes (Pendiente/Aprobada/Rechazada)

📊 **Dashboard Inteligente**
- Tarjetas con estadísticas relevantes
- Contador de solicitudes pendientes
- Tablas dinamicas con datos en tiempo real

---

## 🐛 Solución de Problemas

### "No me permite crear una aula"
✓ Verifica que hayas iniciado sesión como **ADMIN**
✓ Solo los administradores pueden crear aulas

### "Mi profesor no puede reservar"
✓ Verifica que esté registrado con rol **MAESTRO**
✓ Debe hacer clic en "📅 Mis Reservas" (no aparece para otros roles)

### "Mi solicitud no se envía"
✓ Verifica que escribas una descripción
✓ Asegúrate de estar registrado como **ALUMNO**

### "No veo el contador de solicitudes"
✓ Solo aparece si eres **ADMIN**
✓ Muestra el número de solicitudes pendientes

---

## 📞 Soporte y Contacto

Si encuentras algún problema o tienes sugerencias:
1. Revisa que tengas el rol correcto
2. Intenta cerrar sesión y volver a entrar
3. Limpia el caché del navegador (Ctrl + Shift + Del)
4. Verifica tu conexión a Firestore

---

## ✅ Checklist de Configuración

- [ ] Cuenta Admin creada
- [ ] Al menos 2 aulas registradas
- [ ] Al menos 3 equipos en inventario
- [ ] Cuenta Profesor creada y probada
- [ ] Cuenta Alumno creada y probada
- [ ] Profesor realizó una reserva exitosa
- [ ] Alumno realizó una solicitud exitosa
- [ ] Admin aprobó/rechazó una solicitud

¡Una vez completes este checklist, tu sistema estará 100% funcional! 🎉

**Versión**: 1.0.0  
**Fecha**: Febrero 25, 2025

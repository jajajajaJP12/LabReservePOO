# 🚀 Guía de Configuración y Ejecución - LabReservePOO

## Paso 1: Configurar Firebase (Backend)

Tu backend necesita las credenciales de Firebase para funcionar. Sigue estos pasos:

### 1.1 Ir a Firebase Console
1. Abre [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto **labreservepoo**
3. Ve a **Configuración del Proyecto** (engranaje en la esquina superior izquierda)
4. Selecciona la pestaña **Cuentas de servicio**
5. Haz clic en **Generar nueva clave privada**
6. Se descargará un archivo JSON

### 1.2 Copiar Credenciales
1. Abre el archivo JSON descargado
2. Copia TODO el contenido
3. Reemplaza el contenido de:
```
src/main/resources/serviceAccountKey.json
```

**Ubicación del archivo:**
```
/home/jawaclone/LabReservePoo/LabReservePOO/src/main/resources/serviceAccountKey.json
```

## Paso 2: Compilar Backend (ya hecho ✅)

```bash
cd /home/jawaclone/LabReservePoo/LabReservePOO
./gradlew build
```

El JAR compilado está en: `build/libs/LabReservePOO-1.0-SNAPSHOT.jar`

## Paso 3: Ejecutar Backend

```bash
cd /home/jawaclone/LabReservePoo/LabReservePOO
java -jar build/libs/LabReservePOO-1.0-SNAPSHOT.jar
```

**Salida esperada:**
```
Firebase inicializado correctamente.
✅ LabReservePOO Backend iniciado correctamente
El backend está listo para recibir solicitudes
```

## Paso 4: Ejecutar Frontend

En otra terminal:

```bash
cd /home/jawaclone/LabReservePoo/LabReservePOO/frontend
npm install  # Solo primera vez
npm run dev
```

**Salida esperada:**
```
VITE v5.4.21  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Paso 5: Acceder a la Aplicación

1. Abre tu navegador
2. Ve a: http://localhost:5173/
3. ¡Usa la aplicación! 🎉

## Estructura de Puertos

| Componente | Puerto | URL |
|-----------|--------|-----|
| Frontend (Vite) | 5173 | http://localhost:5173 |
| Backend (Java) | - | Sin puerto HTTP (usa Firestore) |
| Firestore | Cloud | Google Cloud |

## Solución de Problemas

### ❌ Error: "Invalid signature file digest"
- **Causa:** JAR con dependencias conflictivas  
- **Solución:** Ejecutar `./gradlew clean build`

### ❌ Error: "Invalid input length 21"
- **Causa:** `serviceAccountKey.json` incorrecta
- **Solución:** Verificar que el JSON esté completo y válido

### ❌ Error: "Cannot find firebase.js"
- **Causa:** Falta `npm install`
- **Solución:** Ejecutar `npm install` en carpeta `frontend/`

### ❌ VITE error 254
- **Causa:** Puerto 5173 ocupado
- **Solución:** Matar procesos en ese puerto o cambiar puerto en `vite.config.js`

## Comandos Rápidos

```bash
# Compilar backend
cd /home/jawaclone/LabReservePoo/LabReservePOO && ./gradlew build

# Ejecutar backend
java -jar /home/jawaclone/LabReservePoo/LabReservePOO/build/libs/LabReservePOO-1.0-SNAPSHOT.jar

# Ejecutar frontend
cd /home/jawaclone/LabReservePoo/LabReservePOO/frontend && npm run dev
```

## Arquitectura del Sistema

```
┌─────────────────────────────┐
│   Frontend (React + Vite)   │ ← http://localhost:5173
│  localhost:5173             │
└──────────────┬──────────────┘
               │ (Firebase SDK)
┌──────────────▼──────────────┐
│  Firestore Database (Cloud) │
└──────────────^──────────────┘
               │ (Firebase Admin SDK)
┌──────────────┴──────────────┐
│  Backend (Java MainApp)     │
│ - Servicios de Negocio      │
│ - Repositorios              │
│ - Validaciones              │
└─────────────────────────────┘
```

## Siguientes Pasos

1. ✅ Backend compilado y listo
2. ✅ Frontend lista
3. ⏳ **Obtener credenciales Firebase** ← TU TURNO
4. ⏳ Ejecutar ambos servidores
5. ⏳ Probar funcionalidades

---

**En caso de problemas, revisa los logs de la terminal del backend y frontend.**

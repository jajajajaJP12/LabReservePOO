/**
 * Script único para crear el código de acceso inicial en Firestore.
 * Ejecutar con: node seedAccessGate.js
 * 
 * Este script crea un código de acceso en la colección "access_gates"
 * que los usuarios deben ingresar antes de poder ver la pantalla de login.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDwPfH4q1flqXfY7UisE7sMfTgL2Y21PyM",
    authDomain: "labreservepoo.firebaseapp.com",
    projectId: "labreservepoo",
    storageBucket: "labreservepoo.firebasestorage.app",
    messagingSenderId: "512402225038",
    appId: "1:512402225038:web:dffa491fed18caf11496df"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seedAccessGate() {
    try {
        // Código de acceso institucional por defecto
        const accessGateData = {
            codigoAcceso: "EDTECH2025",
            activo: true,
            fechaCreacion: new Date().toISOString(),
            fechaExpiracion: null,  // Sin expiración (permanente)
            creadoPor: "system",
            maxUsos: 0,             // 0 = ilimitado
            usosActuales: 0,
            descripcion: "Código de acceso institucional principal - Semestre 2025",
            tipoAcceso: "general"
        };

        await setDoc(doc(db, "access_gates", "main_gate"), accessGateData);
        console.log("✅ Código de acceso creado exitosamente!");
        console.log("──────────────────────────────────────");
        console.log("📋 Código: EDTECH2025");
        console.log("📝 Descripción:", accessGateData.descripcion);
        console.log("🔓 Tipo: General (todos los roles)");
        console.log("♾️  Usos: Ilimitados");
        console.log("──────────────────────────────────────");
        console.log("\nLos usuarios ahora pueden usar este código para acceder al sistema.");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error creando código de acceso:", error);
        process.exit(1);
    }
}

seedAccessGate();

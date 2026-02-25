package com.labreserve.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

import java.util.HashMap;
import java.util.Map;

public class FirestoreTestService {

    public static void saveTestDocument() {
        try {
            Firestore db = FirestoreClient.getFirestore();

            Map<String, Object> data = new HashMap<>();
            data.put("mensaje", "Hola Firestore desde LabReservePOO calando ahora");
            data.put("fecha", System.currentTimeMillis());
            data.put("estado", "OK Todo Bien");

            db.collection("tests").document("conexion").set(data).get();

            System.out.println("Documento guardado en Firestore (tests/conexion)");

        } catch (Exception e) {
            System.out.println("Error guardando en Firestore: " + e.getMessage());
        }
    }
}
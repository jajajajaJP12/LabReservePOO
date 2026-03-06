package com.labreserve.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.labreserve.model.AccessGate;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * Repositorio para operaciones CRUD con los códigos de acceso (Access Gate)
 * Colección en Firestore: "access_gates"
 */
@SuppressWarnings("all")
public class AccessGateRepository extends BaseRepository {

    public AccessGateRepository() {
        super("access_gates");
    }

    /**
     * Guarda un nuevo código de acceso
     */
    public boolean guardarAccessGate(String id, AccessGate accessGate) {
        return guardar(id, accessGate);
    }

    /**
     * Obtiene un Access Gate por su ID
     */
    public AccessGate obtenerAccessGatePorId(String id) {
        DocumentSnapshot doc = super.obtenerPorId(id);
        if (doc != null && doc.exists()) {
            AccessGate gate = doc.toObject(AccessGate.class);
            if (gate != null) {
                gate.setId(doc.getId());
            }
            return gate;
        }
        return null;
    }

    /**
     * Busca un código de acceso por su código
     */
    public AccessGate buscarPorCodigo(String codigo) {
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("codigoAcceso", codigo)
                    .whereEqualTo("activo", true)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            if (!documents.isEmpty()) {
                AccessGate gate = documents.get(0).toObject(AccessGate.class);
                gate.setId(documents.get(0).getId());
                return gate;
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error buscando código de acceso: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error buscando código de acceso: " + e.getMessage());
        }
        return null;
    }

    /**
     * Obtiene todos los códigos de acceso activos
     */
    public List<AccessGate> obtenerActivos() {
        List<AccessGate> gates = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("activo", true)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                AccessGate gate = doc.toObject(AccessGate.class);
                gate.setId(doc.getId());
                gates.add(gate);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo códigos activos: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo códigos activos: " + e.getMessage());
        }
        return gates;
    }

    /**
     * Obtiene todos los códigos de acceso (activos e inactivos)
     */
    public List<AccessGate> obtenerTodos() {
        List<AccessGate> gates = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName).get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                AccessGate gate = doc.toObject(AccessGate.class);
                gate.setId(doc.getId());
                gates.add(gate);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo todos los códigos: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo todos los códigos: " + e.getMessage());
        }
        return gates;
    }

    /**
     * Incrementa el contador de usos de un código
     */
    public boolean incrementarUso(String id) {
        try {
            AccessGate gate = obtenerAccessGatePorId(id);
            if (gate != null) {
                gate.registrarUso();
                db.collection(collectionName).document(id)
                        .update("usosActuales", gate.getUsosActuales()).get();
                System.out.println("Uso registrado para código de acceso: " + id);
                return true;
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error incrementando uso: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error incrementando uso: " + e.getMessage());
        }
        return false;
    }

    /**
     * Desactiva un código de acceso
     */
    public boolean desactivar(String id) {
        try {
            db.collection(collectionName).document(id)
                    .update("activo", false).get();
            System.out.println("Código de acceso desactivado: " + id);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error desactivando código: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error desactivando código: " + e.getMessage());
            return false;
        }
    }

    /**
     * Activa un código de acceso
     */
    public boolean activar(String id) {
        try {
            db.collection(collectionName).document(id)
                    .update("activo", true).get();
            System.out.println("Código de acceso activado: " + id);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error activando código: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error activando código: " + e.getMessage());
            return false;
        }
    }
}

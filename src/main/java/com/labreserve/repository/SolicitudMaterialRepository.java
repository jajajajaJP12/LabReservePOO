package com.labreserve.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.labreserve.model.SolicitudMaterial;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@SuppressWarnings("all")
public class SolicitudMaterialRepository extends BaseRepository {

    public SolicitudMaterialRepository() {
        super("solicitudes_material");
    }

    /**
     * Guarda una nueva solicitud de material
     */
    public boolean guardarSolicitud(String id, SolicitudMaterial solicitud) {
        return guardar(id, solicitud);
    }

    /**
     * Obtiene una solicitud por ID
     */
    public SolicitudMaterial obtenerSolicitudPorId(String id) {
        DocumentSnapshot doc = super.obtenerPorId(id);
        if (doc != null && doc.exists()) {
            return doc.toObject(SolicitudMaterial.class);
        }
        return null;
    }

    /**
     * Obtiene todas las solicitudes pendientes
     */
    public List<SolicitudMaterial> obtenerPendientes() {
        List<SolicitudMaterial> solicitudes = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("estado", "Pendiente")
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                SolicitudMaterial sol = doc.toObject(SolicitudMaterial.class);
                sol.setId(doc.getId());
                solicitudes.add(sol);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo solicitudes pendientes: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo solicitudes pendientes: " + e.getMessage());
        }
        return solicitudes;
    }

    /**
     * Obtiene todas las solicitudes de un usuario
     */
    public List<SolicitudMaterial> obtenerPorUsuario(String email) {
        List<SolicitudMaterial> solicitudes = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("solicitadoPor", email)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                SolicitudMaterial sol = doc.toObject(SolicitudMaterial.class);
                sol.setId(doc.getId());
                solicitudes.add(sol);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo solicitudes del usuario: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo solicitudes del usuario: " + e.getMessage());
        }
        return solicitudes;
    }

    /**
     * Obtiene solicitudes aprobadas sin devolver
     */
    public List<SolicitudMaterial> obtenerAprobadasSinDevolver() {
        List<SolicitudMaterial> solicitudes = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("estado", "Aprobada")
                    .whereEqualTo("devuelto", false)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                SolicitudMaterial sol = doc.toObject(SolicitudMaterial.class);
                sol.setId(doc.getId());
                solicitudes.add(sol);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo solicitudes sin devolver: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo solicitudes sin devolver: " + e.getMessage());
        }
        return solicitudes;
    }

    /**
     * Actualiza el estado de una solicitud
     */
    public boolean actualizarEstado(String id, String nuevoEstado) {
        try {
            db.collection(collectionName).document(id).update("estado", nuevoEstado).get();
            System.out.println("Estado de la solicitud " + id + " actualizado a: " + nuevoEstado);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error actualizando estado de solicitud: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error actualizando estado de solicitud: " + e.getMessage());
            return false;
        }
    }

    /**
     * Marca una solicitud como devuelta
     */
    public boolean marcarComoDevuelta(String id) {
        try {
            db.collection(collectionName).document(id).update("devuelto", true).get();
            System.out.println("Solicitud " + id + " marcada como devuelta");
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error marcando solicitud como devuelta: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error marcando solicitud como devuelta: " + e.getMessage());
            return false;
        }
    }

    /**
     * Obtiene solicitudes atrasadas
     */
    public List<SolicitudMaterial> obtenerAtrasadas() {
        List<SolicitudMaterial> solicitudes = obtenerAprobadasSinDevolver();
        List<SolicitudMaterial> atrasadas = new ArrayList<>();
        
        for (SolicitudMaterial sol : solicitudes) {
            if (sol.esAtrasada()) {
                atrasadas.add(sol);
            }
        }
        
        return atrasadas;
    }
}

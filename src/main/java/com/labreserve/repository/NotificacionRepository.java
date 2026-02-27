package com.labreserve.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.labreserve.model.Notificacion;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@SuppressWarnings("all")
public class NotificacionRepository extends BaseRepository {

    public NotificacionRepository() {
        super("notificaciones");
    }

    /**
     * Guarda una nueva notificación
     */
    public boolean guardarNotificacion(String id, Notificacion notificacion) {
        return guardar(id, notificacion);
    }

    /**
     * Obtiene una notificación por ID
     */
    public Notificacion obtenerNotificacionPorId(String id) {
        DocumentSnapshot doc = super.obtenerPorId(id);
        if (doc != null && doc.exists()) {
            return doc.toObject(Notificacion.class);
        }
        return null;
    }

    /**
     * Obtiene notificaciones de un usuario
     */
    public List<Notificacion> obtenerPorUsuario(String email) {
        List<Notificacion> notificaciones = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("para", email)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Notificacion notif = doc.toObject(Notificacion.class);
                notif.setId(doc.getId());
                notificaciones.add(notif);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo notificaciones: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo notificaciones: " + e.getMessage());
        }
        return notificaciones;
    }

    /**
     * Obtiene notificaciones no leídas de un usuario
     */
    public List<Notificacion> obtenerNoLeidasPorUsuario(String email) {
        List<Notificacion> notificaciones = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("para", email)
                    .whereEqualTo("leida", false)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Notificacion notif = doc.toObject(Notificacion.class);
                notif.setId(doc.getId());
                notificaciones.add(notif);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo notificaciones no leídas: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo notificaciones no leídas: " + e.getMessage());
        }
        return notificaciones;
    }

    /**
     * Obtiene notificaciones por tipo
     */
    public List<Notificacion> obtenerPorTipo(String tipo) {
        List<Notificacion> notificaciones = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("tipo", tipo)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Notificacion notif = doc.toObject(Notificacion.class);
                notif.setId(doc.getId());
                notificaciones.add(notif);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo notificaciones por tipo: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo notificaciones por tipo: " + e.getMessage());
        }
        return notificaciones;
    }

    /**
     * Obtiene notificaciones de alta prioridad
     */
    public List<Notificacion> obtenerAltaPrioridad() {
        List<Notificacion> notificaciones = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("prioridad", "alta")
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Notificacion notif = doc.toObject(Notificacion.class);
                notif.setId(doc.getId());
                notificaciones.add(notif);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo notificaciones de alta prioridad: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo notificaciones de alta prioridad: " + e.getMessage());
        }
        return notificaciones;
    }

    /**
     * Marca una notificación como leída
     */
    public boolean marcarComoLeida(String id) {
        try {
            db.collection(collectionName).document(id).update("leida", true).get();
            System.out.println("Notificación " + id + " marcada como leída");
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error marcando notificación como leída: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error marcando notificación como leída: " + e.getMessage());
            return false;
        }
    }

    /**
     * Obtiene el contador de notificaciones no leídas
     */
    public long contarNoLeidasPorUsuario(String email) {
        return obtenerNoLeidasPorUsuario(email).size();
    }
}

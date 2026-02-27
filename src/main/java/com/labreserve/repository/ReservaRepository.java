package com.labreserve.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.labreserve.model.Reserva;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@SuppressWarnings("all")
public class ReservaRepository extends BaseRepository {

    public ReservaRepository() {
        super("reservas");
    }

    /**
     * Guarda una nueva reserva
     */
    public boolean guardarReserva(String id, Reserva reserva) {
        return guardar(id, reserva);
    }

    /**
     * Obtiene una reserva por ID
     */
    public Reserva obtenerReservaPorId(String id) {
        DocumentSnapshot doc = super.obtenerPorId(id);
        if (doc != null && doc.exists()) {
            return doc.toObject(Reserva.class);
        }
        return null;
    }

    /**
     * Obtiene reservas de un usuario
     */
    public List<Reserva> obtenerPorUsuario(String email) {
        List<Reserva> reservas = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("usuarioEmail", email)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Reserva reserva = doc.toObject(Reserva.class);
                reserva.setId(doc.getId());
                reservas.add(reserva);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo reservas del usuario: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo reservas del usuario: " + e.getMessage());
        }
        return reservas;
    }

    /**
     * Obtiene reservas de un aula
     */
    public List<Reserva> obtenerPorAula(String aulaId) {
        List<Reserva> reservas = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("aulaId", aulaId)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Reserva reserva = doc.toObject(Reserva.class);
                reserva.setId(doc.getId());
                reservas.add(reserva);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo reservas del aula: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo reservas del aula: " + e.getMessage());
        }
        return reservas;
    }

    /**
     * Obtiene reservas confirmadas
     */
    public List<Reserva> obtenerConfirmadas() {
        List<Reserva> reservas = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("estado", "Confirmada")
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Reserva reserva = doc.toObject(Reserva.class);
                reserva.setId(doc.getId());
                reservas.add(reserva);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo reservas confirmadas: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo reservas confirmadas: " + e.getMessage());
        }
        return reservas;
    }

    /**
     * Actualiza el estado de una reserva
     */
    public boolean actualizarEstado(String id, String nuevoEstado) {
        try {
            db.collection(collectionName).document(id).update("estado", nuevoEstado).get();
            System.out.println("Estado de la reserva " + id + " actualizado a: " + nuevoEstado);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error actualizando estado de reserva: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error actualizando estado de reserva: " + e.getMessage());
            return false;
        }
    }

    /**
     * Cancela una reserva
     */
    public boolean cancelarReserva(String id, String motivo) {
        try {
            db.collection(collectionName).document(id)
                    .update("estado", "Cancelada", "motivoCancelacion", motivo)
                    .get();
            System.out.println("Reserva " + id + " cancelada");
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error cancelando reserva: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error cancelando reserva: " + e.getMessage());
            return false;
        }
    }
}

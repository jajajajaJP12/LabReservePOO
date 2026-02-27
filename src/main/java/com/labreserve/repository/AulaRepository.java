package com.labreserve.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.labreserve.model.Aula;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@SuppressWarnings("all")
public class AulaRepository extends BaseRepository {

    public AulaRepository() {
        super("aulas");
    }

    /**
     * Guarda una nueva aula
     */
    public boolean guardarAula(String id, Aula aula) {
        return guardar(id, aula);
    }

    /**
     * Obtiene un aula por ID
     */
    public Aula obtenerAulaPorId(String id) {
        DocumentSnapshot doc = super.obtenerPorId(id);
        if (doc != null && doc.exists()) {
            return doc.toObject(Aula.class);
        }
        return null;
    }

    /**
     * Obtiene todas las aulas disponibles
     */
    public List<Aula> obtenerDisponibles() {
        List<Aula> aulas = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("disponible", true)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Aula aula = doc.toObject(Aula.class);
                aula.setId(doc.getId());
                aulas.add(aula);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo aulas disponibles: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo aulas disponibles: " + e.getMessage());
        }
        return aulas;
    }

    /**
     * Obtiene todas las aulas
     */
    public List<Aula> obtenerTodas() {
        List<Aula> aulas = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName).get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Aula aula = doc.toObject(Aula.class);
                aula.setId(doc.getId());
                aulas.add(aula);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo aulas: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo aulas: " + e.getMessage());
        }
        return aulas;
    }

    /**
     * Obtiene aulas por edificio
     */
    public List<Aula> obtenerPorEdificio(String edificio) {
        List<Aula> aulas = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("edificio", edificio)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Aula aula = doc.toObject(Aula.class);
                aula.setId(doc.getId());
                aulas.add(aula);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo aulas por edificio: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo aulas por edificio: " + e.getMessage());
        }
        return aulas;
    }

    /**
     * Actualiza el estado de un aula
     */
    public boolean actualizarEstado(String id, String nuevoEstado) {
        try {
            db.collection(collectionName).document(id).update("estado", nuevoEstado).get();
            System.out.println("Estado del aula " + id + " actualizado a: " + nuevoEstado);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error actualizando estado del aula: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error actualizando estado del aula: " + e.getMessage());
            return false;
        }
    }

    /**
     * Actualiza la disponibilidad de un aula
     */
    public boolean actualizarDisponibilidad(String id, boolean disponible) {
        try {
            db.collection(collectionName).document(id).update("disponible", disponible).get();
            System.out.println("Disponibilidad del aula " + id + " actualizada a: " + disponible);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error actualizando disponibilidad: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error actualizando disponibilidad: " + e.getMessage());
            return false;
        }
    }
}

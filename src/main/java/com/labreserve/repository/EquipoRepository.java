package com.labreserve.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.labreserve.model.Equipo;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * Repositorio para operaciones con equipos
 */
@SuppressWarnings("all")
public class EquipoRepository extends BaseRepository {

    public EquipoRepository() {
        super("equipos");
    }

    /**
     * Guarda un nuevo equipo
     */
    public boolean guardarEquipo(String id, Equipo equipo) {
        return guardar(id, equipo);
    }

    /**
     * Obtiene un equipo por ID (sobrescribe el método de BaseRepository)
     */
    public Equipo obtenerEquipoPorId(String id) {
        DocumentSnapshot doc = super.obtenerPorId(id);
        if (doc != null && doc.exists()) {
            Equipo equipo = doc.toObject(Equipo.class);
            if (equipo != null) {
                equipo.setId(doc.getId());
            }
            return equipo;
        }
        return null;
    }

    /**
     * Obtiene todos los equipos disponibles
     */
    public List<Equipo> obtenerDisponibles() {
        List<Equipo> equipos = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("estado", "Disponible")
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Equipo equipo = doc.toObject(Equipo.class);
                equipo.setId(doc.getId());
                equipos.add(equipo);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo equipos disponibles: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo equipos disponibles: " + e.getMessage());
        }
        return equipos;
    }

    /**
     * Obtiene todos los equipos de una categoría
     */
    public List<Equipo> obtenerPorCategoria(String categoria) {
        List<Equipo> equipos = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("categoria", categoria)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Equipo equipo = doc.toObject(Equipo.class);
                equipo.setId(doc.getId());
                equipos.add(equipo);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo equipos por categoría: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo equipos por categoría: " + e.getMessage());
        }
        return equipos;
    }

    /**
     * Obtiene todos los equipos
     */
    public List<Equipo> obtenerTodos() {
        List<Equipo> equipos = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName).get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Equipo equipo = doc.toObject(Equipo.class);
                equipo.setId(doc.getId());
                equipos.add(equipo);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo equipos: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo equipos: " + e.getMessage());
        }
        return equipos;
    }

    /**
     * Actualiza la cantidad de un equipo
     */
    public boolean actualizarCantidad(String id, int nuevaCantidad) {
        try {
            db.collection(collectionName).document(id).update("cantidad", nuevaCantidad).get();
            System.out.println("Cantidad del equipo " + id + " actualizada a: " + nuevaCantidad);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error actualizando cantidad: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error actualizando cantidad: " + e.getMessage());
            return false;
        }
    }

    /**
     * Actualiza el estado de un equipo
     */
    public boolean actualizarEstado(String id, String nuevoEstado) {
        try {
            db.collection(collectionName).document(id).update("estado", nuevoEstado).get();
            System.out.println("Estado del equipo " + id + " actualizado a: " + nuevoEstado);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error actualizando estado: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error actualizando estado: " + e.getMessage());
            return false;
        }
    }
}

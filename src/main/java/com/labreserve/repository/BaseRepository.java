package com.labreserve.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

import java.util.concurrent.ExecutionException;

/**
 * Clase base para los repositorios con operaciones CRUD comunes
 */
@SuppressWarnings("all")
public abstract class BaseRepository {

    protected Firestore db;
    protected String collectionName;

    protected BaseRepository(String collectionName) {
        this.db = FirestoreClient.getFirestore();
        this.collectionName = collectionName;
    }

    /**
     * Guarda un documento con un ID específico
     */
    public <T> boolean guardar(String id, T documento) {
        try {
            db.collection(collectionName).document(id).set(documento).get();
            System.out.println(collectionName + ": Documento guardado con ID: " + id);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error guardando en " + collectionName + ": " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error guardando en " + collectionName + ": " + e.getMessage());
            return false;
        }
    }

    /**
     * Actualiza un documento existente
     */
    public <T> boolean actualizar(String id, T datos) {
        try {
            db.collection(collectionName).document(id).update("data", datos).get();
            System.out.println(collectionName + ": Documento actualizado: " + id);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error actualizando en " + collectionName + ": " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error actualizando en " + collectionName + ": " + e.getMessage());
            return false;
        }
    }

    /**
     * Obtiene un documento por ID
     */
    public DocumentSnapshot obtenerPorId(String id) {
        try {
            ApiFuture<DocumentSnapshot> future = db.collection(collectionName).document(id).get();
            return future.get();
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo documento de " + collectionName + ": " + e.getMessage());
            return null;
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo documento de " + collectionName + ": " + e.getMessage());
            return null;
        }
    }

    /**
     * Elimina un documento
     */
    public boolean eliminar(String id) {
        try {
            db.collection(collectionName).document(id).delete().get();
            System.out.println(collectionName + ": Documento eliminado: " + id);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error eliminando de " + collectionName + ": " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error eliminando de " + collectionName + ": " + e.getMessage());
            return false;
        }
    }

    /**
     * Verifica si existe un documento
     */
    public boolean existe(String id) {
        DocumentSnapshot doc = obtenerPorId(id);
        return doc != null && doc.exists();
    }

    /**
     * Genera un nuevo ID de documento
     */
    public String generarId() {
        DocumentReference ref = db.collection(collectionName).document();
        return ref.getId();
    }

    /**
     * Obtiene la colección de Firestore
     */
    public Firestore getDb() {
        return db;
    }

    /**
     * Obtiene el nombre de la colección
     */
    public String getCollectionName() {
        return collectionName;
    }
}

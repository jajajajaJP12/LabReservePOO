package com.labreserve.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.labreserve.model.Usuario;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

/**
 * Repositorio para operaciones con usuarios
 */
@SuppressWarnings("all")
public class UsuarioRepository extends BaseRepository {

    public UsuarioRepository() {
        super("usuarios");
    }

    /**
     * Guarda un nuevo usuario
     */
    public boolean guardarUsuario(String id, Usuario usuario) {
        return guardar(id, usuario);
    }

    /**
     * Obtiene un usuario por ID (sobrescribe el método de BaseRepository)
     */
    public Usuario obtenerUsuarioPorId(String id) {
        DocumentSnapshot doc = super.obtenerPorId(id);
        if (doc != null && doc.exists()) {
            Usuario usuario = doc.toObject(Usuario.class);
            if (usuario != null) {
                usuario.setId(doc.getId());
            }
            return usuario;
        }
        return null;
    }

    /**
     * Obtiene un usuario por email
     */
    public Usuario obtenerPorEmail(String email) {
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("email", email)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            if (!documents.isEmpty()) {
                Usuario usuario = documents.get(0).toObject(Usuario.class);
                usuario.setId(documents.get(0).getId());
                return usuario;
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error buscando usuario por email: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error buscando usuario por email: " + e.getMessage());
        }
        return null;
    }

    /**
     * Obtiene todos los usuarios de un rol específico
     */
    public List<Usuario> obtenerPorRol(String rol) {
        List<Usuario> usuarios = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("rol", rol)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Usuario usuario = doc.toObject(Usuario.class);
                usuario.setId(doc.getId());
                usuarios.add(usuario);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo usuarios por rol: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo usuarios por rol: " + e.getMessage());
        }
        return usuarios;
    }

    /**
     * Activa o desactiva un usuario
     */
    public boolean cambiarEstadoActivo(String id, boolean activo) {
        try {
            db.collection(collectionName).document(id).update("activo", activo).get();
            System.out.println("Usuario " + id + " estado actualizado a: " + activo);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error actualizando estado del usuario: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error actualizando estado del usuario: " + e.getMessage());
            return false;
        }
    }

    /**
     * Obtiene todos los usuarios activos
     */
    public List<Usuario> obtenerActivos() {
        List<Usuario> usuarios = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> query = db.collection(collectionName)
                    .whereEqualTo("activo", true)
                    .get();
            List<QueryDocumentSnapshot> documents = query.get().getDocuments();
            for (QueryDocumentSnapshot doc : documents) {
                Usuario usuario = doc.toObject(Usuario.class);
                usuario.setId(doc.getId());
                usuarios.add(usuario);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error obteniendo usuarios activos: " + e.getMessage());
        } catch (ExecutionException e) {
            System.out.println("Error obteniendo usuarios activos: " + e.getMessage());
        }
        return usuarios;
    }

    /**
     * Actualiza el rol de un usuario
     */
    public boolean actualizarRol(String id, String nuevoRol) {
        try {
            db.collection(collectionName).document(id).update("rol", nuevoRol).get();
            System.out.println("Rol del usuario " + id + " actualizado a: " + nuevoRol);
            return true;
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Error actualizando rol: " + e.getMessage());
            return false;
        } catch (ExecutionException e) {
            System.out.println("Error actualizando rol: " + e.getMessage());
            return false;
        }
    }
}

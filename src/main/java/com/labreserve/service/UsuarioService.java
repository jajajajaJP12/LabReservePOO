package com.labreserve.service;

import com.labreserve.model.Usuario;
import com.labreserve.repository.UsuarioRepository;

import java.util.List;

/**
 * Servicio de lógica de negocio para gestión de usuarios
 */
@SuppressWarnings("all")
public class UsuarioService {

    private UsuarioRepository usuarioRepository;

    public UsuarioService() {
        this.usuarioRepository = new UsuarioRepository();
    }

    /**
     * Crea o registra un nuevo usuario
     */
    public boolean crearUsuario(String id, Usuario usuario) {
        // Validar que el email no exista
        Usuario existente = usuarioRepository.obtenerPorEmail(usuario.getEmail());
        if (existente != null) {
            System.out.println("El usuario con email " + usuario.getEmail() + " ya existe");
            return false;
        }

        usuario.setId(id);
        return usuarioRepository.guardarUsuario(id, usuario);
    }

    /**
     * Obtiene un usuario por email
     */
    public Usuario obtenerPorEmail(String email) {
        return usuarioRepository.obtenerPorEmail(email);
    }

    /**
     * Obtiene un usuario por ID
     */
    public Usuario obtenerPorId(String id) {
        return usuarioRepository.obtenerUsuarioPorId(id);
    }

    /**
     * Obtiene todos los usuarios de un rol específico
     */
    public List<Usuario> obtenerPorRol(String rol) {
        return usuarioRepository.obtenerPorRol(rol);
    }

    /**
     * Obtiene todos los usuarios activos
     */
    public List<Usuario> obtenerActivos() {
        return usuarioRepository.obtenerActivos();
    }

    /**
     * Obtiene todos los maestros
     */
    public List<Usuario> obtenerMaestros() {
        return obtenerPorRol("maestro");
    }

    /**
     * Obtiene todos los alumnos
     */
    public List<Usuario> obtenerAlumnos() {
        return obtenerPorRol("alumno");
    }

    /**
     * Obtiene todos los administradores
     */
    public List<Usuario> obtenerAdmins() {
        return obtenerPorRol("admin");
    }

    /**
     * Actualiza el rol de un usuario
     */
    public boolean actualizarRol(String id, String nuevoRol) {
        // Validar que el rol sea válido
        if (!esRolValido(nuevoRol)) {
            System.out.println("Rol no válido: " + nuevoRol);
            return false;
        }

        return usuarioRepository.actualizarRol(id, nuevoRol);
    }

    /**
     * Activa un usuario
     */
    public boolean activarUsuario(String id) {
        return usuarioRepository.cambiarEstadoActivo(id, true);
    }

    /**
     * Desactiva un usuario
     */
    public boolean desactivarUsuario(String id) {
        return usuarioRepository.cambiarEstadoActivo(id, false);
    }

    /**
     * Verifica si un rol es válido
     */
    private boolean esRolValido(String rol) {
        return rol.equalsIgnoreCase("admin") ||
                rol.equalsIgnoreCase("maestro") ||
                rol.equalsIgnoreCase("alumno");
    }

    /**
     * Obtiene el nombre del rol en español
     */
    public String getNombreRol(String rol) {
        switch (rol.toLowerCase()) {
            case "admin":
                return "Administrador";
            case "maestro":
                return "Profesor";
            case "alumno":
                return "Alumno";
            default:
                return "Desconocido";
        }
    }

    /**
     * Verifica si un usuario es administrador
     */
    public boolean esAdmin(String id) {
        Usuario usuario = obtenerPorId(id);
        return usuario != null && usuario.esAdmin();
    }

    /**
     * Verifica si un usuario es maestro
     */
    public boolean esMaestro(String id) {
        Usuario usuario = obtenerPorId(id);
        return usuario != null && usuario.esMaestro();
    }

    /**
     * Verifica si un usuario es alumno
     */
    public boolean esAlumno(String id) {
        Usuario usuario = obtenerPorId(id);
        return usuario != null && usuario.esAlumno();
    }
}

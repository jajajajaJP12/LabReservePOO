package com.labreserve.service;

import com.labreserve.model.Equipo;
import com.labreserve.repository.EquipoRepository;

import java.util.List;

/**
 * Servicio de lógica de negocio para gestión de equipos
 */
@SuppressWarnings("all")
public class EquipoService {

    private EquipoRepository equipoRepository;

    public EquipoService() {
        this.equipoRepository = new EquipoRepository();
    }

    /**
     * Registra un nuevo equipo
     */
    public boolean registrarEquipo(String id, Equipo equipo) {
        equipo.setId(id);
        return equipoRepository.guardarEquipo(id, equipo);
    }

    /**
     * Obtiene un equipo por ID
     */
    public Equipo obtenerPorId(String id) {
        return equipoRepository.obtenerEquipoPorId(id);
    }

    /**
     * Obtiene todos los equipos disponibles
     */
    public List<Equipo> obtenerDisponibles() {
        return equipoRepository.obtenerDisponibles();
    }

    /**
     * Obtiene todos los equipos de una categoría
     */
    public List<Equipo> obtenerPorCategoria(String categoria) {
        return equipoRepository.obtenerPorCategoria(categoria);
    }

    /**
     * Obtiene todos los equipos
     */
    public List<Equipo> obtenerTodos() {
        return equipoRepository.obtenerTodos();
    }

    /**
     * Actualiza la cantidad de un equipo
     */
    public boolean actualizarCantidad(String id, int nuevaCantidad) {
        return equipoRepository.actualizarCantidad(id, Math.max(0, nuevaCantidad));
    }

    /**
     * Incrementa la cantidad de un equipo
     */
    public boolean incrementarCantidad(String id, int cantidad) {
        Equipo equipo = obtenerPorId(id);
        if (equipo == null) return false;
        return actualizarCantidad(id, equipo.getCantidad() + cantidad);
    }

    /**
     * Decrementa la cantidad de un equipo
     */
    public boolean decrementarCantidad(String id, int cantidad) {
        Equipo equipo = obtenerPorId(id);
        if (equipo == null) return false;
        
        if (equipo.getCantidad() < cantidad) {
            System.out.println("No hay suficiente cantidad del equipo " + id);
            return false;
        }
        
        return actualizarCantidad(id, equipo.getCantidad() - cantidad);
    }

    /**
     * Actualiza el estado de un equipo
     */
    public boolean actualizarEstado(String id, String nuevoEstado) {
        return equipoRepository.actualizarEstado(id, nuevoEstado);
    }

    /**
     * Marca un equipo como en mantenimiento
     */
    public boolean marcarEnMantenimiento(String id) {
        return actualizarEstado(id, "Mantenimiento");
    }

    /**
     * Marca un equipo como disponible
     */
    public boolean marcarDisponible(String id) {
        return actualizarEstado(id, "Disponible");
    }

    /**
     * Marca un equipo como dañado
     */
    public boolean marcarDanado(String id) {
        return actualizarEstado(id, "Dañado");
    }

    /**
     * Verifica si hay suficiente cantidad disponible
     */
    public boolean haySuficienteCantidad(String id, int cantidad) {
        Equipo equipo = obtenerPorId(id);
        return equipo != null && equipo.getCantidad() >= cantidad && equipo.estaDisponible();
    }

    /**
     * Obtiene el nombre de la categoría en español
     */
    public String getNombreCategoria(String categoria) {
        switch (categoria.toLowerCase()) {
            case "dispositivos":
                return "Dispositivos";
            case "ra":
                return "Realidad Aumentada";
            case "equipos":
                return "Equipos";
            case "herramientas":
                return "Herramientas";
            default:
                return categoria;
        }
    }

    /**
     * Obtiene el nombre del estado en español
     */
    public String getNombreEstado(String estado) {
        switch (estado.toLowerCase()) {
            case "disponible":
                return "Disponible";
            case "mantenimiento":
                return "En Mantenimiento";
            case "danado":
                return "Dañado";
            default:
                return estado;
        }
    }
}

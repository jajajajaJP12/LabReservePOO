package com.labreserve.service;

import com.labreserve.model.AccessGate;
import com.labreserve.repository.AccessGateRepository;

import java.util.List;

/**
 * Servicio de lógica de negocio para el Access Gate (Puerta de Acceso de Seguridad)
 * Gestiona la validación y administración de códigos de acceso institucionales.
 */
@SuppressWarnings("all")
public class AccessGateService {

    private AccessGateRepository accessGateRepository;

    public AccessGateService() {
        this.accessGateRepository = new AccessGateRepository();
    }

    /**
     * Valida un código de acceso ingresado por el usuario
     * @return true si el código es válido y está activo
     */
    public boolean validarCodigo(String codigo) {
        if (codigo == null || codigo.trim().isEmpty()) {
            System.out.println("⛔ Access Gate: Código vacío recibido");
            return false;
        }

        AccessGate gate = accessGateRepository.buscarPorCodigo(codigo.trim());
        
        if (gate == null) {
            System.out.println("⛔ Access Gate: Código no encontrado: " + codigo);
            return false;
        }

        if (!gate.esValido()) {
            System.out.println("⛔ Access Gate: Código expirado o desactivado: " + codigo);
            return false;
        }

        // Registrar el uso del código
        accessGateRepository.incrementarUso(gate.getId());
        System.out.println("✅ Access Gate: Acceso concedido con código: " + gate.getDescripcion());
        
        return true;
    }

    /**
     * Crea un nuevo código de acceso
     */
    public boolean crearCodigoAcceso(AccessGate accessGate) {
        if (accessGate.getCodigoAcceso() == null || accessGate.getCodigoAcceso().trim().isEmpty()) {
            System.out.println("Error: El código de acceso no puede estar vacío");
            return false;
        }

        // Verificar que no exista un código igual activo
        AccessGate existente = accessGateRepository.buscarPorCodigo(accessGate.getCodigoAcceso());
        if (existente != null) {
            System.out.println("Error: Ya existe un código de acceso activo con ese valor");
            return false;
        }

        String id = accessGateRepository.generarId();
        accessGate.setId(id);
        return accessGateRepository.guardarAccessGate(id, accessGate);
    }

    /**
     * Obtiene todos los códigos activos
     */
    public List<AccessGate> obtenerCodigosActivos() {
        return accessGateRepository.obtenerActivos();
    }

    /**
     * Obtiene todos los códigos (para panel de administración)
     */
    public List<AccessGate> obtenerTodos() {
        return accessGateRepository.obtenerTodos();
    }

    /**
     * Desactiva un código de acceso
     */
    public boolean desactivarCodigo(String id) {
        return accessGateRepository.desactivar(id);
    }

    /**
     * Activa un código de acceso
     */
    public boolean activarCodigo(String id) {
        return accessGateRepository.activar(id);
    }

    /**
     * Obtiene un código por su ID
     */
    public AccessGate obtenerPorId(String id) {
        return accessGateRepository.obtenerAccessGatePorId(id);
    }

    /**
     * Verifica si hay al menos un código de acceso activo en el sistema
     */
    public boolean hayCodigosActivos() {
        return !accessGateRepository.obtenerActivos().isEmpty();
    }
}

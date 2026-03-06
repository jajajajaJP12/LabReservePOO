package com.labreserve.model;

import java.util.Date;

/**
 * Modelo para el Access Gate (Puerta de Acceso de Seguridad)
 * Representa un código de acceso institucional que los usuarios deben ingresar
 * antes de poder ver la pantalla de login/registro.
 * 
 * Esto agrega una capa adicional de seguridad al sistema.
 */
public class AccessGate {
    private String id;
    private String codigoAcceso;       // Código de acceso institucional
    private boolean activo;             // Si el código está activo
    private Date fechaCreacion;
    private Date fechaExpiracion;       // Fecha de expiración del código (null = permanente)
    private String creadoPor;           // Admin que creó el código
    private int maxUsos;                // Máximo de usos permitidos (0 = ilimitado)
    private int usosActuales;           // Contador de usos
    private String descripcion;         // Descripción del código (ej: "Semestre 2026-A")
    private String tipoAcceso;          // "general", "maestro", "alumno"

    // Constructor vacío (requerido por Firestore)
    public AccessGate() {
        this.activo = true;
        this.fechaCreacion = new Date();
        this.usosActuales = 0;
        this.maxUsos = 0;
        this.tipoAcceso = "general";
    }

    // Constructor con parámetros principales
    public AccessGate(String codigoAcceso, String descripcion, String creadoPor) {
        this();
        this.codigoAcceso = codigoAcceso;
        this.descripcion = descripcion;
        this.creadoPor = creadoPor;
    }

    // ===== Getters y Setters =====

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCodigoAcceso() {
        return codigoAcceso;
    }

    public void setCodigoAcceso(String codigoAcceso) {
        this.codigoAcceso = codigoAcceso;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Date getFechaExpiracion() {
        return fechaExpiracion;
    }

    public void setFechaExpiracion(Date fechaExpiracion) {
        this.fechaExpiracion = fechaExpiracion;
    }

    public String getCreadoPor() {
        return creadoPor;
    }

    public void setCreadoPor(String creadoPor) {
        this.creadoPor = creadoPor;
    }

    public int getMaxUsos() {
        return maxUsos;
    }

    public void setMaxUsos(int maxUsos) {
        this.maxUsos = maxUsos;
    }

    public int getUsosActuales() {
        return usosActuales;
    }

    public void setUsosActuales(int usosActuales) {
        this.usosActuales = usosActuales;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getTipoAcceso() {
        return tipoAcceso;
    }

    public void setTipoAcceso(String tipoAcceso) {
        this.tipoAcceso = tipoAcceso;
    }

    // ===== Métodos de Validación =====

    /**
     * Verifica si el código de acceso es válido (activo, no expirado, dentro del límite de usos)
     */
    public boolean esValido() {
        if (!activo) return false;

        // Verificar expiración
        if (fechaExpiracion != null && new Date().after(fechaExpiracion)) {
            return false;
        }

        // Verificar límite de usos
        if (maxUsos > 0 && usosActuales >= maxUsos) {
            return false;
        }

        return true;
    }

    /**
     * Incrementa el contador de usos
     */
    public void registrarUso() {
        this.usosActuales++;
    }

    @Override
    public String toString() {
        return "AccessGate{" +
                "id='" + id + '\'' +
                ", codigoAcceso='" + codigoAcceso + '\'' +
                ", activo=" + activo +
                ", descripcion='" + descripcion + '\'' +
                ", tipoAcceso='" + tipoAcceso + '\'' +
                ", usos=" + usosActuales + "/" + (maxUsos == 0 ? "∞" : maxUsos) +
                '}';
    }
}

package com.labreserve.model;

import java.util.Date;

public class Equipo {
    private String id;
    private String nombre;
    private String categoria; // Dispositivos, RA, Equipos, etc
    private int cantidad;
    private String descripcion;
    private String ubicacion;
    private String estado; // Disponible, Mantenimiento, Dañado
    private double valorAproximado;
    private String codigoSerie;
    private Date fechaRegistro;
    private Date ultimoMantenimiento;
    private String responsable;

    // Constructores
    public Equipo() {
        this.cantidad = 1;
        this.estado = "Disponible";
        this.fechaRegistro = new Date();
    }

    public Equipo(String nombre, String categoria, int cantidad) {
        this();
        this.nombre = nombre;
        this.categoria = categoria;
        this.cantidad = cantidad;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = Math.max(0, cantidad);
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public double getValorAproximado() {
        return valorAproximado;
    }

    public void setValorAproximado(double valorAproximado) {
        this.valorAproximado = valorAproximado;
    }

    public String getCodigoSerie() {
        return codigoSerie;
    }

    public void setCodigoSerie(String codigoSerie) {
        this.codigoSerie = codigoSerie;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public Date getUltimoMantenimiento() {
        return ultimoMantenimiento;
    }

    public void setUltimoMantenimiento(Date ultimoMantenimiento) {
        this.ultimoMantenimiento = ultimoMantenimiento;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    // Métodos útiles
    public boolean estaDisponible() {
        return cantidad > 0 && "Disponible".equalsIgnoreCase(estado);
    }

    public void agregarCantidad(int cantidad) {
        this.cantidad += cantidad;
    }

    public boolean restarCantidad(int cantidad) {
        if (this.cantidad >= cantidad) {
            this.cantidad -= cantidad;
            return true;
        }
        return false;
    }

    @Override
    public String toString() {
        return "Equipo{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", categoria='" + categoria + '\'' +
                ", cantidad=" + cantidad +
                ", estado='" + estado + '\'' +
                '}';
    }
}

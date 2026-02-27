package com.labreserve.model;

import java.util.Date;

public class Aula {
    private String id;
    private String nombre;
    private String edificio;
    private int piso;
    private int capacidad;
    private String descripcion;
    private boolean disponible;
    private String responsable; // Email del profesor responsable
    private Date fechaCreacion;
    private String estado; // Disponible, Mantenimiento, Reservada

    // Constructores
    public Aula() {
        this.disponible = true;
        this.estado = "Disponible";
        this.fechaCreacion = new Date();
    }

    public Aula(String nombre, int capacidad) {
        this();
        this.nombre = nombre;
        this.capacidad = capacidad;
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

    public String getEdificio() {
        return edificio;
    }

    public void setEdificio(String edificio) {
        this.edificio = edificio;
    }

    public int getPiso() {
        return piso;
    }

    public void setPiso(int piso) {
        this.piso = piso;
    }

    public int getCapacidad() {
        return capacidad;
    }

    public void setCapacidad(int capacidad) {
        this.capacidad = capacidad;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    public String getResponsable() {
        return responsable;
    }

    public void setResponsable(String responsable) {
        this.responsable = responsable;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    @Override
    public String toString() {
        return "Aula{" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", capacidad=" + capacidad +
                ", disponible=" + disponible +
                '}';
    }
}

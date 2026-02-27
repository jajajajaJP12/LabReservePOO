package com.labreserve.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Usuario {
    private String id;
    private String email;
    private String nombre;
    private String rol; // admin, maestro, alumno
    private boolean activo;
    private Date fechaRegistro;
    private List<String> aulas; // IDs de aulas asignadas
    private String departamento;
    private String telefono;

    // Constructores
    public Usuario() {
        this.aulas = new ArrayList<>();
        this.activo = true;
        this.fechaRegistro = new Date();
    }

    public Usuario(String email, String nombre, String rol) {
        this();
        this.email = email;
        this.nombre = nombre;
        this.rol = rol;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    public Date getFechaRegistro() {
        return fechaRegistro;
    }

    public void setFechaRegistro(Date fechaRegistro) {
        this.fechaRegistro = fechaRegistro;
    }

    public List<String> getAulas() {
        return aulas;
    }

    public void setAulas(List<String> aulas) {
        this.aulas = aulas;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    // Métodos útiles
    public boolean esAdmin() {
        return "admin".equalsIgnoreCase(this.rol);
    }

    public boolean esMaestro() {
        return "maestro".equalsIgnoreCase(this.rol);
    }

    public boolean esAlumno() {
        return "alumno".equalsIgnoreCase(this.rol);
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", nombre='" + nombre + '\'' +
                ", rol='" + rol + '\'' +
                '}';
    }
}

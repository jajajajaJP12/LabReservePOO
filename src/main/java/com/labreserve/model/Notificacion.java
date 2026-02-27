package com.labreserve.model;

import java.util.Date;

public class Notificacion {
    private String id;
    private String para; // email del destinatario
    private String de; // email o sistema
    private String asunto;
    private String mensaje;
    private String tipo; // solicitud_material, devolucion, reserva, general
    private Date fechaCreacion;
    private boolean leida;
    private Date fechaLeida;
    private String referencia; // ID de la solicitud, reserva, etc
    private String enlace; // URL si aplica
    private String prioridad; // baja, normal, alta

    // Constructores
    public Notificacion() {
        this.fechaCreacion = new Date();
        this.leida = false;
        this.prioridad = "normal";
    }

    public Notificacion(String para, String asunto, String mensaje, String tipo) {
        this();
        this.para = para;
        this.asunto = asunto;
        this.mensaje = mensaje;
        this.tipo = tipo;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPara() {
        return para;
    }

    public void setPara(String para) {
        this.para = para;
    }

    public String getDe() {
        return de;
    }

    public void setDe(String de) {
        this.de = de;
    }

    public String getAsunto() {
        return asunto;
    }

    public void setAsunto(String asunto) {
        this.asunto = asunto;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public boolean isLeida() {
        return leida;
    }

    public void setLeida(boolean leida) {
        this.leida = leida;
    }

    public Date getFechaLeida() {
        return fechaLeida;
    }

    public void setFechaLeida(Date fechaLeida) {
        this.fechaLeida = fechaLeida;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public String getEnlace() {
        return enlace;
    }

    public void setEnlace(String enlace) {
        this.enlace = enlace;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }

    // Métodos útiles
    public void marcarComoLeida() {
        this.leida = true;
        this.fechaLeida = new Date();
    }

    public boolean esAlta() {
        return "alta".equalsIgnoreCase(prioridad);
    }

    public long getMinutoDesdeCreacion() {
        long diferencia = new Date().getTime() - fechaCreacion.getTime();
        return diferencia / (1000 * 60);
    }

    @Override
    public String toString() {
        return "Notificacion{" +
                "id='" + id + '\'' +
                ", para='" + para + '\'' +
                ", asunto='" + asunto + '\'' +
                ", tipo='" + tipo + '\'' +
                ", leida=" + leida +
                '}';
    }
}

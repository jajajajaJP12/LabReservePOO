package com.labreserve.model;

import java.util.Date;

public class SolicitudMaterial {
    private String id;
    private String equipoId;
    private String equipoNombre;
    private String equipoCategoria;
    private int cantidad;
    private String motivo;
    private int tiempoUso; // en horas
    private String solicitadoPor; // email del usuario
    private String rolSolicitante;
    private String estado; // Pendiente, Aprobada, Rechazada
    private Date fechaSolicitud;
    private Date fechaAprobacion;
    private String mensajeRechazo;
    private Date fechaDevolucionEsperada;
    private boolean devuelto;
    private Date fechaDevolucion;
    private String motivoRechazo;

    // Constructores
    public SolicitudMaterial() {
        this.estado = "Pendiente";
        this.fechaSolicitud = new Date();
        this.devuelto = false;
    }

    public SolicitudMaterial(String equipoId, int cantidad, String motivo, int tiempoUso) {
        this();
        this.equipoId = equipoId;
        this.cantidad = cantidad;
        this.motivo = motivo;
        this.tiempoUso = tiempoUso;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEquipoId() {
        return equipoId;
    }

    public void setEquipoId(String equipoId) {
        this.equipoId = equipoId;
    }

    public String getEquipoNombre() {
        return equipoNombre;
    }

    public void setEquipoNombre(String equipoNombre) {
        this.equipoNombre = equipoNombre;
    }

    public String getEquipoCategoria() {
        return equipoCategoria;
    }

    public void setEquipoCategoria(String equipoCategoria) {
        this.equipoCategoria = equipoCategoria;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public int getTiempoUso() {
        return tiempoUso;
    }

    public void setTiempoUso(int tiempoUso) {
        this.tiempoUso = tiempoUso;
    }

    public String getSolicitadoPor() {
        return solicitadoPor;
    }

    public void setSolicitadoPor(String solicitadoPor) {
        this.solicitadoPor = solicitadoPor;
    }

    public String getRolSolicitante() {
        return rolSolicitante;
    }

    public void setRolSolicitante(String rolSolicitante) {
        this.rolSolicitante = rolSolicitante;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Date getFechaSolicitud() {
        return fechaSolicitud;
    }

    public void setFechaSolicitud(Date fechaSolicitud) {
        this.fechaSolicitud = fechaSolicitud;
    }

    public Date getFechaAprobacion() {
        return fechaAprobacion;
    }

    public void setFechaAprobacion(Date fechaAprobacion) {
        this.fechaAprobacion = fechaAprobacion;
    }

    public String getMensajeRechazo() {
        return mensajeRechazo;
    }

    public void setMensajeRechazo(String mensajeRechazo) {
        this.mensajeRechazo = mensajeRechazo;
    }

    public Date getFechaDevolucionEsperada() {
        return fechaDevolucionEsperada;
    }

    public void setFechaDevolucionEsperada(Date fechaDevolucionEsperada) {
        this.fechaDevolucionEsperada = fechaDevolucionEsperada;
    }

    public boolean isDevuelto() {
        return devuelto;
    }

    public void setDevuelto(boolean devuelto) {
        this.devuelto = devuelto;
    }

    public Date getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(Date fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
    }

    public String getMotivoRechazo() {
        return motivoRechazo;
    }

    public void setMotivoRechazo(String motivoRechazo) {
        this.motivoRechazo = motivoRechazo;
    }

    // Métodos útiles
    public boolean estaPendiente() {
        return "Pendiente".equalsIgnoreCase(estado);
    }

    public boolean estaAprobada() {
        return "Aprobada".equalsIgnoreCase(estado);
    }

    public boolean esAtrasada() {
        if (!estaAprobada() || devuelto) return false;
        return new Date().after(fechaDevolucionEsperada);
    }

    public long getDiasAtraso() {
        if (!esAtrasada()) return 0;
        long diferencia = new Date().getTime() - fechaDevolucionEsperada.getTime();
        return diferencia / (1000 * 60 * 60 * 24);
    }

    @Override
    public String toString() {
        return "SolicitudMaterial{" +
                "id='" + id + '\'' +
                ", equipoNombre='" + equipoNombre + '\'' +
                ", cantidad=" + cantidad +
                ", estado='" + estado + '\'' +
                ", solicitadoPor='" + solicitadoPor + '\'' +
                '}';
    }
}

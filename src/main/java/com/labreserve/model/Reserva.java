package com.labreserve.model;

import java.util.Date;

public class Reserva {
    private String id;
    private String aulaId;
    private String aulaNombre;
    private String usuarioId;
    private String usuarioEmail;
    private String usuarioNombre;
    private Date fecha;
    private String horaInicio;
    private String horaFin;
    private String motivo;
    private String estado; // Confirmada, Pendiente, Cancelada
    private Date fechaReserva;
    private Date fechaCancelacion;
    private String motivoCancelacion;
    private int cantidadEstudiantes;
    private String notas;

    // Constructores
    public Reserva() {
        this.estado = "Pendiente";
        this.fechaReserva = new Date();
    }

    public Reserva(String aulaId, String usuarioEmail, Date fecha, String horaInicio, String horaFin) {
        this();
        this.aulaId = aulaId;
        this.usuarioEmail = usuarioEmail;
        this.fecha = fecha;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAulaId() {
        return aulaId;
    }

    public void setAulaId(String aulaId) {
        this.aulaId = aulaId;
    }

    public String getAulaNombre() {
        return aulaNombre;
    }

    public void setAulaNombre(String aulaNombre) {
        this.aulaNombre = aulaNombre;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getUsuarioEmail() {
        return usuarioEmail;
    }

    public void setUsuarioEmail(String usuarioEmail) {
        this.usuarioEmail = usuarioEmail;
    }

    public String getUsuarioNombre() {
        return usuarioNombre;
    }

    public void setUsuarioNombre(String usuarioNombre) {
        this.usuarioNombre = usuarioNombre;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public String getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFin() {
        return horaFin;
    }

    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }

    public String getMotivo() {
        return motivo;
    }

    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Date getFechaReserva() {
        return fechaReserva;
    }

    public void setFechaReserva(Date fechaReserva) {
        this.fechaReserva = fechaReserva;
    }

    public Date getFechaCancelacion() {
        return fechaCancelacion;
    }

    public void setFechaCancelacion(Date fechaCancelacion) {
        this.fechaCancelacion = fechaCancelacion;
    }

    public String getMotivoCancelacion() {
        return motivoCancelacion;
    }

    public void setMotivoCancelacion(String motivoCancelacion) {
        this.motivoCancelacion = motivoCancelacion;
    }

    public int getCantidadEstudiantes() {
        return cantidadEstudiantes;
    }

    public void setCantidadEstudiantes(int cantidadEstudiantes) {
        this.cantidadEstudiantes = cantidadEstudiantes;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    // Métodos útiles
    public boolean estaPendiente() {
        return "Pendiente".equalsIgnoreCase(estado);
    }

    public boolean estaConfirmada() {
        return "Confirmada".equalsIgnoreCase(estado);
    }

    public void confirmar() {
        this.estado = "Confirmada";
    }

    public void cancelar(String motivo) {
        this.estado = "Cancelada";
        this.motivoCancelacion = motivo;
        this.fechaCancelacion = new Date();
    }

    @Override
    public String toString() {
        return "Reserva{" +
                "id='" + id + '\'' +
                ", aulaNombre='" + aulaNombre + '\'' +
                ", usuarioEmail='" + usuarioEmail + '\'' +
                ", fecha=" + fecha +
                ", estado='" + estado + '\'' +
                '}';
    }
}

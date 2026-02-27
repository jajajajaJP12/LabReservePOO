package com.labreserve.service;

import com.labreserve.model.SolicitudMaterial;
import com.labreserve.model.Equipo;
import com.labreserve.model.Notificacion;
import com.labreserve.repository.SolicitudMaterialRepository;
import com.labreserve.repository.EquipoRepository;
import com.labreserve.repository.NotificacionRepository;

import java.util.Date;
import java.util.List;

/**
 * Servicio de lógica de negocio para gestión de solicitudes de material
 */
@SuppressWarnings("all")
public class SolicitudMaterialService {

    private SolicitudMaterialRepository solicitudRepository;
    private EquipoRepository equipoRepository;
    private NotificacionRepository notificacionRepository;

    public SolicitudMaterialService() {
        this.solicitudRepository = new SolicitudMaterialRepository();
        this.equipoRepository = new EquipoRepository();
        this.notificacionRepository = new NotificacionRepository();
    }

    /**
     * Crea una nueva solicitud de material
     */
    public boolean crearSolicitud(SolicitudMaterial solicitud) {
        String id = solicitudRepository.generarId();
        solicitud.setId(id);
        solicitud.setEstado("Pendiente");
        solicitud.setFechaSolicitud(new Date());

        boolean guardada = solicitudRepository.guardarSolicitud(id, solicitud);

        if (guardada) {
            // Enviar notificación al admin
            crearNotificacionAdmin("Nueva solicitud de material",
                    solicitud.getSolicitadoPor() + " ha solicitado " + solicitud.getCantidad() + 
                    " unidad(es) de " + solicitud.getEquipoNombre(),
                    "solicitud_material",
                    id);
        }

        return guardada;
    }

    /**
     * Aprueba una solicitud de material
     */
    public boolean aprobarSolicitud(String solicitudId) {
        SolicitudMaterial solicitud = solicitudRepository.obtenerSolicitudPorId(solicitudId);
        if (solicitud == null) {
            System.out.println("Solicitud no encontrada");
            return false;
        }

        // Actualizar estado
        solicitud.setEstado("Aprobada");
        solicitud.setFechaAprobacion(new Date());
        
        // Calcular fecha de devolución esperada
        long tiempoEnMs = (long) solicitud.getTiempoUso() * 60 * 60 * 1000;
        Date fechaDevolucion = new Date(System.currentTimeMillis() + tiempoEnMs);
        solicitud.setFechaDevolucionEsperada(fechaDevolucion);

        // Restar cantidad del equipo
        Equipo equipo = equipoRepository.obtenerEquipoPorId(solicitud.getEquipoId());
        if (equipo != null) {
            int nuevaCantidad = Math.max(0, equipo.getCantidad() - solicitud.getCantidad());
            equipoRepository.actualizarCantidad(solicitud.getEquipoId(), nuevaCantidad);
        }

        // Actualizar solicitud
        boolean actualizada = solicitudRepository.guardarSolicitud(solicitudId, solicitud);

        if (actualizada) {
            // Notificar al solicitante
            crearNotificacion(solicitud.getSolicitadoPor(),
                    "Solicitud de material aprobada",
                    "Tu solicitud de " + solicitud.getEquipoNombre() + " ha sido aprobada. " +
                    "La fecha de devolución esperada es: " + 
                    fechaDevolucion.toString(),
                    "solicitud_material",
                    solicitudId);
        }

        return actualizada;
    }

    /**
     * Rechaza una solicitud de material
     */
    public boolean rechazarSolicitud(String solicitudId, String motivo) {
        SolicitudMaterial solicitud = solicitudRepository.obtenerSolicitudPorId(solicitudId);
        if (solicitud == null) {
            System.out.println("Solicitud no encontrada");
            return false;
        }

        solicitud.setEstado("Rechazada");
        solicitud.setMotivoRechazo(motivo);

        boolean actualizada = solicitudRepository.guardarSolicitud(solicitudId, solicitud);

        if (actualizada) {
            // Notificar al solicitante
            crearNotificacion(solicitud.getSolicitadoPor(),
                    "Solicitud de material rechazada",
                    "Tu solicitud de " + solicitud.getEquipoNombre() + " ha sido rechazada. " +
                    "Motivo: " + motivo,
                    "solicitud_material",
                    solicitudId);
        }

        return actualizada;
    }

    /**
     * Registra la devolución de un material
     */
    public boolean registrarDevolucion(String solicitudId) {
        SolicitudMaterial solicitud = solicitudRepository.obtenerSolicitudPorId(solicitudId);
        if (solicitud == null) {
            System.out.println("Solicitud no encontrada");
            return false;
        }

        solicitud.setDevuelto(true);
        solicitud.setFechaDevolucion(new Date());

        // Devolver cantidad al equipo
        Equipo equipo = equipoRepository.obtenerEquipoPorId(solicitud.getEquipoId());
        if (equipo != null) {
            int nuevaCantidad = equipo.getCantidad() + solicitud.getCantidad();
            equipoRepository.actualizarCantidad(solicitud.getEquipoId(), nuevaCantidad);
        }

        boolean actualizada = solicitudRepository.guardarSolicitud(solicitudId, solicitud);

        if (actualizada) {
            // Notificar al solicitante
            crearNotificacion(solicitud.getSolicitadoPor(),
                    "Material devuelto",
                    "Tu devolución de " + solicitud.getEquipoNombre() + " ha sido registrada correctamente",
                    "devolucion",
                    solicitudId);
        }

        return actualizada;
    }

    /**
     * Obtiene todas las solicitudes pendientes
     */
    public List<SolicitudMaterial> obtenerSolicitudesPendientes() {
        return solicitudRepository.obtenerPendientes();
    }

    /**
     * Obtiene solicitudes de un usuario
     */
    public List<SolicitudMaterial> obtenerSolicitudesUsuario(String email) {
        return solicitudRepository.obtenerPorUsuario(email);
    }

    /**
     * Obtiene solicitudes atrasadas
     */
    public List<SolicitudMaterial> obtenerSolicitudesAtrasadas() {
        return solicitudRepository.obtenerAtrasadas();
    }

    /**
     * Crea una notificación para los administradores
     */
    private void crearNotificacionAdmin(String asunto, String mensaje, String tipo, String referencia) {
        // TODO: Obtener emails de administradores desde la BD
        Notificacion notif = new Notificacion();
        notif.setPara("admin@labreserve.com"); // Email genérico de admins
        notif.setAsunto(asunto);
        notif.setMensaje(mensaje);
        notif.setTipo(tipo);
        notif.setReferencia(referencia);
        notif.setPrioridad("alta");

        String id = notificacionRepository.generarId();
        notificacionRepository.guardarNotificacion(id, notif);
    }

    /**
     * Crea una notificación para un usuario específico
     */
    private void crearNotificacion(String para, String asunto, String mensaje, String tipo, String referencia) {
        Notificacion notif = new Notificacion();
        notif.setPara(para);
        notif.setAsunto(asunto);
        notif.setMensaje(mensaje);
        notif.setTipo(tipo);
        notif.setReferencia(referencia);
        notif.setPrioridad("normal");

        String id = notificacionRepository.generarId();
        notificacionRepository.guardarNotificacion(id, notif);
    }
}

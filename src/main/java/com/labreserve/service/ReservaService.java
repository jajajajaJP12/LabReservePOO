package com.labreserve.service;

import com.labreserve.model.Reserva;
import com.labreserve.model.Aula;
import com.labreserve.model.Notificacion;
import com.labreserve.repository.ReservaRepository;
import com.labreserve.repository.AulaRepository;
import com.labreserve.repository.NotificacionRepository;

import java.util.Date;
import java.util.List;

/**
 * Servicio de lógica de negocio para gestión de reservas de aulas
 */
@SuppressWarnings("all")
public class ReservaService {

    private ReservaRepository reservaRepository;
    private AulaRepository aulaRepository;
    private NotificacionRepository notificacionRepository;

    public ReservaService() {
        this.reservaRepository = new ReservaRepository();
        this.aulaRepository = new AulaRepository();
        this.notificacionRepository = new NotificacionRepository();
    }

    /**
     * Crea una nueva reserva
     */
    public boolean crearReserva(Reserva reserva) {
        String id = reservaRepository.generarId();
        reserva.setId(id);
        reserva.setEstado("Pendiente");
        reserva.setFechaReserva(new Date());

        // Obtener datos del aula
        Aula aula = aulaRepository.obtenerAulaPorId(reserva.getAulaId());
        if (aula != null) {
            reserva.setAulaNombre(aula.getNombre());
        }

        boolean guardada = reservaRepository.guardarReserva(id, reserva);

        if (guardada) {
            // Notificar al solicitante 
            crearNotificacion(reserva.getUsuarioEmail(),
                    "Reserva de aula confirmada",
                    "Tu reserva del aula " + reserva.getAulaNombre() + " ha sido registrada",
                    "reserva",
                    id);
        }

        return guardada;
    }

    /**
     * Confirma una reserva
     */
    public boolean confirmarReserva(String reservaId) {
        Reserva reserva = reservaRepository.obtenerReservaPorId(reservaId);
        if (reserva == null) {
            System.out.println("Reserva no encontrada");
            return false;
        }

        reserva.confirmar();
        return reservaRepository.guardarReserva(reservaId, reserva);
    }

    /**
     * Cancela una reserva
     */
    public boolean cancelarReserva(String reservaId, String motivo) {
        return reservaRepository.cancelarReserva(reservaId, motivo);
    }

    /**
     * Obtiene todas las reservas de un usuario
     */
    public List<Reserva> obtenerReservasUsuario(String email) {
        return reservaRepository.obtenerPorUsuario(email);
    }

    /**
     * Obtiene todas las reservas de un aula
     */
    public List<Reserva> obtenerReservasAula(String aulaId) {
        return reservaRepository.obtenerPorAula(aulaId);
    }

    /**
     * Obtiene todas las reservas confirmadas
     */
    public List<Reserva> obtenerReservasConfirmadas() {
        return reservaRepository.obtenerConfirmadas();
    }

    /**
     * Verifica si un aula está disponible en un horario específico
     */
    public boolean verificarDisponibilidad(String aulaId, Date fecha, String horaInicio, String horaFin) {
        List<Reserva> reservas = obtenerReservasAula(aulaId);
        
        for (Reserva r : reservas) {
            if (!r.getEstado().equals("Cancelada")) {
                // Verificar si hay conflicto de horario
                if (r.getFecha().equals(fecha)) {
                    if (tieneConflicto(horaInicio, horaFin, r.getHoraInicio(), r.getHoraFin())) {
                        return false;
                    }
                }
            }
        }
        
        return true;
    }

    /**
     * Verifica si hay conflicto entre dos horarios
     */
    private boolean tieneConflicto(String inicio1, String fin1, String inicio2, String fin2) {
        // Convertir a minutos desde las 00:00
        int inicioMin1 = convertirHoraAMinutos(inicio1);
        int finMin1 = convertirHoraAMinutos(fin1);
        int inicioMin2 = convertirHoraAMinutos(inicio2);
        int finMin2 = convertirHoraAMinutos(fin2);

        return !(finMin1 <= inicioMin2 || finMin2 <= inicioMin1);
    }

    /**
     * Convierte una hora en formato "HH:MM" a minutos
     */
    private int convertirHoraAMinutos(String hora) {
        String[] partes = hora.split(":");
        int horas = Integer.parseInt(partes[0]);
        int minutos = Integer.parseInt(partes[1]);
        return horas * 60 + minutos;
    }

    /**
     * Crea una notificación para un usuario
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

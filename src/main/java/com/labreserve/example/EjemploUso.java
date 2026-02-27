package com.labreserve.example;

import com.labreserve.model.*;
import com.labreserve.service.LabReserveService;

import java.util.Date;
import java.util.List;

/**
 * Clase de ejemplo que muestra cómo usar los servicios del backend
 */
@SuppressWarnings("all")
public class EjemploUso {

    public static void main(String[] args) {
        // Obtener instancia del servicio principal
        LabReserveService labReserve = LabReserveService.getInstance();

        // Ejemplos de uso
        ejemploUsuarios(labReserve);
        ejemploEquipos(labReserve);
        ejemploSolicitudesMaterial(labReserve);
        ejemploReservas(labReserve);
    }

    /**
     * Ejemplo: Gestión de usuarios
     */
    private static void ejemploUsuarios(LabReserveService labReserve) {
        System.out.println("\n========== EJEMPLO: USUARIOS ==========");
        var usuarioService = labReserve.getUsuarioService();

        // Crear usuarios
        Usuario alumno = new Usuario("alumno1@labreserve.com", "Juan García", "alumno");
        usuarioService.crearUsuario("user_001", alumno);

        Usuario maestro = new Usuario("maestro1@labreserve.com", "Profesor Lopez", "maestro");
        usuarioService.crearUsuario("user_002", maestro);

        // Obtener usuario
        Usuario usuario = usuarioService.obtenerPorEmail("alumno@labreserve.com");
        if (usuario != null) {
            System.out.println("Usuario encontrado: " + usuario.getNombre());
        }

        // Listar usuarios por rol
        List<Usuario> maestros = usuarioService.obtenerMaestros();
        System.out.println("Total de maestros: " + maestros.size());

        // Cambiar rol
        usuarioService.actualizarRol("user_001", "maestro");
    }

    /**
     * Ejemplo: Gestión de equipos
     */
    private static void ejemploEquipos(LabReserveService labReserve) {
        System.out.println("\n========== EJEMPLO: EQUIPOS ==========");
        var equipoService = labReserve.getEquipoService();

        // Registrar equipo
        Equipo laptop = new Equipo("Laptop HP", "Dispositivos", 5);
        laptop.setDescripcion("Laptop para desarrollo");
        laptop.setUbicacion("Lab 1");
        equipoService.registrarEquipo("equipo_001", laptop);

        // Obtener equipo
        Equipo equipo = equipoService.obtenerPorId("equipo_001");
        if (equipo != null) {
            System.out.println("Equipo: " + equipo.getNombre() + " - Cantidad: " + equipo.getCantidad());
        }

        // Listar equipos disponibles
        List<Equipo> disponibles = equipoService.obtenerDisponibles();
        System.out.println("Equipos disponibles: " + disponibles.size());

        // Actualizar cantidad
        equipoService.decrementarCantidad("equipo_001", 2);
        System.out.println("Después de restar 2: " + equipoService.obtenerPorId("equipo_001").getCantidad());

        // Cambiar estado a mantenimiento
        equipoService.marcarEnMantenimiento("equipo_001");
        System.out.println("Estado del equipo: " + equipoService.obtenerPorId("equipo_001").getEstado());
    }

    /**
     * Ejemplo: Solicitudes de material
     */
    private static void ejemploSolicitudesMaterial(LabReserveService labReserve) {
        System.out.println("\n========== EJEMPLO: SOLICITUDES DE MATERIAL ==========");
        var solicitudService = labReserve.getSolicitudMaterialService();

        // Crear solicitud
        SolicitudMaterial solicitud = new SolicitudMaterial(
                "equipo_001",
                2,
                "Para proyecto de clase",
                24  // 24 horas
        );
        solicitud.setSolicitadoPor("alumno@labreserve.com");
        solicitud.setRolSolicitante("alumno");
        solicitud.setEquipoNombre("Laptop HP");
        solicitud.setEquipoCategoria("Dispositivos");

        solicitudService.crearSolicitud(solicitud);

        // Obtener solicitudes pendientes
        List<SolicitudMaterial> pendientes = solicitudService.obtenerSolicitudesPendientes();
        System.out.println("Solicitudes pendientes: " + pendientes.size());

        // Nota: En producción, aquí iría
        // solicitudService.aprobarSolicitud(id);
        // solicitudService.rechazarSolicitud(id, "Sin stock");
        // solicitudService.registrarDevolucion(id);
    }

    /**
     * Ejemplo: Reservas de aula
     */
    private static void ejemploReservas(LabReserveService labReserve) {
        System.out.println("\n========== EJEMPLO: RESERVAS DE AULA ==========");
        var reservaService = labReserve.getReservaService();

        // Crear reserva
        Reserva reserva = new Reserva(
                "aula_001",
                "maestro@labreserve.com",
                new Date(),
                "10:00",
                "12:00"
        );
        reserva.setMotivo("Clase de programación");
        reserva.setCantidadEstudiantes(30);

        reservaService.crearReserva(reserva);

        // Obtener reservas de un usuario
        List<Reserva> misReservas = reservaService.obtenerReservasUsuario("maestro@labreserve.com");
        System.out.println("Mis reservas: " + misReservas.size());

        // Verificar disponibilidad
        boolean disponible = reservaService.verificarDisponibilidad(
                "aula_001",
                new Date(),
                "14:00",
                "16:00"
        );
        System.out.println("¿Disponible de 14:00 a 16:00? " + disponible);
    }
}

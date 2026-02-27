package com.labreserve.service;

/**
 * Clase Facade que centraliza el acceso a todos los servicios
 * Útil para mantener la consistencia y facilitar el acceso a funcionalidades
 */@SuppressWarnings("all")public class LabReserveService {

    private static LabReserveService instance;
    
    private UsuarioService usuarioService;
    private EquipoService equipoService;
    private SolicitudMaterialService solicitudMaterialService;
    private ReservaService reservaService;

    private LabReserveService() {
        this.usuarioService = new UsuarioService();
        this.equipoService = new EquipoService();
        this.solicitudMaterialService = new SolicitudMaterialService();
        this.reservaService = new ReservaService();
    }

    /**
     * Obtiene la instancia singleton de LabReserveService
     */
    public static LabReserveService getInstance() {
        if (instance == null) {
            instance = new LabReserveService();
        }
        return instance;
    }

    // Getters para acceder a los servicios
    public UsuarioService getUsuarioService() {
        return usuarioService;
    }

    public EquipoService getEquipoService() {
        return equipoService;
    }

    public SolicitudMaterialService getSolicitudMaterialService() {
        return solicitudMaterialService;
    }

    public ReservaService getReservaService() {
        return reservaService;
    }

    /**
     * Obtiene un resumen del estado del sistema
     */
    public void imprimirResumenSistema() {
        System.out.println("\n========== RESUMEN DEL SISTEMA ==========");
        System.out.println("Usuarios totales: " + usuarioService.obtenerActivos().size());
        System.out.println("Equipos disponibles: " + equipoService.obtenerDisponibles().size());
        System.out.println("Solicitudes pendientes: " + solicitudMaterialService.obtenerSolicitudesPendientes().size());
        System.out.println("Equipos atrasados: " + solicitudMaterialService.obtenerSolicitudesAtrasadas().size());
        System.out.println("==========================================\n");
    }

    /**
     * Realiza operaciones de inicio del sistema
     */
    public void inicializarSistema() {
        System.out.println("\n>>> Inicializando LabReserve...");
        System.out.println(">>> Servicios cargados exitosamente");
        imprimirResumenSistema();
    }
}

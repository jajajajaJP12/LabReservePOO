package com.labreserve;

import com.labreserve.config.FirebaseConfig;
import com.labreserve.service.LabReserveService;

@SuppressWarnings("all")
public class MainApp {

    public static void main(String[] args) {
        // Inicializar Firebase
        FirebaseConfig.initializeFirebase();
        
        // Inicializar el servicio principal de LabReserve
        LabReserveService labReserve = LabReserveService.getInstance();
        labReserve.inicializarSistema();
        
        System.out.println("✅ LabReservePOO Backend iniciado correctamente");
        System.out.println("El backend está listo para recibir solicitudes");
        System.out.println("Todos los eventos se registran en la consola");
    }
}
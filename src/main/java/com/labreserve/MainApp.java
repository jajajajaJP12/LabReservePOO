package com.labreserve;

import com.labreserve.config.FirebaseConfig;
import com.labreserve.service.FirestoreTestService;

public class MainApp {

    public static void main(String[] args) {
        FirebaseConfig.initializeFirebase();
        FirestoreTestService.saveTestDocument();
        System.out.println("LabReservePOO iniciado correctamente");
    }
}
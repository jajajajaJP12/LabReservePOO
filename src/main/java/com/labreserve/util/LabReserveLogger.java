package com.labreserve.util;

import java.io.File;
import java.io.IOException;
import java.util.logging.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SuppressWarnings("all")
public class LabReserveLogger {
    private static final Logger logger = Logger.getLogger("LabReserve");
    private static FileHandler fileHandler;
    private static final String LOG_DIR = "logs";
    
    private LabReserveLogger() {
        // Clase de utilidades, no se debe instanciar
    }
    
    static {
        try {
            // Crear directorio de logs si no existe
            File logDir = new File(LOG_DIR);
            if (!logDir.exists()) {
                logDir.mkdirs();
            }
            
            // Crear archivo de log con fecha
            String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd_HH-mm-ss"));
            String logFile = LOG_DIR + "/labreserve-" + timestamp + ".log";
            
            fileHandler = new FileHandler(logFile, true);
            fileHandler.setFormatter(new SimpleFormatter() {
                @Override
                public synchronized String format(LogRecord record) {
                    String time = LocalDateTime.now()
                        .format(DateTimeFormatter.ofPattern("HH:mm:ss"));
                    return String.format(
                        "[%s] [%-7s] %s%n",
                        time,
                        record.getLevel(),
                        record.getMessage()
                    );
                }
            });
            
            logger.addHandler(fileHandler);
            logger.addHandler(new ConsoleHandler());
            logger.setLevel(Level.INFO);
            
        } catch (IOException e) {
            logger.severe("Error configurando logger: " + e.getMessage());
            e.printStackTrace();
        }
    }
    
    /**
     * Obtiene la instancia del logger
     */
    public static Logger getLogger() {
        return logger;
    }
    
    /**
     * Registra una solicitud
     */
    public static void logRequest(String request) {
        logger.info(() -> "REQUEST: " + request);
    }
    
    /**
     * Registra una respuesta
     */
    public static void logResponse(String response) {
        logger.info(() -> "RESPONSE: " + response);
    }
    
    /**
     * Registra un error
     */
    public static void logError(String error) {
        logger.severe(() -> "ERROR: " + error);
    }
    
    /**
     * Registra un error con excepción
     */
    public static void logError(String error, Throwable throwable) {
        logger.severe(() -> "ERROR: " + error);
        if (throwable != null) {
            throwable.printStackTrace();
        }
    }
    
    /**
     * Registra un mensaje informativo
     */
    public static void logInfo(String message) {
        logger.info(message);
    }
    
    /**
     * Registra una advertencia
     */
    public static void logWarning(String warning) {
        logger.warning(warning);
    }
}

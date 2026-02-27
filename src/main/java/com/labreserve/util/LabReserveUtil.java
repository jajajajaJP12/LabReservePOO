package com.labreserve.util;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.UUID;

/**
 * Clase con utilidades generales del sistema
 */
public class LabReserveUtil {

    private LabReserveUtil() {
        // Clase de utilidades, no se debe instanciar
    }

    /**
     * Genera un UUID aleatorio
     */
    public static String generarId() {
        return UUID.randomUUID().toString();
    }

    /**
     * Convierte una Date a LocalDate
     */
    public static LocalDate dateALocalDate(Date date) {
        return date.toInstant()
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    /**
     * Convierte una LocalDate a Date
     */
    public static Date localDateADate(LocalDate localDate) {
        return java.sql.Date.valueOf(localDate);
    }

    /**
     * Formatea una fecha para mostrar
     */
    public static String formatearFecha(Date fecha) {
        if (fecha == null) return "N/A";
        return new java.text.SimpleDateFormat("dd/MM/yyyy").format(fecha);
    }

    /**
     * Formatea una fecha con hora
     */
    public static String formatearFechaHora(Date fecha) {
        if (fecha == null) return "N/A";
        return new java.text.SimpleDateFormat("dd/MM/yyyy HH:mm").format(fecha);
    }

    /**
     * Valida un email
     */
    public static boolean esEmailValido(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email != null && email.matches(regex);
    }

    /**
     * Obtiene el número de días entre dos fechas
     */
    public static long diasEntre(Date fecha1, Date fecha2) {
        return Math.abs((fecha2.getTime() - fecha1.getTime()) / (1000 * 60 * 60 * 24));
    }

    /**
     * Calcula la fecha de vencimiento basada en horas
     */
    public static Date calcularFechaVencimiento(int horas) {
        long tiempoEnMs = (long) horas * 60 * 60 * 1000;
        return new Date(System.currentTimeMillis() + tiempoEnMs);
    }

    /**
     * Comprueba si una fecha ya pasó
     */
    public static boolean yaVencio(Date fecha) {
        return new Date().after(fecha);
    }

    /**
     * Valida que un rol sea válido
     */
    public static boolean esRolValido(String rol) {
        return rol != null && (
                rol.equalsIgnoreCase("admin") ||
                rol.equalsIgnoreCase("maestro") ||
                rol.equalsIgnoreCase("alumno")
        );
    }

    /**
     * Obtiene el nombre en español de un rol
     */
    public static String obtenerNombreRol(String rol) {
        switch (rol.toLowerCase()) {
            case "admin":
                return "Administrador";
            case "maestro":
                return "Profesor";
            case "alumno":
                return "Alumno";
            default:
                return "Desconocido";
        }
    }

    /**
     * Trunca un texto a una longitud máxima
     */
    public static String truncar(String texto, int maxLength) {
        if (texto == null || texto.length() <= maxLength) {
            return texto;
        }
        return texto.substring(0, maxLength) + "...";
    }

    /**
     * Normaliza un texto eliminando espacios extras
     */
    public static String normalizar(String texto) {
        if (texto == null) return "";
        return texto.trim().replaceAll("\\s+", " ");
    }
}

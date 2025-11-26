// rutas/habitaciones.routes.ts
import { Router } from "express";

const rutasHabitaciones = (habitacionControlador) => {
  const router = Router();  

  // =========================
  //       GET
  // =========================

  // Mostrar todos los estatus de habitaciones
  router.get('/mostrarEstatusHabitacion', habitacionControlador.mostrarEstatusHabitacion);

  // Mostrar todas las habitaciones
  router.get('/mostrarTodasHabitaciones', habitacionControlador.mostrarTodasHabitaciones);

  // Mostrar habitaciones por hotel (se recibe hotel_id desde query)
  router.get('/mostrarHabitacionID', habitacionControlador.mostrarHabitacionesPorHotel);


  // =========================
  //       POST
  // =========================

  // Crear nueva habitación
  router.post('/crearHabitacion', habitacionControlador.crearHabitacion);


  // =========================
  //       PUT
  // =========================

  // Actualizar campos de habitación
  router.put('/actualizarHabitacion', habitacionControlador.actualizarHabitacion);

  // Actualizar ID de habitación (reenumerar)
  router.put('/actualizarIdHabitacion', habitacionControlador.actualizarIdHabitacion);


  // =========================
  //       DELETE
  // =========================

  // Borrar una habitación
  router.delete('/borrarHabitacion', habitacionControlador.borrarHabitacion);

  return router;
}

export default rutasHabitaciones;

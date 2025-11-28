// rutas/habitaciones.routes.ts
import { Router } from "express";

const rutasHabitaciones = (habitacionControlador) => {
  const router = Router();  

  // =========================
  //          GET
  // =========================

  // Obtener el estatus de una habitación
  router.get('/mostrarEstatusHabitacion', habitacionControlador.mostrarEstatusHabitacion);

  // Mostrar todas las habitaciones
  router.get('/mostrarTodasHabitaciones', habitacionControlador.mostrarTodasHabitaciones);

  // Mostrar habitaciones filtradas por hotel (hotel_id por query)
  router.get('/mostrarHabitacionesPorHotel', habitacionControlador.mostrarHabitacionesPorHotel);


  // =========================
  //          POST
  // =========================

  // Crear una nueva habitación
  router.post('/crearHabitacion', habitacionControlador.crearHabitacion);


  // =========================
  //          PUT
  // =========================

  // Actualizar datos completos de una habitación
  router.put('/actualizarHabitacion', habitacionControlador.actualizarHabitacion);

  // Actualizar el hotel asignado a una habitación (mover habitación)
  router.put('/actualizarIdHabitacion', habitacionControlador.actualizarIdHabitacion);

  // Apartar una habitación (estatus = 1)
  router.put('/apartarEstatusHabitacion', habitacionControlador.apartarEstatusHabitacion);

  // desocuparHabitacion
  router.put('/desocuparEstatusHabitacion', habitacionControlador.desapartarEstatusHabitacion);


  // =========================
  //         DELETE
  // =========================

  // Borrar una habitación por ID
  router.delete('/borrarHabitacion', habitacionControlador.borrarHabitacion);

  return router;
}

export default rutasHabitaciones;

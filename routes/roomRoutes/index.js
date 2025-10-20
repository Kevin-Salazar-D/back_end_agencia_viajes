import { Router } from "express";

const rutasHabitaciones = (habitacionControlador) => {
  const router = Router();  

  // GET → mostrar todo sobre Habitaciones
  router.get('/mostrarEstatusHabitacion', habitacionControlador.mostrarEstatusHabitacion);
  router.get('/mostrarTodasHabitaciones', habitacionControlador.mostrarTodasHabitaciones);
  router.get('/mostrarHabitacionID', habitacionControlador.mostrarHabitacionID);
  // POST → crear Habitacion
  router.post('/crearHabitacion', habitacionControlador.crearHabitacion);
  
  // PUT → actualizar datos de Habitacion
  router.put('/actualizarHabitacion', habitacionControlador.actualizarHabitacion);
  router.put('/actualizarIdHabitacion', habitacionControlador.actualizarIdHabitacion);

  // DELETE → borrar hotel
  router.delete('/borrarHabitacion', habitacionControlador.borrarHabitacion);

  return router;
}

export default rutasHabitaciones;

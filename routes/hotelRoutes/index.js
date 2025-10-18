import { Router } from "express";

const hotelesRutas = (hotelControlador) => {
  const router = Router();  

  // GET → mostrar todos o por ciudad
  router.get('/mostrarTodosHoteles', hotelControlador.mostrarTodosHoteles);
  router.get('/mostrarHotelesCiudad', hotelControlador.mostrarHotelesCiudad);

  // POST → crear hotel
  router.post('/crearHotel', hotelControlador.crearHotel);
  
  // PUT → actualizar datos o ciudad del hotel
  router.put('/actualizarHotel', hotelControlador.actualizarHotel);
  router.put('/actualizarCiudadIdHotel', hotelControlador.actualizarCiudadIdHotel);

  // DELETE → borrar hotel
  router.delete('/borrarHotel', hotelControlador.borrarHotel);

  return router;
}

export default hotelesRutas;

import { Router } from "express";

//importamos los middlewares
import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

const hotelesRutas = (hotelControlador) => {
  const router = Router();  

  // GET → mostrar todos o por ciudad
  router.get('/mostrarTodosHoteles', hotelControlador.mostrarTodosHoteles);
  router.get('/mostrarHotelesCiudad', hotelControlador.mostrarHotelesCiudad);

  // POST → crear hotel
  router.post('/crearHotel',  verificarJWT, rolesPermitidos(["admin"]), hotelControlador.crearHotel);
  
  // PUT → actualizar datos o ciudad del hotel
  router.put('/actualizarHotel',  verificarJWT, rolesPermitidos(["admin"]), hotelControlador.actualizarHotel);
  router.put('/actualizarCiudadIdHotel',  verificarJWT, rolesPermitidos(["admin"]), hotelControlador.actualizarCiudadIdHotel);

  // DELETE → borrar hotel
  router.delete('/borrarHotel',  verificarJWT, rolesPermitidos(["admin"]), hotelControlador.borrarHotel);

  return router;
}

export default hotelesRutas;

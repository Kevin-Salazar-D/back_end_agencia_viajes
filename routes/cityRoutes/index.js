import { Router } from "express";

//importamos los middlewares
import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

const ciudadRutas = (controladorCiudad) => {
  const router = Router();  

  //get
  router.get('/obtenerTodasCiudades', controladorCiudad.mostrarTodasCiudades);
  //post
  router.post('/crearCiudad', verificarJWT, rolesPermitidos(["admin"]), controladorCiudad.crearCiudad);
  //put
  router.put('/actualizarCiudad', verificarJWT, rolesPermitidos(["admin"]), controladorCiudad.actualizarCiudad);
  //delete
  router.delete('/borrarCiudad',  verificarJWT, rolesPermitidos(["admin"]), controladorCiudad.borrarCiudad);
  return router;
}

export  default ciudadRutas;


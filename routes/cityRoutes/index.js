import { Router } from "express";

const ciudadRutas = (controladorCiudad) => {
  const router = Router();  

  //get
  router.get('/obtenerTodasCiudades', controladorCiudad.mostrarTodasCiudades);
  //post
  router.post('/crearCiudad', controladorCiudad.crearCiudad);
  //put
  router.put('/actualizarCiudad', controladorCiudad.actualizarCiudad);
  //delete
  router.delete('/borrarCiudad', controladorCiudad.borrarCiudad);
  return router;
}

export  default ciudadRutas;


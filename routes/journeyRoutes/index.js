import { Router } from "express";

//importamos los middlewares
import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

const viajeRutas = (viajeControlador) => {
  const router = Router();

  // GET: mostrar todos los viajes
  router.get( "/mostrarTodosLosViajes", viajeControlador.mostrarTodosLosViajes);

  // GET: mostrar viaje por ID
  router.get( "/mostrarViaje/:id", viajeControlador.mostrarViajeID);

  // GET: mostrar viaje filtrado por ciudad origen y destino
  router.get("/mostrarFiltroViaje/:ciudad_origen_id/:ciudad_destino_id", viajeControlador.mostrarFiltroViaje);

  // POST: crear viaje
  router.post(
    "/crearViaje",
     verificarJWT,
     rolesPermitidos(["admin"]),
     viajeControlador.crearViaje
  );

  // PUT: actualizar viaje
  router.put(
    "/actualizarViaje",
    verificarJWT,
    rolesPermitidos(["admin"]),
    viajeControlador.actualizarViaje
  );

  // DELETE: borrar viaje
  router.delete(
    "/borrarViaje",
    verificarJWT,
    rolesPermitidos(["admin"]),
    viajeControlador.borrarViaje
  );

  return router;
};

export default viajeRutas;

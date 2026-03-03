import { Router } from "express";

//importamos los middlewares
import verificarJWT  from "../../middlewares/authMiddlewares.js";
import rolesPermitidos from "../../middlewares/rolesPermitidos.js";

const usuarioRutas = (usuarioControlador) => {
  const router = Router();

  //rutas get 
  router.get("/obtenerTodosUsuarios", verificarJWT, rolesPermitidos(["admin"]), usuarioControlador.mostrarTodosUsuarios);
  router.get("/buscarUsuarioPorId/:id", usuarioControlador.buscarUsuarioPorId);
  router.get("/buscarUsuarioPorCorreo/:correo",usuarioControlador.buscarUsuarioPorCorreo);
  // rutas post
  router.post("/crearUsuarios", verificarJWT, rolesPermitidos(["admin"]), usuarioControlador.crearUsuario);
 // rutas put 
  router.put("/actualizarUsuario", verificarJWT, rolesPermitidos(["admin", "user"]), usuarioControlador.actualizarUsuario);
  // rutas delete
  router.delete("/eliminarUsuario",verificarJWT, rolesPermitidos(["admin"]), usuarioControlador.borrarUsuario);

  return router;
};

export default usuarioRutas;

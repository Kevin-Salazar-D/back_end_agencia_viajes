import { Router } from "express";

const usuarioRutas = (usuarioControlador) => {
  const router = Router();

  //rutas get 
  router.get("/obtenerTodosUsuarios", usuarioControlador.mostrarTodosUsuarios);
  // rutas post
  router.post("/crearUsuarios", usuarioControlador.crearUsuario);
 // rutas put 
  router.put("/actualizarUsuario", usuarioControlador.actualizarUsuario);
  // rutas delete
  router.delete("/eliminarUsuario", usuarioControlador.borrarUsuario);

  return router;
};

export default usuarioRutas;

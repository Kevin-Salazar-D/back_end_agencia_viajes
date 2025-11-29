import bcrypt from "bcryptjs";
import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";
const userService = (modelo) => {
  return {
    crearUsuario: async (usuarioData) => {
       validarDatos(usuarioData, "Faltan datos del usuario");
      // Hashear la contraseña antes de guardarla
        //const salt = await bcrypt.genSalt(10);
        //.contra = await bcrypt.hash(usuarioData.contra, salt);
        return await modelo.crearUsuario(usuarioData);
    },

    // Actualizar un usuario
    actualizarUsuario: async (usuarioData) => {
      validarDatos(usuarioData, "Faltan datos del usuario");
      return modelo.actualizarUsuario(usuarioData);
    },

    // Borrar un usuario
    borrarUsuario: async (id) => {
      validarDatos(id, "Falta el ID del usuario a eliminar");
     
      const filaAfectadas =  await modelo.borrarUsuario(id);
      validarFilaAfectada(filaAfectadas, "No se encontro el usuarioo con el ID proporcionado")
      
      return filaAfectadas;
    },
    mostrarTodosUsuarios: async () => {
      return   await modelo.mostrarTodosUsuarios();
    },
  };
};

export default userService;

import bcrypt from "bcryptjs";
import validarDatos from "../../utils/validarDatos.js";
const userService = (modelo) => {
  return {
    crearUsuario: async (usuarioData) => {
       validarDatos(usuarioData, "Faltan datos del usuario");
      // Hashear la contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10);
        usuarioData.contra = await bcrypt.hash(usuarioData.contra, salt);
        return  modelo.crearUsuario(usuarioData);
    },

    // Actualizar un usuario
    actualizarUsuario: async (usuarioData) => {
      validarDatos(usuarioData, "Faltan datos del usuario");
      return modelo.actualizarUsuario(usuarioData);
    },

    // Borrar un usuario
    borrarUsuario: async (id) => {
      validarDatos(id, "Falta el ID del usuario a eliminar");
      const filaAfectadas =  modelo.borrarUsuario(id);
      if (filaAfectadas === 0) throw new Error("No se encontró el usuario con el ID proporcionado");
      
      return filaAfectadas;
    },
    mostrarTodosUsuarios: async () => {
      return  modelo.mostrarTodosUsuarios();
    },
  };
};

export default userService;

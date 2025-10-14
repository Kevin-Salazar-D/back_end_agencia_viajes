import bcrypt from "bcryptjs";
import validarDatos from "../../utils/validarDatos.js";
const userService = (modelo) => {
  return {
    crearUsuario: async (usuarioData) => {
      const validar = validarDatos(usuarioData, "Faltan datos del usuario");

      if (validar) {
        const salt = await bcrypt.genSalt(10);
        usuarioData.contra = await bcrypt.hash(usuarioData.contra, salt);
        return await modelo.crearUsuario(usuarioData);
      }
    },

    // Actualizar un usuario
    actualizarUsuario: async (usuarioData) => {
      const validar = validarDatos(usuarioData, "Faltan datos del usuario");
      if (validar) return await modelo.actualizarUsuario(usuarioData);
    },

    // Borrar un usuario
    borrarUsuario: async (id) => {
      if (!id) {
        throw new Error("No se proporcionó el ID del usuario a eliminar");
      }
      return await modelo.borrarUsuario(id);
    },

    mostrarTodosUsuarios: async () => {
      return await modelo.mostrarTodosUsuarios();
    },
  };
};

export default userService;

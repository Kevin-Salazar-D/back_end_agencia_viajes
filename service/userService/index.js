import bcrypt from "bcryptjs";

const userService = (modelo) => {
  return {
    crearUsuario: async (usuarioData) => {
      if (Object.values(usuarioData).some((value) => value == null)) {
        throw new Error(
          "No se proporcionaron todos los datos de usuario para ingresarlos a la base de datos"
        );
      }

      const salt = await bcrypt.genSalt(10);
      usuarioData.contra = await bcrypt.hash(usuarioData.contra, salt);

      // Insertar usuario en la base de datos
      return await modelo.crearUsuario(usuarioData);
    },

    // Actualizar un usuario
    actualizarUsuario: async (usuarioData) => {
      if (Object.values(usuarioData).some((value) => value == null)) {
        throw new Error(
          "No se proporcionaron todos los datos de usuario para actualizarlos"
        );
      }

      return await modelo.actualizarUsuario(usuarioData);
    },

    // Borrar un usuario
    borrarUsuario: async (id) => {
      if (!id) {
        throw new Error("No se proporcionó el ID del usuario a eliminar");
      }
      return await modelo.borrarUsuario(id);
    },

    // Obtener todos los usuarios
    mostrarTodosUsuarios: async () => {
      return await modelo.mostrarTodosUsuarios();
    },
  };
};

export default userService;

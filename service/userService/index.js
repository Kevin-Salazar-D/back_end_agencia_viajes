import bcrypt from "bcryptjs";
import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";
import validarLista from "../../utils/validarLista.js";
const userService = (modelo) => {
  return {
    crearUsuario: async (usuarioData) => {
      validarDatos(usuarioData, "Faltan datos del usuario");

      const salt = await bcrypt.genSalt(10);
      const contraHash = await bcrypt.hash(usuarioData.contra, salt);

      const usuarioHash = {
        ...usuarioData,
        contra: contraHash
      };

      return await modelo.crearUsuario(usuarioHash);
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
    //Buscar usuario por ID
    buscarUsuarioPorId: async (id) => {
      validarDatos(id, "Falta el ID del usuario a buscar");

      //aqui extraes el objeto en una constante
       const resultado = modelo.buscarUsuarioPorId(id);
       
      return await modelo.buscarUsuariosID(id);
    },
    //Buscar usuario por correo
    buscarUsuarioPorCorreo: async (correo) => {
      validarDatos(correo, "Falta el correo del usuario a buscar");
      return await modelo.buscarUsuarioPorCorreo(correo);
    },
  };
};

export default userService;

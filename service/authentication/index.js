import validarDatos from "../../utils/validarDatos.js";
import generarToken from "../../utils/generarToken.js";
import validarObjeto from "../../utils/validarObjeto.js";
import validarAutorizacion from "../../utils/validarAutorizacion.js"
import bcrypt from "bcryptjs";
const authenticationServicio = (usuarioModelo) => {
  const formatearUsuario = (usuario) => ({
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    usuario: usuario.usuario,
    telefono: usuario.telefono,
    rol: usuario.rol,
  });

  return {
    login: async (dataLogin) => {
      //validamos que los datos ingresados esten cbien
      validarDatos(dataLogin, "Faltan datos para el login");

      //traemos los datos para encontrar al uusuario
      const { usuario, correo, contra } = dataLogin;

      const identificador = correo || usuario;

      //buscamos al usuario por correo o nombre de usuario
      const usuarioEncontrado = await usuarioModelo.buscarUsuarioPorCorreo(
        identificador,
        identificador,
      );

      //validamos que exista el usuario
      validarAutorizacion(usuarioEncontrado, "Credenciales incorrectas");

      //validamos el hash de la contraseña

      const contraCorrecta = await bcrypt.compare(
        contra,
        usuarioEncontrado.contra,
      );

      //validamos que la contraseña sea segura
      validarAutorizacion(contraCorrecta, "Credenciales incorrectas");

      //generamos el token de autorizacion
      const token = generarToken(usuarioEncontrado.id, usuarioEncontrado.rol);

      return {
        token,
        usuario: formatearUsuario(usuarioEncontrado),
      };
    },

    crearCuenta: async (dataCuenta) => {
      //validamos que los datos ingresados esten cbien
      validarDatos(dataCuenta, "Faltan datos para el registro");

      const { correo, usuario } = dataCuenta;
      //verificamos que el usuario no esta registrado previamente
      const usuarioExistente = await usuarioModelo.buscarUsuarioPorCorreo(
        correo,
        usuario,
      );

      //si un usaurio ya existe no podemos registrarlo
      if (usuarioExistente) {
        const error = new Error("Usuario ya registrado");
        error.status = 400;
        throw error;
      }

      const salt = await bcrypt.genSalt(10);
      const contraHash = await bcrypt.hash(dataCuenta.contra, salt);

      const usuarioHash = {
        ...dataCuenta,
        contra: contraHash,
      };
      const usuarioCreadoId = await usuarioModelo.crearUsuario(usuarioHash);

      const usuarioFormado = {
        id: usuarioCreadoId,
        usuario: usuarioHash.usuario,
        correo: usuarioHash.correo,
        nombre: usuarioHash.nombre,
        apellido: usuarioHash.apellido,
        telefono: usuarioHash.telefono,
        rol: "user",
      };

      const token = generarToken(usuarioCreadoId, usuarioFormado.rol);

      return {
        token,
        usuario: formatearUsuario(usuarioFormado),
      };
    },
  };
};

export default authenticationServicio;

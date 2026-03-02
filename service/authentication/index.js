import validarDatos from "../../utils/validarDatos.js";
import generarToken from "../../utils/generarToken.js";
import validarAutorizacion from "../../utils/validarAutorizacion.js";
import generarCodigoAutorizacion from "../../utils/generarCodigoAutenticacion.js";

import bcrypt from "bcryptjs";
import qRCode from "qrcode";
import speakeasy from "speakeasy";

const authenticationServicio = (usuarioModelo) => {

  const formatearUsuario = (usuario) => ({
    id: usuario.id,
    nombre: usuario.nombre,
    apellido: usuario.apellido,
    correo: usuario.correo,
    usuario: usuario.usuario,
    telefono: usuario.telefono,
    rol: usuario.rol,
    activacion_dos_pasos: usuario.activacion_dos_pasos
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

      //verificamos si el usuario tiene por defecto la autenticacion por dos pasos
      if (usuarioEncontrado.activacion_dos_pasos) {
        return {
          requiere2FA: true,
          userId: usuarioEncontrado.id,
          nombre: usuarioEncontrado.nombre,
        };
      }

      //generamos el token de autorizacion
      const token = generarToken(usuarioEncontrado.id, usuarioEncontrado.rol, usuarioEncontrado.usuario );

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
        activacion_dos_pasos: false
      };

      const token = generarToken(usuarioFormado.id, usuarioFormado.rol, usuarioFormado.usuario );

      return {
        token,
        usuario: formatearUsuario(usuarioFormado),
      };
    },

    activarDosPasos: async (userId) => {
      validarDatos({ userId }, "Error al obtener el usuario");
     

      //obtenemos los datos del usuario
      const usuario = await usuarioModelo.buscarUsuariosID(userId);
      console.log("Datos del usuario: ", usuario);

      //validamos si se encontro el usuario
      validarAutorizacion(usuario, "Usuario no encontrado");

      
      // generamos el codigo de autorizacion
      const secret = generarCodigoAutorizacion({
        correo: usuario.correo,
        usuario: usuario.usuario,
        id: usuario.id,
      });

      //generamos el codigo QR apartir del codigo secreto
      const qr = await qRCode.toDataURL(secret.otpauth_url);

      //guardamos temporalmente el codigo secreto hasta que el usuario confirme identidad
      await usuarioModelo.guardarSecretoTemporal2FA(usuario.id, secret.base32);

      return { qr };
    },

    confirmarDosPasos: async (userId, codigo) => {
      validarDatos({ userId, codigo }, "Error al obtener id o usuario ");

      //obtenemos los datos del usuario
      const usuario = await usuarioModelo.buscarUsuariosID(userId);

      //validamos si se encontro el usuario
      validarAutorizacion(usuario, "Usuario no encontrado");

      //validamos que exista un secreto temporal
      validarAutorizacion(
        usuario.secreto_temporal_dos_pasos,
        "No hay activacion pendiente"
      );

      // verificamos el codigo sea correcto
      const verificado = speakeasy.totp.verify({
        secret: usuario.secreto_temporal_dos_pasos,
        encoding: "base32",
        token: codigo,
        window: 1,
      });

      //validamos que sea codigo correcto
      validarAutorizacion(verificado, "Codigo no autorizado");

      //creamos la autenticacion de dos pasos
      const resultado = await usuarioModelo.guardarSecreto2FA(
        userId,
        usuario.secreto_temporal_dos_pasos,
      );

      return {
        mensaje: "Autorizacion creada correctemente",
        resultado: resultado,
      };
    },
  
    verificarAuth2FA: async (usuario_id, codigo) => {
      //validamos si los datos llegaron
      validarDatos({ usuario_id, codigo }, "Error al obtener id o usuario ");

      //buscamos al usuario solicitado
      const usuarioEncontrado = await usuarioModelo.buscarUsuariosID(usuario_id);

      //validamos si se encontro el usuario
      validarAutorizacion(usuarioEncontrado, "No se encontro el usuario");

      //validamos si tiene el 2FA activado
      validarAutorizacion(
        usuarioEncontrado.activacion_dos_pasos,
        "Este usuario no tiene 2FA activado"
      );

      //Verificacmos que el codigo sea correcto
      const verificado = speakeasy.totp.verify({
        secret: usuarioEncontrado.secreto_dos_pasos,
        encoding: "base32",
        token: codigo,
        window: 1,
      });

      //validamos si el codigo es correcto
      validarAutorizacion(
        verificado,
        "Este codigo esta mal. Intente de nuevo"
      );

      //generamos el token de autorizacion
      const token = generarToken(usuarioEncontrado.id, usuarioEncontrado.rol, usuarioEncontrado.usuario );

      return {
        token,
        usuario: formatearUsuario(usuarioEncontrado)
      };
    },

    //traemos la informacion del perfil del usuario
    perfil: async (usuario_id) => {
      //validamos si los datos llegaron
      validarDatos(usuario_id, "Error al obtener el ID del usuario ");

      

      //buscamos al usuario solicitado
      const usuario = await usuarioModelo.buscarUsuariosID(usuario_id);
     

      //validamos si se encontro el usuario
      validarAutorizacion(usuario, "No se encontro el usuario");

       return formatearUsuario(usuario);
    }
    
  };
};

export default authenticationServicio;
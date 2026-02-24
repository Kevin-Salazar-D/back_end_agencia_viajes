import cookieOptions from "../../config/cookieOptions.js";
const authenticationController = (servicioAuth) => {
  const login = async (req, res) => {
    try {
      const { contra, usuario, correo } = req.body;

      const dataLogin = { contra, usuario, correo };

      const datoUsuario = await servicioAuth.login(dataLogin);

      //validamos si el usuario tiene activada la autenticacion de dos pasos
      if (datoUsuario.requiere2FA) {
        return res.status(200).json({
          nombre: datoUsuario.nombre,
          userId: datoUsuario.userId,
          requiere2FA: true,
          mensaje: "Ingrese el código de verificación para continuar",
        });
      }

      //creamoos la cookie
      res.cookie("token", datoUsuario.token, cookieOptions);

      res.status(200).json({
        message: "Has accedido correctamente a tu cuenta",
        usuario: datoUsuario.usuario,
        requiere2FA: false,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  const crearCuenta = async (req, res) => {
    try {
      const { usuario, correo, contra, nombre, apellido, telefono } = req.body;

      const nuevoUsuario = {
        usuario,
        correo,
        contra,
        nombre,
        apellido,
        telefono,
      };

      const cuentaCreada = await servicioAuth.crearCuenta(nuevoUsuario);

      res.cookie("token", cuentaCreada.token, cookieOptions);

      res.status(201).json({
        message: "Cuenta creada correctamente",
        usuario: cuentaCreada.usuario,
      });
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  const logout = (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      return res.status(200).json({
        message: "Sesión cerrada correctamente",
      });
    } catch (error) {
      return res.status(500).json({
        error: "Error al cerrar sesión",
      });
    }
  };

  const activarDosPasos = async (req, res) => {
    try {
      //por medio del JWT nos traemos el ID del usuario
      const userId = req.usuario.id;

      

      //creamos la QR para que el usuario pueda autenticar
      const  {qr}  = await servicioAuth.activarDosPasos(userId);

      console.log("Este es el QR");

      return res.status(200).json({
        mensaje: "QR creado correctamente",
        codigoQR: qr
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.message,
      });
    }
  };

  const confirmarDosPasos = async (req, res) => {
    try {
      //por medio del JWT nos traemos el ID del usuario
      const userId = req.usuario.id;
      //por medio del body traemos el codigo del usuario
      const { codigo } = req.body;

      const data = await servicioAuth.confirmarDosPasos(userId, codigo);

      return res.status(200).json({
        mensaje: data.mensaje,
        result: data.resultado,
      });
    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.message,
      });
    }
  };

   const verificarAuth2FA = async (req, res) => {
    try {
      //por medio del body traemos el codigo del usuario
      const { codigo, userId } = req.body;

      //obtenemos el token y la data del usuario
      const verificacionCuenta = await servicioAuth.verificarAuth2FA(userId, codigo);

      //creamos la cookies para el usuario
      res.cookie("token", verificacionCuenta.token, cookieOptions);

      //si todo esta bien mandamos un 200
      res.status(200).json({
        message: "Has accedido correctamente a tu cuenta",
        usuario: verificacionCuenta.usuario,
        requiere2FA: false,
      });

    } catch (error) {
      return res.status(error.status || 500).json({
        error: error.message,
      });
    }
  };

  return { 
    login, 
    crearCuenta, 
    logout, 
    activarDosPasos,
    confirmarDosPasos, 
    verificarAuth2FA 
  };
};

export default authenticationController;

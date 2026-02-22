import cookieOptions from "../../config/cookieOptions.js";
const authenticationController = (servicioAuth) => {
  const login = async (req, res) => {
    try {
      const { contra, usuario, correo } = req.body;

      const dataLogin = { contra, usuario, correo };

      const datoUsuario = await servicioAuth.login(dataLogin);

      //creamoos la cookie
      res.cookie("token", datoUsuario.token, cookieOptions);

      res.status(200).json({
        message: "Has accedido correctamente a tu cuenta",
        usuario: datoUsuario.usuario,
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

  return { login, crearCuenta, logout };
};

export default authenticationController;

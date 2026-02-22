// Middleware para autenticar la cookie y verificar que el usuario esté autenticado

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // Obtener el token desde la cookie
    const token = req.cookies.token;

    // validar que el token exista
    if (!token) {
      return res.status(401).json({
        error: "No está autorizado para acceder a esta ruta",
      });
    }

    // verificar el token
    const dataToken = jwt.verify(token, process.env.JWT_SECRET);

    // guardar los datos del usuario en la request
    req.usuario = dataToken;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Token inválido o expirado",
    });
  }
};

export default authMiddleware;
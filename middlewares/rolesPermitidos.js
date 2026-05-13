const rolesPermitidos = (roles) => {
  //creamos la request para recuperar la informacion
  return (req, res, next) => {
    //verificamos si el usuario esta autenticado
    if (!req.usuario) {
      return res.status(401).json({
        mensaje: "No autorizado",
      });
    }

    //recuperamos el rol del JWT
    const role = req.usuario.rol;
    //comparamos que sea un rol valido admin usruario
    if (!roles.includes(role)) {
      return res.status(403).json({
        mensaje: "Accesoo denegado",
      });
    }

    next();
  };
};
export default rolesPermitidos;

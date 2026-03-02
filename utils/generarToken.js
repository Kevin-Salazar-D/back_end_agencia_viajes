import jwt from "jsonwebtoken";

const generarToken = (id, rol, usuario) => {
  return jwt.sign(
  { id: id, rol: rol, usuario: usuario },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);
};



export default generarToken;
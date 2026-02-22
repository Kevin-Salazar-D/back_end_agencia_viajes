import jwt from "jsonwebtoken";

const generarToken = (id, rol) => {
  return jwt.sign(
  { id: id, rol: rol },
  process.env.JWT_SECRET,
  {
    expiresIn: "1h"
  }
);
};



export default generarToken;
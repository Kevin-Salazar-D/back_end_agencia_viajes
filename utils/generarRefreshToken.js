import jwt from "jsonwebtoken";

const generarRefreshToken = (id, rol, usuario) => {
  return jwt.sign(
    { id, rol, usuario },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

export default generarRefreshToken;
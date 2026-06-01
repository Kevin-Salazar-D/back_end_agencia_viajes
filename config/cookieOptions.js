const cookieOptions = {
  httpOnly: true,
  secure: false,          // en localhost SIEMPRE false
  sameSite: "lax",        // 👈 CAMBIAR ESTO
  maxAge: 60 * 60 * 1000,
};

export default cookieOptions;
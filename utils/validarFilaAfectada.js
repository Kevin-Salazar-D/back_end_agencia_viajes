const validarFilaAfectada = (filas, mensaje) => {
  if (!filas || filas === 0) {
    const error = new Error(mensaje);
    error.status = 404;
    throw error;
  }
};

export default validarFilaAfectada;

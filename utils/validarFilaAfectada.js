const validarFilaAfectada = (filas, mensaje, estatus = 404) => {
  if (!filas || filas === 0) {
    const error = new Error(mensaje);
    error.status = estatus;
    throw error;
  }
};

export default validarFilaAfectada;

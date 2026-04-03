

const validarAutorizacion = (condicion, mensaje = "No autorizado") => {
  if (!condicion) {
    const error = new Error(mensaje);
    error.status = 401;
    throw error;
  }
};
export default validarAutorizacion;
const validarObjeto = (objeto, mensaje) => {
  if (
    !objeto ||                          // null, undefined, false
    typeof objeto !== "object" ||       // no es objeto
    Array.isArray(objeto) ||            // es array → no aplica
    Object.keys(objeto).length === 0    // objeto vacío {}
  ) {
    const error = new Error(mensaje);
    error.status = 404;
    throw error;
  }
};

export default validarObjeto;

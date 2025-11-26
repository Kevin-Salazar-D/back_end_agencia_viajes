const validarLista = (lista, mensaje = "") => {
  if (!Array.isArray(lista) || lista.length === 0) {
    const error = new Error(mensaje);
    error.status = 404;
    throw error;
  }
};

export default validarLista;
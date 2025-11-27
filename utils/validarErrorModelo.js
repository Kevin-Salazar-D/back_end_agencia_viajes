const validarErrorModelo = (error, mensaje) => {

const erroresModelo = {
  ER_NO_REFERENCED_ROW_2: 404,  // Clave primaria no encontrada
  ER_DUP_ENTRY: 409,            // Duplicado
  ER_ROW_IS_REFERENCED_2: 409,  
  ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 400 // Valor incorrecto, ej: fecha
};
  const status = erroresModelo[error.code];

  if (status) {
    const e = new Error(mensaje);
    e.status = status;
    throw e;
  }
};

export default validarErrorModelo;

const validarErrorModelo = (error, mensajePersonalizado) => {

  const erroresModelo = {
    ER_DUP_ENTRY: 409,
    ER_NO_REFERENCED_ROW_2: 404,
    ER_ROW_IS_REFERENCED_2: 409,
    ER_BAD_NULL_ERROR: 400,
    ER_DATA_TOO_LONG: 400,
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 400,
    ER_TRUNCATED_WRONG_VALUE: 400,
  };

  const status = erroresModelo[error.code];

  if (status) {
    const e = new Error(mensajePersonalizado || error.sqlMessage);
    e.status = status;
    throw e;
  }

  const e = new Error("Error interno en base de datos");
  e.status = 500;
  throw e;
};

export default validarErrorModelo;
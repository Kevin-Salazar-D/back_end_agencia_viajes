const validarErrorModelo = (error, mensaje) => {

  const erroresModelo = {
    ER_NO_REFERENCED_ROW_2: 404,  // Cuando no se encutra su clave primaria
    ER_DUP_ENTRY: 409 , // Cuando un o mas datos se Duplican
    ER_ROW_IS_REFERENCED_2:409        
  };

  const status = erroresModelo[error.code];

  if (status) {
    const e = new Error(mensaje);
    e.status = status;
    throw e;
  }
};

export default validarErrorModelo;

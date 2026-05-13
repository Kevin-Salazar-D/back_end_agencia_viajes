const validarErrorModelo = (error, mensajePersonalizado = null) => {
  const erroresModelo = {
    ER_DUP_ENTRY: {
      status: 409,
      message: "Este dato ya está registrado. Intenta otro.",
    },
    ER_NO_REFERENCED_ROW_2: {
      status: 404,
      message: "El registro al que intentas acceder o modificar ya no existe.",
    },
    ER_ROW_IS_REFERENCED_2: {
      status: 409,
      message: "No puedes eliminar esta información porque está siendo usada en otra parte del sistema.",
    },
    ER_BAD_NULL_ERROR: {
      status: 400,
      message: "Te faltó llenar un campo que es estrictamente obligatorio para la base de datos.",
    },
    ER_DATA_TOO_LONG: {
      status: 400,
      message: "Has escrito demasiado texto en un campo. Verifica que la nacionalidad o teléfono no pasen del límite.",
    },
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: {
      status: 400,
      message: "El tipo de dato que enviaste no coincide con lo que espera el sistema (ej. letras en lugar de números).",
    },
    ER_TRUNCATED_WRONG_VALUE: {
      status: 400,
      message: "El formato de un dato es inválido (revisa que la fecha esté correcta).",
    },
  };

  const errorConfig = erroresModelo[error.code];
  

  if (errorConfig) {
    
    const error = new Error(mensajePersonalizado || errorConfig.message);
     
    error.status = errorConfig.status;
    throw error;
  }

  const e = new Error("Ocurrió un error inesperado al guardar la información. Inténtalo más tarde.");
  e.status = 500;
  throw e;
};

export default validarErrorModelo;
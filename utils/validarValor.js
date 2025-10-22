
const validarValor = (valor, valoresPermitidos, mensaje, normalizar = true) => {
  const valorProcesado = normalizar ? String(valor).toLowerCase().trim() : valor;

  // También normalizamos la lista si se usa comparación en minúsculas
  const lista = normalizar
    ? valoresPermitidos.map(v => String(v).toLowerCase().trim())
    : valoresPermitidos;

  if (!lista.includes(valorProcesado)) {
    throw new Error(
      mensaje ||
        `Valor no válido. Valores permitidos: ${valoresPermitidos.join(", ")}`
    );
  }

  return valorProcesado;
};
 export default validarValor;
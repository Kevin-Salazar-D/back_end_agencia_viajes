const transformarLista = (datos, campos = []) => {
  if (!Array.isArray(datos)) {
    const nuevoDetalle = { ...datos };
    campos.forEach((campo) => {
      if (nuevoDetalle[campo]) {
        nuevoDetalle[campo] = nuevoDetalle[campo]
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean);
      } else {
        nuevoDetalle[campo] = [];
      }
    });
    return nuevoDetalle;
  }
  return datos.map((detalle) => {
    const nuevoDetalle = { ...detalle };

    campos.forEach((campo) => {
      if (nuevoDetalle[campo]) {
        nuevoDetalle[campo] = nuevoDetalle[campo]
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean);
      } else {
        nuevoDetalle[campo] = [];
      }
    });

    return nuevoDetalle;
  });
};

export default transformarLista;



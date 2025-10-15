const validarDatos = (data, message) => {
  let valores = [];

  //validamos que el data enviado sea un array
  if (data && typeof data !== "object" && !Array.isArray(data)) {
    valores = Object.values(data);
  } else {
    //al no ser un array lo convertimos a uno
    valores = [data];
  }

  if (valores.some((value) => value == null || value === "")) {
    const error = new Error(message);
    error.status = 400;
    throw error;
  }

  return true;
};
export default validarDatos;

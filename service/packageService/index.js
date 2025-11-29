import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";
import validarLista from "../../utils/validarLista.js";
import validarObjeto from "../../utils/validarObjeto.js"

const PaquetesServicio = (modeloPaquete) => {
  return {
    // Crear un paquete
    crearPaquete: async (paqueteData) => {
      validarDatos(paqueteData, "Faltaron campos para la creación del paquete");
      return await modeloPaquete.crearPaquete(paqueteData);
    },

    // Actualizar un paquete completo
    actualizarPaquete: async (paqueteData) => {
      validarDatos(paqueteData, "Faltaron campos para actualizar el paquete");

      const filasAfectadas = await modeloPaquete.actualizarPaquete(paqueteData);

      validarFilaAfectada(
        filasAfectadas,
        "No se encontró el paquete para actualizar"
      );

      return filasAfectadas;
    },

    // Mostrar paquetes filtrados por hotel
    mostrarPaquetesPorHotel: async (hotel_id) => {
      validarDatos(hotel_id, "Faltaron datos para hacer el filtro por paquetes ");

      const paquetesFiltrados = await modeloPaquete.mostrarPaquetesPorHotel(hotel_id);

      validarLista(
        paquetesFiltrados,
        "No se encontró ningún paquete para el hotel por el momento"
      );

      return paquetesFiltrados;
    },

    // Mostrar todos los paquetes
    mostrarTodosPaquetes: async () => {
      const paquetes = await modeloPaquete.mostrarTodosPaquetes();

      validarLista(paquetes, "No se encontraron paquetes");

      return paquetes;
    },

    // Mostrar paquete por ID
    mostrarPaqueteID: async (id) => {
      console.log(id);
      validarDatos(id, "No se proporcionó el id para buscar el paquete");
      const paquete = await modeloPaquete.mostrarPaqueteID(id);
      
      validarObjeto(paquete, "No se encontro el ID para encontrar un hotel");

      return paquete;
    },

    // Borrar paquete
    borrarPaquete: async (id) => {
      validarDatos(id, "Faltó el ID para borrar el paquete");

      const filasAfectadas = await modeloPaquete.borrarPaquete(id);

      validarFilaAfectada(filasAfectadas, "No se encontró el paquete a borrar");

      return filasAfectadas;
    },
  };
};

export default PaquetesServicio;

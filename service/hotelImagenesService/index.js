import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";
import validarLista from "../../utils/validarLista.js";

const imagenHotelServicio = (modelImagenHotel) => {
  return {

    /**
     * Crear una nueva imagen asociada a un hotel.
     * Valida los datos enviados y delega la inserción al modelo.
     */
    crearImagenHotel: async (imagenData) => {
      validarDatos(imagenData, "Faltaron campos para crear la imagen del hotel");
      return await modelImagenHotel.crearImagenHotel(imagenData);
    },

    /**
     * Actualizar una imagen completa del hotel.
     * Se requiere hotel_id y los campos a modificar.
     */
   actualizarImagenesHoteles: async (imagenData) => {
  validarDatos(imagenData, "Faltaron campos para actualizar la imagen del hotel");

  const filasAfectadas = await modelImagenHotel.actualizarImagenesHoteles(imagenData);

  validarFilaAfectada(
    filasAfectadas,
    "No se encontró la imagen asociada al hotel para actualizar"
  );

  return filasAfectadas;
},


    /**
     * Obtener todas las imágenes relacionadas a un hotel.
     * Se valida el ID y se revisa que existan resultados.
     */
    mostrarImagenesHotel: async (hotel_id) => {
      validarDatos(hotel_id, "Faltó el ID del hotel para mostrar sus imágenes");
      console.log(hotel_id)

      const listaImagenes = await modelImagenHotel.mostrarImagenesHotel(hotel_id);

      validarLista(listaImagenes, "No se encontró ninguna imagen asociada al hotel");

      return listaImagenes;
    },

    /**
     * Borrar una imagen específica del hotel por ID.
     */
    borrarImagenHotel: async (id) => {
                 console.log(id);
      validarDatos(id, "Faltó el ID de la imagen para borrarla");

      const filasAfectadas = await modelImagenHotel.borrarImagenHotel(id);

      validarFilaAfectada(
        filasAfectadas,
        "No se encontró la imagen del hotel para borrar"
      );

      return filasAfectadas;
    },
  };
};

export default imagenHotelServicio;

import validarDatos from "../../utils/validarDatos.js";
import validarValor from "../../utils/validarValor.js";

const transportService = (modelo) => {
  const tiposTransporte = ["avion", "camion"];

  return {
    crearTransporte: async (transporteData) => {
      validarDatos(transporteData, "Se requieren los datos del transporte.");

      const tipoValidado = validarValor(
        transporteData.tipo,
        tiposTransporte,
        "Tipos permitidos: 'avion', 'camion'",
      );

      const nuevoTransporte = {
        ...transporteData,
        tipo: tipoValidado,
        estatus:  0,
      };

      return await modelo.crearTransporte(nuevoTransporte);
    },

    actualizarTransporte: async (transporteData) => {
      validarDatos(transporteData, "Se requieren los datos del transporte.");

       const tipoValidado = validarValor(
        transporteData.tipo,
        tiposTransporte,
        "Tipos permitidos: 'avion', 'camion'",
      );

      const actualizarTransporte = {
        ...transporteData,
        tipo: tipoValidado,
      };

      return await modelo.actualizarTransporte(actualizarTransporte);
    },

    borrarTransporte: async (id) => {
      validarDatos(id, "Debe proporcionar el ID del transporte a eliminar.");
      const filasAfectadas = await modelo.borrarTransporte(id);
      if (filasAfectadas === 0)
        throw new Error("No se encontró el transporte con el ID proporcionado.");
      return filasAfectadas;
    },

    mostrarTodosTransportes: async () => {
      return await modelo.mostrarTodosTransportes();
    },

    buscarTransportePorId: async (id) => {
      validarDatos(id, "Debe proporcionar el ID del transporte a buscar.");
      const transporte = await modelo.buscarTransportePorId(id);
      if (!transporte) throw new Error("No se encontró el transporte con el ID proporcionado.");
      return transporte;
    },

    buscarTransportePorTipo: async (tipo) => {
     
      validarDatos(tipo, "Debe proporcionar el tipo de transporte a buscar.");
      const transportes = await modelo.buscarTransportePorTipo(tipo);
      if (transportes.length === 0)
        throw new Error("No se encontraron transportes del tipo proporcionado.");
      return transportes;
    },
  };
};

export default transportService;

import validarDatos from "../../utils/validarDatos.js";
import validarOpcionesPermitidas from "../../utils/validarOpcionesPermitidas.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";
import validarLista from "../../utils/validarLista.js";
import validarObjeto from "../../utils/validarObjeto.js";
const transportService = (modelo) => {
  const tiposTransporte = ["avion", "camion"];

  return {
    crearTransporte: async (transporteData) => {
      validarDatos(transporteData, "Se requieren los datos del transporte.");

      const tipoValidado = validarOpcionesPermitidas(
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

       const tipoValidado = validarOpcionesPermitidas(
        transporteData.tipo,
        tiposTransporte,
        "Tipos permitidos: 'avion', 'camion'",
      );

      validarFilaAfectada

      const actualizarTransporte = {
        ...transporteData,
        tipo: tipoValidado,
      };

      const trasporteActualizado = await modelo.actualizarTransporte(actualizarTransporte);
      validarFilaAfectada(trasporteActualizado, "El ID del trasporte no existe");
      return trasporteActualizado
    },

    borrarTransporte: async (id) => {
      validarDatos(id, "Debe proporcionar el ID del transporte a eliminar.");
      const filasAfectadas = await modelo.borrarTransporte(id);
      validarFilaAfectada(filasAfectadas, "No se encontro el trasporte para eliminarlo")
      return filasAfectadas;
    },

    mostrarTodosTransportes: async () => {
      return await modelo.mostrarTodosTransportes();
    },

    buscarTransportePorId: async (id) => {
      validarDatos(id, "Debe proporcionar el ID del transporte a buscar.");
      const transporte = await modelo.buscarTransportePorId(id);
      validarLista(transporte, "No se encontro el ID asociado a un trasporte");
      return transporte;
    },

    buscarTransportePorTipo: async (tipo) => {
     
      validarDatos(tipo, "Debe proporcionar el tipo de transporte a buscar.");
      const transportes = await modelo.buscarTransportePorTipo(tipo);
      validarLista(transportes, "Trasportes permitidos aviones o  camiones");
      return transportes;
    },
  };
};

export default transportService;

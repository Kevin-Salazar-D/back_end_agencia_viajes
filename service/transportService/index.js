import e from "express";
import validarDatos from "../../utils/validarDatos.js";

const transportService = (modelo) => {
  return {
    // Crear un transporte
    crearTransporte: async (transporteData) => {
      validarDatos(transporteData, "Faltan datos del transporte");
      const nuevoTransporte = {...transportService, estatus: 0 };
      const objetoTrasporte = ["avion", "camion"];
       const trasporte = objetoTrasporte.includes(nuevoTransporte.tipo.lowerCase()) ? modelo.crearTransporte(nuevoTransporte) :"Tipo de transporte no valido"
      return trasporte
    },

    // Actualizar un transporte
    actualizarTransporte: async (transporteData) => {
      validarDatos(transporteData, "Faltan datos del transporte");
      return modelo.actualizarTransporte(transporteData);
    },

    // Borrar un transporte
    borrarTransporte: async (id) => {
      validarDatos(id, "Falta el ID del transporte a eliminar");
      const filaAfectadas = await modelo.borrarTransporte(id);
      if (filaAfectadas === 0) throw new Error("No se encontró el transporte con el ID proporcionado");
        return filaAfectadas;
    },
    mostrarTodosTransportes: async () => {
      return modelo.mostrarTodosTransportes();
    },
    buscarTransportePorId: async (id) => {
      validarDatos(id, "Falta el ID del transporte a buscar");
      const transporte = await modelo.buscarTransportePorId(id);
      if (!transporte) throw new Error("No se encontró el transporte con el ID proporcionado");
        return transporte;
    },
    buscarTransportePorTipo: async (tipo) => {
      validarDatos(tipo, "Falta el tipo de transporte a buscar");
      const transportes = await modelo.buscarTransportePorTipo(tipo);
      if (transportes.length === 0) throw new Error("No se encontraron transportes del tipo proporcionado");
        return transportes;
    }
  };
};

export default transportService;
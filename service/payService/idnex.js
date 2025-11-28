import bcrypt from "bcryptjs";
import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";
import validarLista from "../../utils/validarLista.js";
import validarObjeto from "../../utils/validarObjeto.js";
import generarCodigosUnicos from "../../utils/generarCodigosUnicos.js"

const PagosServicio = (modeloPago) => {
  return {

    // Crear un pago
    crearPago: async (pagoData) => {
      validarDatos(pagoData, "Faltaron campos para la creación del pago");

      const salt = await bcrypt.genSalt(10);
      const folio = generarCodigosUnicos("FOLIO-", 6);
      const nuevoPago = {
        ...pagoData,
        estatus: 2, // por defecto 2 si no viene
        cvv: await bcrypt.hash(pagoData.cvv, salt), // CORREGIDO
        folio: folio
      };

      const pagoCreado = await modeloPago.crearPago(nuevoPago);
      return { numero_folio: folio, resultado: pagoCreado };
    },


    // Actualizar un pago (por folio)
    actualizarPago: async (pagoData) => {
      validarDatos(pagoData, "Faltaron campos para actualizar el pago");

      const filasAfectadas = await modeloPago.actualizarPago(pagoData);

      validarFilaAfectada(
        filasAfectadas,
        "No se encontró el pago para actualizar"
      );

      return filasAfectadas;
    },


    // Mostrar todos los pagos (info extendida)
    mostrarTodosPagos: async () => {
      const pagos = await modeloPago.mostrarTodosPagos();

      validarLista(
        pagos,
        "No se encontraron pagos registrados"
      );

      return pagos;
    },


    // Mostrar pago por reservación (info extendida)
    mostrarPagoPorReservacion: async (reservacion_id) => {
      validarDatos(
        reservacion_id,
        "No se proporcionó el ID de reservación para buscar el pago"
      );

      const pagos = await modeloPago.mostrarPagoPorReservacion(reservacion_id);

      validarLista(
        pagos,
        "No se encontró ningún pago asociado a la reservación"
      );

      return pagos;
    },


    // Mostrar pago por folio (info extendida)
    mostrarPagoPorFolio: async (folio) => {
      validarDatos(
        folio,
        "No se proporcionó el folio para buscar el pago"
      );

      const pago = await modeloPago.mostrarPagoPorFolio(folio);

      validarObjeto(
        pago,
        "No se encontró un pago con ese folio"
      );

      return pago;
    },


    // Borrar pago
    borrarPago: async (id) => {
      validarDatos(id, "No se proporcionó el ID del pago para borrar");

      const filasAfectadas = await modeloPago.borrarPago(id);

      validarFilaAfectada(
        filasAfectadas,
        "No se encontró el pago a borrar"
      );

      return filasAfectadas;
    },

  };
};

export default PagosServicio;

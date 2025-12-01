import validarDatos from "../../utils/validarDatos.js";
import validarFilaAfectada from "../../utils/validarFilaAfectada.js";
import validarLista from "../../utils/validarLista.js";
import validarOpcionesPermitidas from "../../utils/validarOpcionesPermitidas.js";
import validarObjeto from "../../utils/validarObjeto.js";
import generarCodigosUnicos from "../../utils/generarCodigosUnicos.js"

const reservacionServicio = (modeloReservacion, habitacionServicio) => {
  return {
    crearReservacion: async (reservacionData) => {
  validarDatos(
    reservacionData,
    "Faltaron campos para la creación de la reservación"
  );

  await habitacionServicio.apartarEstatusHabitacion(reservacionData.habitacion_id);
  const numeroReserva = generarCodigosUnicos("RES-", 6);
  const reservacionCompleta = {
    ...reservacionData,
    numero_reserva: numeroReserva,
    estatus: 0,
  };

  const resultadoCreado = await modeloReservacion.crearReservacion(reservacionCompleta);
  validarFilaAfectada(resultadoCreado, "No se pudo crear la reservación");

  return { numero_reserva: numeroReserva, resultado: resultadoCreado };
},

    actualizarReservacion: async (reservacionData) => {
      validarDatos(
        reservacionData,
        "Faltaron campos para la actualización de la reservación"
      );
      const resultado = await modeloReservacion.actualizarReservacion(
        reservacionData
      );
      reservacionData.estatus = validarOpcionesPermitidas( reservacionData.estatus, [0, 1, 2], "El estatus solo puede ser 0, 1 o 2", false);
      validarFilaAfectada(
        resultado,
        "No se encontró el ID para actualizar la reservación"
      );
      return resultado;
    },

    mostrarReservacion: async (numero_reserva) => {
      validarDatos(numero_reserva, "Faltó el número de reservación");
      const resultado = await modeloReservacion.mostrarReservacion(
        numero_reserva
      );
      validarObjeto(resultado, "No se encontró ninguna reservación");
      return resultado;
    },

    mostrarTodasReservaciones: async () => {
      const resultado = await modeloReservacion.mostrarTodasReservaciones();
      validarLista(resultado, "No se encontró ninguna reservación");
      return resultado;
    },

    borrarReservacion: async (reservacionData) => {
      validarDatos(
        reservacionData,
        "Faltó el número de reservación para borrar"
      );
      const resultado = await modeloReservacion.borrarReservacion(
        reservacionData.numero_reserva
      );
      validarFilaAfectada(resultado, "No se encontró la reservación a borrar");
      await habitacionServicio.desapartarEstatusHabitacion(reservacionData.habitacion_id);

      return resultado;
    },
  };

};

export default reservacionServicio;

import conexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";

const mysqlCliente = conexionMysql;


// Crear pago
const crearPago = async (pagoData) => {
  try {
    const sqlQuery = `
      INSERT INTO pagos 
      (usuario_id, paquete_id, reservacion_id, precio_final, numero_tarjeta, cvv, folio, estatus)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      pagoData.usuario_id || null,
      pagoData.paquete_id || null,
      pagoData.reservacion_id,
      pagoData.precio_final,
      pagoData.numero_tarjeta,
      pagoData.cvv,
      pagoData.folio,
      pagoData.estatus
    ]);

    return result.insertId;
  } catch (error) {
    validarErrorModelo(error, "Error al crear el pago. Reservación no válido.");
    throw error;
  }
};



// Actualizar pago
const actualizarPago = async (pagoData) => {
  try {
    const sqlQuery = `
      UPDATE pagos
      SET  precio_final = ? , estatus = ?
      WHERE folio = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      
      pagoData.precio_final,
      pagoData.estatus,
      pagoData.folio
    ]);

    return result.affectedRows;
  } catch (error) {
    validarErrorModelo(error, "Error al actualizar el pago.");
    throw error;
  }
};



// Mostrar todos los pagos (EXTENDIDO)
const mostrarTodosPagos = async () => {
  try {
    const sqlQuery = `
      SELECT 
        p.id AS pago_id,
        p.precio_final,
        p.numero_tarjeta,
        p.folio,
        p.estatus AS pago_estatus,
        p.fecha_pago,
        
        u.id AS usuario_id,
        u.usuario AS username,
        u.nombre AS nombre_usuario,
        u.apellido AS apellido_usuario,

        pa.id AS paquete_id,
        pa.tipo_paquete,
        pa.descripcion AS paquete_descripcion,
        pa.precio AS paquete_precio,

        r.id AS reservacion_id,
        r.numero_reserva,
        r.fecha_entrada,
        r.fecha_salida

      FROM pagos p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      LEFT JOIN paquetes pa ON p.paquete_id = pa.id
      LEFT JOIN reservaciones r ON p.reservacion_id = r.id
      ORDER BY p.id DESC;
    `;

    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error mostrando todos los pagos:", error);
    throw error;
  }
};



// Mostrar pago por reservación (EXTENDIDO)
const mostrarPagoPorReservacion = async (reservacion_id) => {
  try {
    const sqlQuery = `
      SELECT 
        p.id AS pago_id,
        p.precio_final,
        p.numero_tarjeta,
        p.folio,
        p.estatus AS pago_estatus,
        p.fecha_pago,
        
        u.id AS usuario_id,
        u.usuario AS username,
        u.nombre AS nombre_usuario,
        u.apellido AS apellido_usuario,

        pa.id AS paquete_id,
        pa.tipo_paquete,
        pa.descripcion AS paquete_descripcion,
        pa.precio AS paquete_precio,

        r.id AS reservacion_id,
        r.numero_reserva,
        r.fecha_entrada,
        r.fecha_salida

      FROM pagos p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      LEFT JOIN paquetes pa ON p.paquete_id = pa.id
      LEFT JOIN reservaciones r ON p.reservacion_id = r.id
      WHERE p.reservacion_id = ?
      ORDER BY p.id DESC;
    `;

    const [rows] = await mysqlCliente.query(sqlQuery, [reservacion_id]);
    return rows;
  } catch (error) {
    console.error("Error mostrando pagos por reservación:", error);
    throw error;
  }
};



// Mostrar pago por folio (EXTENDIDO)
const mostrarPagoPorFolio = async (folio) => {
  try {
    const sqlQuery = `
      SELECT 
        p.id AS pago_id,
        p.precio_final,
        p.numero_tarjeta,
        p.folio,
        p.estatus AS pago_estatus,
        p.fecha_pago,
        
        u.id AS usuario_id,
        u.usuario AS username,
        u.nombre AS nombre_usuario,
        u.apellido AS apellido_usuario,

        pa.id AS paquete_id,
        pa.tipo_paquete,
        pa.descripcion AS paquete_descripcion,
        pa.precio AS paquete_precio,

        r.id AS reservacion_id,
        r.numero_reserva,
        r.fecha_entrada,
        r.fecha_salida

      FROM pagos p
      LEFT JOIN usuarios u ON p.usuario_id = u.id
      LEFT JOIN paquetes pa ON p.paquete_id = pa.id
      LEFT JOIN reservaciones r ON p.reservacion_id = r.id
      WHERE p.folio = ?;
    `;

    const [rows] = await mysqlCliente.query(sqlQuery, [folio]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error mostrando pago por folio:", error);
    throw error;
  }
};



// Borrar pago
const borrarPago = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM pagos
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error borrando pago:", error);
    throw error;
  }
};



export default {
  crearPago,
  actualizarPago,
  mostrarTodosPagos,
  mostrarPagoPorReservacion,
  mostrarPagoPorFolio,
  borrarPago
};

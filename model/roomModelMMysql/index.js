import getConexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";

const conexionMysql = getConexionMysql;

/**
 * Crear habitación
 */
const crearHabitacion = async ({
  hotel_id,
  numero_habitacion,
  tipo_habitacion,
  estatus,
}) => {
  try {
    const sqlQuery = `
      INSERT INTO habitaciones (hotel_id, numero_habitacion, tipo_habitacion, estatus)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await conexionMysql.query(sqlQuery, [
      hotel_id,
      numero_habitacion,
      tipo_habitacion,
      estatus,
    ]);

    return result.insertId;
  } catch (error) {
    validarErrorModelo(error, "El hotel asociado no existe");
    throw error;
  }
};

/**
 * Actualizar habitación principal (sin cambiar hotel)
 */
const actualizarHabitacion = async ({
  id,
  numero_habitacion,
  tipo_habitacion,
  estatus,
}) => {
  try {
    const sqlQuery = `
      UPDATE habitaciones
      SET numero_habitacion = ?, tipo_habitacion = ?, estatus = ?
      WHERE id = ?
    `;

    const [result] = await conexionMysql.query(sqlQuery, [
      numero_habitacion,
      tipo_habitacion,
      estatus,
      id,
    ]);

    return result.affectedRows;
  } catch (error) {
    console.error("Error actualizando la habitación:", error);
    throw error;
  }
};

/**
 * Actualizar hotel asignado a la habitación
 */
const actualizarIdHabitacion = async ({ id, hotel_id }) => {
  try {
    const sqlQuery = `
      UPDATE habitaciones
      SET hotel_id = ?
      WHERE id = ?
    `;

    const [result] = await conexionMysql.query(sqlQuery, [hotel_id, id]);

    return result.affectedRows;
  } catch (error) {
    console.error("Error actualizando hotel de habitación:", error);
    throw error;
  }
};

/**
 * Cambiar estatus (apartar, mantenimiento, disponible)
 */
const modificarEstatusHabitacion = async ({ estatus, id }) => {
  try {
    const sqlQuery = `
      UPDATE habitaciones
      SET estatus = ?
      WHERE id = ?
    `;

    const [result] = await conexionMysql.query(sqlQuery, [estatus, id]);

    return result;
  } catch (error) {
    console.error("Error actualizando estatus de habitación:", error);
    throw error;
  }
};


/**
 * Obtener habitación por ID
 */
const mostrarHabitacionID = async (id) => {
  try {
    const sqlQuery = `
      SELECT *
      FROM habitaciones
      WHERE id = ?
    `;
    const [result] = await conexionMysql.query(sqlQuery, [id]);
    return result;
  } catch (error) {
    console.error("Error obteniendo habitación:", error);
    throw error;
  }
};

/**
 * Obtener todas las habitaciones
 */
const mostrarTodasHabitaciones = async () => {
  try {
    const sqlQuery = `SELECT * FROM habitaciones`;
    const [result] = await conexionMysql.query(sqlQuery);
    return result;
  } catch (error) {
    console.error("Error obteniendo habitaciones:", error);
    throw error;
  }
};

/**
 * Obtener habitaciones por hotel
 */
const mostrarHabitacionesPorHotel = async (hotelId) => {
  try {
    const sqlQuery = `
      SELECT *
      FROM habitaciones
      WHERE hotel_id = ?
    `;
    const [result] = await conexionMysql.query(sqlQuery, [hotelId]);
    return result;
  } catch (error) {
    console.error("Error obteniendo habitaciones por hotel:", error);
    throw error;
  }
};


/**
 * Eliminar habitación
 */
const borrarHabitacion = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM habitaciones
      WHERE id = ?
    `;
    const [result] = await conexionMysql.query(sqlQuery, [id]);
    return result.affectedRows;
  } catch (error) {
    console.error("Error eliminando habitación:", error);
    throw error;
  }
};

export default {
  crearHabitacion,
  actualizarHabitacion,
  actualizarIdHabitacion,
  modificarEstatusHabitacion,
  mostrarHabitacionID,
  mostrarTodasHabitaciones,
  mostrarHabitacionesPorHotel,
  borrarHabitacion,
};

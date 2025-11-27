import conexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";

const mysqlCliente = conexionMysql;

// Crear detalles de un hotel
const crearDetallesHoteles = async (hotelData) => {
  try {
    const sqlQuery = `
      INSERT INTO hoteles_detalles 
        (hotel_id, descripcion, amenidades, total_resenas, politicas, check_in, check_out, cancelacion, retricciones, precio_noche)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelData.hotel_id,
      hotelData.descripcion,
      hotelData.amenidades,
      hotelData.total_resenas,
      hotelData.politicas,
      hotelData.check_in,
      hotelData.check_out,
      hotelData.cancelacion,
      hotelData.retricciones, 
      hotelData.precio_noche,
    ]);

    return result.insertId;
  } catch (error) {
    validarErrorModelo(error, "Error creando detalles del hotel");
    throw error;
  }
};

// Actualizar detalles de un hotel
const actualizarDetallesHotel = async (hotelData) => {
  try {
    const sqlQuery = `
      UPDATE hoteles_detalles
      SET descripcion = ?, amenidades = ?, total_resenas = ?, politicas = ?, 
          check_in = ?, check_out = ?, cancelacion = ?, retricciones = ?, precio_noche = ?
      WHERE hotel_id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelData.descripcion,
      hotelData.amenidades,
      hotelData.total_resenas,
      hotelData.politicas,
      hotelData.check_in,
      hotelData.check_out,
      hotelData.cancelacion,
      hotelData.retriccciones,
      hotelData.precio_noche,
      hotelData.hotel_id,
    ]);

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

// Mostrar todos los detalles
const mostrarTodosDetallesHoteles = async () => {
  try {
    const sqlQuery = `
      SELECT * FROM hoteles_detalles
      ORDER BY id ASC
    `;

    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error mostrando detalles de hoteles:", error);
    throw error;
  }
};

// Mostrar detalles de un hotel
const mostrarDetallesDeUnHotel = async (hotel_id) => {
  try {
    const sqlQuery = `
      SELECT * FROM hoteles_detalles
      WHERE hotel_id = ?
    `;

    const [rows] = await mysqlCliente.query(sqlQuery, [hotel_id]);
    return rows[0];
  } catch (error) {
    validarErrorModelo(error, "No se encontraron detalles del hotel");
    throw error;
  }
};

// Borrar un detalle de un hotel
const borrarDetalleHotel = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM hoteles_detalles
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [id]);
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export default {
  crearDetallesHoteles,
  actualizarDetallesHotel,
  mostrarTodosDetallesHoteles,
  mostrarDetallesDeUnHotel,
  borrarDetalleHotel,
};

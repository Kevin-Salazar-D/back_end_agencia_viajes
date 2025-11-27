import conexionMysql from "../../config/mysql.js";
import validarErrorModelo from "../../utils/validarErrorModelo.js";

const mysqlCliente = conexionMysql;

const crearImagenHotel = async (hotelData) => {
  try {
    const sqlQuery = `
      INSERT INTO hotel_imagenes 
        (hotel_id, url, orden)
      VALUES (?, ?, ?)
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelData.hotel_id,
      hotelData.url,
      hotelData.orden,
    ]);

    return result.insertId;
  } catch (error) {
     validarErrorModelo(error, "No se encuntra el Hotel o no se puede repetir orden");
     throw error;
  }
};

// actualizar las imagenes de un hotel
const actualizarImagenesHoteles = async (hotelData) => {
  try {
    const sqlQuery = `
      UPDATE hotel_imagenes
      SET url = ?, tipo = ?
      WHERE orden = ? AND hotel_id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [
      hotelData.url,
      hotelData.tipo,
      hotelData.orden,
      hotelData.hotel_id
    ]);

    return result.affectedRows;
  } catch (error) {
    validarErrorModelo(error, "No se puede repetir el orden de la imagen");
    throw error;
  }
};


// mostrar las imagenes de un hotel
const mostrarImagenesHotel = async (hotel_id) => {
  try {
    const sqlQuery = `
      SELECT * 
      FROM hotel_imagenes
      WHERE hotel_id = ?
      ORDER BY orden ASC
    `;
    const [imagenes] = await mysqlCliente.query(sqlQuery, [hotel_id]);
    return imagenes;
  } catch (error) {
    throw error;
  }
};

// Borrar todas las imagenes de un hotel
const borrarImagenHotel = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM hotel_imagenes
      WHERE id = ?
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [id]);
    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};


export default {
  crearImagenHotel,
  actualizarImagenesHoteles,
  mostrarImagenesHotel,
  borrarImagenHotel,
};

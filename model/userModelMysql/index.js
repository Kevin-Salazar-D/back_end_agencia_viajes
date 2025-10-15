// models/usuarioModel.js
import conexionMysql from "../../config/mysql.js";

//Trae la conexion a la base de datos
const mysqlCliente = conexionMysql;

/**
 * Crear un usuario en la base de datos
 * @param {Object} usuarioDB
 * @returns {Number} insertId generado
 */
const crearUsuario = async (usuarioDB) => {
  try {
    const sqlQuery = `
      INSERT INTO usuarios (usuario, correo, contra, nombre, apellido, telefono)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [
      usuarioDB.usuario,
      usuarioDB.correo,
      usuarioDB.contra, 
      usuarioDB.nombre,
      usuarioDB.apellido,
      usuarioDB.telefono
    ]);

    return result.insertId; // Devuelve el ID generado automáticamente
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};

/**
 * Actualizar un usuario en la base de datos
 * @param {Object} usuarioDB
 * @returns {Number} affectedRows
 */
const actualizarUsuario = async (usuarioDB) => {
  try {
    const sqlQuery = `
      UPDATE usuarios
      SET usuario = ?, correo = ?, nombre = ?, apellido = ?, telefono = ?
      WHERE id = ?
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [
      usuarioDB.usuario,
      usuarioDB.correo,
      usuarioDB.nombre,
      usuarioDB.apellido,
      usuarioDB.telefono,
      usuarioDB.id // Necesario para identificar el usuario a actualizar
    ]);

    return result.affectedRows; // Cuántas filas se actualizaron
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

/**
 * Borrar un usuario por ID
 * @param {Number} id
 * @returns {Number} affectedRows
 */
const borrarUsuario = async (id) => {
  try {
    const sqlQuery = `
      DELETE FROM usuarios
      WHERE id = ?
    `;
    const [result] = await mysqlCliente.query(sqlQuery, [id]);
    return result.affectedRows; // Cuántas filas se borraron
  } catch (error) {
    console.error("Error borrando usuario:", error);
    throw error;
  }
};

/**
 * Mostrar todos los usuarios
 * @returns {Array} usuarios
 */
const mostrarTodosUsuarios = async () => {
  try {
    const sqlQuery = `
      SELECT * FROM usuarios
      ORDER BY id ASC
    `;
    const [rows] = await mysqlCliente.query(sqlQuery);
    return rows;
  } catch (error) {
    console.error("Error mostrando usuarios:", error);
    throw error;
  }
};

export default { crearUsuario, actualizarUsuario, borrarUsuario, mostrarTodosUsuarios };

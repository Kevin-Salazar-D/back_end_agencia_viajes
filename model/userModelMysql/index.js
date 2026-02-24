// models/usuarioModel.js
import conexionMysql from "../../config/mysql.js";
//validaciones
import validarErrorModelo from "../../utils/validarErrorModelo.js";
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
      usuarioDB.telefono,
    ]);

    return result.insertId; // Devuelve el ID generado automáticamente
  } catch (error) {
    validarErrorModelo(
      error,
      "Se duplico un campo, no puede ser igual el correo o usuario",
    );
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
      usuarioDB.id, // Necesario para identificar el usuario a actualizar
    ]);

    return result.affectedRows; // Cuántas filas se actualizaron
  } catch (error) {
    validarErrorModelo(
      error,
      "Se duplico un campo, no puede ser igual el correo o usuario",
    );

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

/**
 * buscar un usuario por correo
 * @returns {Array} usuarios
 */
const buscarUsuarioPorCorreo = async (correo, usuario) => {
  try {
    const sqlQuery = `
      SELECT * FROM usuarios
      WHERE correo = ? OR usuario = ?
       LIMIT 1
    `;
    const [rows] = await mysqlCliente.query(sqlQuery, [correo, usuario]);
    return rows[0] || null;
  } catch (error) {
    console.error("Error buscando a un usuarios:", error);
    throw error;
  }
};

const buscarUsuariosID = async (usuario_id) => {
  try {
    const sqlQuery = `
   SELECT id, usuario, correo, nombre, apellido, telefono, rol,
             secreto_temporal_dos_pasos,
             secreto_dos_pasos,
             activacion_dos_pasos
      FROM usuarios
      WHERE id = ?
      LIMIT 1
   `;

    const [rows] = await mysqlCliente.query(sqlQuery, [usuario_id]);
    
    return rows[0];
  } catch (error) {
    validarErrorModelo(
      "No se pudo hacer la consulta para encontrar el Usuario",
    );
    throw error;
  }
};

const guardarSecretoTemporal2FA = async (userId, secreto) => {
  try {
    const sqlQuery = `
      UPDATE usuarios
      SET secreto_temporal_dos_pasos = ?
      WHERE id = ?
    `;

    const [result] = await mysqlCliente.query(sqlQuery, [secreto, userId]);

    return result.affectedRows;
  } catch (error) {
    validarErrorModelo(error, "No se pudo guardar el dato temporal");
    throw error;
  }
};

const guardarSecreto2FA = async (userId, secreto) => {
  try {
    const sqlQuery = `
  UPDATE usuarios
  SET secreto_dos_pasos = ?,
      activacion_dos_pasos = true,
      secreto_temporal_dos_pasos = null
  WHERE id = ?
`;

    const [result] = await mysqlCliente.query(sqlQuery, [secreto, userId]);

    return result.affectedRows;
  } catch (error) {
    validarErrorModelo(error, "No se pudo guardar el dato temporal");
    throw error;
  }
};

export default {
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  mostrarTodosUsuarios,
  buscarUsuarioPorCorreo,
  guardarSecretoTemporal2FA,
  buscarUsuariosID,
  guardarSecreto2FA
};

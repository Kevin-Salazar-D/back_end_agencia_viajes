//archivo para la conexion a la base de datos mysql por separado
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env para ejecutar la db
dotenv.config();

let conexionMysql;

try {
  conexionMysql = mysql2.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "agenciaDB",
  });
} catch (error) {
  console.error(" Error al conectar a la base de datos MySQL:", error.message);
  process.exit(1); // Salir del proceso con un código de error
}

export default conexionMysql;

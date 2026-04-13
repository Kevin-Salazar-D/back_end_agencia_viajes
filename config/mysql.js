//archivo para la conexion a la base de datos mysql por separado
import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

// Cargar variables de entorno desde el archivo .env para ejecutar la db
dotenv.config();

let conexionMysql;

try {
  conexionMysql = mysql2.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "1234",
    database: process.env.DB_NAME || "agenciadb",
    // 👇 ESTA LÍNEA ES LA QUE FALTA
    port: Number(process.env.DB_PORT) || 3308, 
  });
  
  console.log("🚀 Pool de conexiones MySQL configurado en puerto:", process.env.DB_PORT || 3308);
} catch (error) {
  console.error("❌ Error al configurar el pool de MySQL:", error.message);
  process.exit(1); 
}

export default conexionMysql;



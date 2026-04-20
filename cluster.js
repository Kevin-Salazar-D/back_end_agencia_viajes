import cluster from "cluster";
import os from "os";
import app from "./app.js";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";

// Leemos el .env
dotenv.config();

const PORT = process.env.PORT || 3000;

const isProduction = 
  process.env.NODE_ENV === "production" || 
  process.env.node_env === "production" || 
  process.env.RENDER === "true" ||
  process.env.RENDER;

// Proceso master
if (cluster.isPrimary) {
  const numCPUs = process.env.RENDER ? 1 : os.cpus().length;

  //console.log(`Master PID ${process.pid}`);
  console.log(`Lanzando ${numCPUs} workers...\n`);

  // Lanzar workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Si un worker muere, crear otro
  cluster.on("exit", (worker) => {
    //console.log(`Worker ${worker.process.pid} murió. Creando nuevo...`);
    cluster.fork();
  });
} else {
  // Middleware para ver qué worker atiende cada petición
  app.use((req, res, next) => {
    // console.log(` Worker ${process.pid} atendió: ${req.method} ${req.url}`);
    next();
  });

  if (isProduction) {
    // Iniciar servidor en cada worker
    app.listen(PORT, () => {
      //console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}`);
    });
  } else {
    //Variables para certificado y llave ssl
    const options = {
      key: fs.readFileSync("server.key") || "",
      cert: fs.readFileSync("server.cert") || "",
    };

    https.createServer(options, app).listen(PORT, () => {
      console.log(
        `Worker ${process.pid} en LOCAL escuchando en https://localhost:${PORT}`,
      );
    });
  }
}

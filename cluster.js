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

  console.log(`Lanzando ${numCPUs} workers...\n`);

  // Lanzar workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Si un worker muere, crear otro
  cluster.on("exit", (worker) => {
    cluster.fork();
  });
} else {
  // Middleware para ver qué worker atiende cada petición
  app.use((req, res, next) => {
    next();
  });

  if (isProduction) {
    app.listen(PORT, () => {
    });
  } else {
    const keyPath = "server.key";
    const certPath = "server.cert";

    
    if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
      const options = {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      };
      
      https.createServer(options, app).listen(PORT, () => {
        console.log(`Worker ${process.pid} en LOCAL escuchando en https://localhost:${PORT}`);
      });
    } else {
      console.warn(`⚠️ Worker ${process.pid}: Certificados SSL locales no encontrados. Iniciando en HTTP normal...`);
      app.listen(PORT, () => {
        console.log(`Worker ${process.pid} en LOCAL escuchando en http://localhost:${PORT}`);
      });
    }
  }
}
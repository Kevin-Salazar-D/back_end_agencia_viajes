import cluster from "cluster";
import os from "os";
import app from "./app.js";
import dotenv from "dotenv";

// Leemos el .env
dotenv.config();

const PORT = process.env.PORT || 3000;

// Proceso master
if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  console.log(`Master PID ${process.pid}`);
  console.log(`Lanzando ${numCPUs} workers...\n`);

  // Lanzar workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Si un worker muere, crear otro
  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} murió. Creando nuevo...`);
    cluster.fork();
  });

} else {
  // Middleware para ver qué worker atiende cada petición
  app.use((req, res, next) => {
    console.log(` Worker ${process.pid} atendió: ${req.method} ${req.url}`);
    next();
  });

  // Iniciar servidor en cada worker
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} escuchando en http://localhost:${PORT}`);
  });
}

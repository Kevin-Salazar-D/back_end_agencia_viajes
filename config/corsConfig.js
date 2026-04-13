import cors from "cors";

const corsInfo = {
  // Permitimos ambos puertos por si Vite decide cambiar entre ellos
  origin: ["http://localhost:5173", "http://localhost:5174"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Útil si vas a usar cookies o sesiones más adelante
}

export default cors(corsInfo);
import cors from "cors";

const urlProduccion = process.env.FRONTEND_URL;

const corsInfo = {
  origin: [
    'http://localhost:5173', 
    'https://localhost:5173', 
    'http://192.168.100.15:5173', 
    'https://192.168.100.15:5173', 
    urlProduccion
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  //autorizar por falta de token
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
}

export default cors(corsInfo);
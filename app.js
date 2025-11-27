import express from "express";
import morgan from "morgan";

// --- Modelos ---
import userModel from "./model/userModelMysql/index.js";
import cityModel from "./model/cityModelMysql/index.js";
import hotelModel from "./model/hotelModelMysql/index.js";
import roomModel from "./model/roomModelMMysql/index.js";
import transportModel from "./model/transportModelMysql/index.js";
import hotelDetailsMysql from "./model/hotelDetailsMysql/index.js";

// --- Servicios ---
import userService from "./service/userService/index.js";
import cityService from "./service/cityService/index.js";
import hotelService from "./service/hotelService/index.js";
import roomService from "./service/roomService/index.js";
import transportService from "./service/transportService/index.js";
import hotelDetailsService from "./service/hotelDetailsService/index.js";

// --- Controladores ---
import userController from "./controllers/userController/index.js";
import cityController from "./controllers/cityController/index.js";
import hotelController from "./controllers/hotelController/index.js";
import roomController from "./controllers/roomController/index.js";
import transportController from "./controllers/transportController/index.js";
import hotelDetailsController from "./controllers/hotelDetailsController/index.js";

// --- Rutas (factories) ---
import { 
  usuarioRutasFactory, 
  ciudadRutasFactory, 
  hotelRutasFactory, 
  roomRutasFactory, 
  transportFactory, 
  hotelDetailsFactory 
} from "./routes/index.js";

// Swagger
import setupSwagger from "./config/swaggerConfig.js";

// CORS
import corsConfig from "./config/corsConfig.js";

const app = express();
const PUERTO = 3000;

// --- MIDDLEWARES ---
app.use(express.json());
app.use(morgan("dev"));
app.use(corsConfig);

// --- INYECCIÓN DE DEPENDENCIAS ---

// Usuarios
const usuarioServicio = userService(userModel);
const usuarioControlador = userController(usuarioServicio);
const usuarioRutas = usuarioRutasFactory(usuarioControlador);

// Ciudades
const ciudadServicio = cityService(cityModel);
const ciudadControlador = cityController(ciudadServicio);
const ciudadRutas = ciudadRutasFactory(ciudadControlador);

// Hoteles
const hotelServicio = hotelService(hotelModel);
const hotelControlador = hotelController(hotelServicio);
const hotelRutas = hotelRutasFactory(hotelControlador);

// Habitaciones
const habitacionServicio = roomService(roomModel);
const habitacionControlador = roomController(habitacionServicio);
const habitacionRutas = roomRutasFactory(habitacionControlador);

// Transportes
const transportServicio = transportService(transportModel);
const transportControlador = transportController(transportServicio);
const transportRutas = transportFactory(transportControlador);

// **Detalles de Hoteles**
const hotelDetallesServicio = hotelDetailsService(hotelDetailsMysql);
const hotelDetallesControlador = hotelDetailsController(hotelDetallesServicio);
const hotelDetallesRutas = hotelDetailsFactory(hotelDetallesControlador);

// --- RUTAS PRINCIPALES ---
app.use("/agenciaViajes/usuarios", usuarioRutas);
app.use("/agenciaViajes/ciudades", ciudadRutas);
app.use("/agenciaViajes/hoteles", hotelRutas);
app.use("/agenciaViajes/habitaciones", habitacionRutas);
app.use("/agenciaViajes/transportes", transportRutas);
app.use("/agenciaViajes/hotelDetalles", hotelDetallesRutas);

// Swagger
setupSwagger(app);

// --- INICIO DEL SERVIDOR ---
app.listen(PUERTO, () => {
  console.log(`Servidor arrancando en http://localhost:${PUERTO}`);
});

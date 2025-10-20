import express from "express";
import morgan from "morgan";

// --- Modelos ---
import userModel from "./model/userModelMysql/index.js";
import cityModel from "./model/cityModelMysql/index.js";
import hotelModel from "./model/hotelModelMysql/index.js";
import roomModel from "./model/roomModelMMysql/index.js";

// --- Servicios ---
import userService from "./service/userService/index.js";
import cityService from "./service/cityService/index.js";
import hotelService from "./service/hotelService/index.js";
import roomService  from "./service/roomService/index.js";
// --- Controladores ---
import userController from "./controllers/userController/index.js";
import cityController from "./controllers/cityController/index.js";
import hotelController from "./controllers/hotelController/index.js";
import roomController from "./controllers/roomController/index.js";

// --- Rutas (factories) ---
import { usuarioRutasFactory, ciudadRutasFactory, hotelRutasFactory, roomRutasFactory} from "./routes/index.js";

import setupSwagger from "./config/swaggerConfig.js";

const app = express();
const PUERTO = 3000;

// --- MIDDLEWARES ---
app.use(express.json());
app.use(morgan("dev"));

// --- INYECCIÓN DE DEPENDENCIAS ---
// Usuarios
const usuarioServicio = userService(userModel);
const usuarioControlador = userController(usuarioServicio);
const usuarioRutas = usuarioRutasFactory(usuarioControlador);

// Ciudades
const ciudadServicio = cityService(cityModel);
const ciudadControlador = cityController(ciudadServicio);
const ciudadRutas = ciudadRutasFactory(ciudadControlador);

//hoteles
const hotelServicio = hotelService(hotelModel);
const hotelControlador = hotelController(hotelServicio);
const hotelRutas = hotelRutasFactory(hotelControlador);

//habitaciones
const habitacionServicio = roomService(roomModel);
const habitacionControlador = roomController(habitacionServicio);
const habitacionRutas = roomRutasFactory(habitacionControlador);

// --- RUTAS PRINCIPALES ---
app.use("/agenciaViajes/usuarios", usuarioRutas);
app.use("/agenciaViajes/ciudades", ciudadRutas);
app.use("/agenciaViajes/hoteles", hotelRutas);
app.use("/agenciaViajes/habitaciones", habitacionRutas);

setupSwagger(app)

// --- INICIO DEL SERVIDOR ---
app.listen(PUERTO, () => {
  console.log(`Servidor arrancando en http://localhost:${PUERTO}`);
});

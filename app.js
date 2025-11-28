import express from "express";
import morgan from "morgan";

// --- Modelos ---
import userModel from "./model/userModelMysql/index.js";
import cityModel from "./model/cityModelMysql/index.js";
import hotelModel from "./model/hotelModelMysql/index.js";
import roomModel from "./model/roomModelMMysql/index.js";
import transportModel from "./model/transportModelMysql/index.js";
import hotelDetailsMysql from "./model/hotelDetailsMysql/index.js";
import hotelImagenesMysql from "./model/hotelImagenesMysql/index.js";
import journeyModel from "./model/journeyModelMysql/index.js";
import packageModel from "./model/packegeModelMysql/index.js";
import reservationModel from "./model/reservationMysql/index.js";

// --- Servicios ---
import userService from "./service/userService/index.js";
import cityService from "./service/cityService/index.js";
import hotelService from "./service/hotelService/index.js";
import roomService from "./service/roomService/index.js";
import transportService from "./service/transportService/index.js";
import hotelDetailsService from "./service/hotelDetailsService/index.js";
import hotelImagenesService from "./service/hotelImagenesService/index.js";
import journeyService from "./service/journeyService/index.js";
import packageService from "./service/packageService/index.js";
import reservationService from "./service/reservationService/index.js";

// --- Controladores ---
import userController from "./controllers/userController/index.js";
import cityController from "./controllers/cityController/index.js";
import hotelController from "./controllers/hotelController/index.js";
import roomController from "./controllers/roomController/index.js";
import transportController from "./controllers/transportController/index.js";
import hotelDetailsController from "./controllers/hotelDetailsController/index.js";
import hotelImagenesController from "./controllers/hotelImagenesController/index.js";
import journeyController from "./controllers/journeyController/index.js";
import packageController from "./controllers/packageController/index.js";
import reservationController from "./controllers/reservationController/index.js";

// --- Rutas (factories) ---
import { 
  usuarioRutasFactory, 
  ciudadRutasFactory, 
  hotelRutasFactory, 
  roomRutasFactory, 
  transportFactory, 
  hotelDetailsFactory,
  hotelesImagenesFactory,
  journeyRutasFactory,
  packageRutasFactory,
  reservationFactory
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

// Detalles de Hoteles
const hotelDetallesServicio = hotelDetailsService(hotelDetailsMysql);
const hotelDetallesControlador = hotelDetailsController(hotelDetallesServicio);
const hotelDetallesRutas = hotelDetailsFactory(hotelDetallesControlador);

// Imágenes de hoteles 
const hotelImagenServicio = hotelImagenesService(hotelImagenesMysql);
const hotelImagenesControlador = hotelImagenesController(hotelImagenServicio);
const hotelImagenRutas = hotelesImagenesFactory(hotelImagenesControlador);

// Viajes
const viajeServicio = journeyService(journeyModel);
const viajeControlador = journeyController(viajeServicio);
const viajeRutas = journeyRutasFactory(viajeControlador);

// paquetes
const paquetesServicio = packageService(packageModel);
const paqueteControlador = packageController(paquetesServicio);
const paqueteRutas = packageRutasFactory(paqueteControlador);

// reservaciones
const reservacionServicio = reservationService(reservationModel,habitacionServicio);
const reservacionControlador = reservationController(reservacionServicio);
const reservacionRutas = reservationFactory(reservacionControlador);

// --- RUTAS PRINCIPALES ---
app.use("/agenciaViajes/usuarios", usuarioRutas);
app.use("/agenciaViajes/ciudades", ciudadRutas);
app.use("/agenciaViajes/hoteles", hotelRutas);
app.use("/agenciaViajes/habitaciones", habitacionRutas);
app.use("/agenciaViajes/transportes", transportRutas);
app.use("/agenciaViajes/hotelDetalles", hotelDetallesRutas);
app.use("/agenciaViajes/hotelImagenes", hotelImagenRutas);
app.use("/agenciaViajes/viajes", viajeRutas);
app.use("/agenciaViajes/paquetes", paqueteRutas);
app.use("/agenciaViajes/reservaciones", reservacionRutas);

// Swagger
setupSwagger(app);

// --- INICIO DEL SERVIDOR ---
app.listen(PUERTO, () => {
  console.log(`Servidor arrancando en http://localhost:${PUERTO}`);
});

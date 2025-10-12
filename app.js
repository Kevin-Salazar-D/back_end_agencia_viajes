import express from "express";
import morgan from "morgan";

// modelos
import mysqlModel from "./model/modelMysql/index.js"; 

// servicios
import userService from "./service/userService/index.js";

// controladores
import userController from "./controllers/userController/index.js";

// rutas
import router, { usuarioRutasFactory } from "./routes/index.js";

const PUERTO = 3000;
const app = express();

// --- MIDDLEWARES GLOBALES ---
app.use(express.json());
app.use(morgan("dev"));

// --- INYECCIÓN DE DEPENDENCIAS ---
const usuarioServicio = userService(mysqlModel); // modelo → servicio
const usuarioControlador = userController(usuarioServicio); // servicio → controlador
const usuarioRutas = usuarioRutasFactory(usuarioControlador); // controlador → rutas

// --- RUTAS PRINCIPALES ---
app.use("/agenciaViajes", usuarioRutas);

app.listen(PUERTO, () => {
  console.log(` Servidor arrancando en http://localhost:${PUERTO}`);
});

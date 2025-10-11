import express from "express";

const PUERTO = 3000;

//habilatamos el servidor
const app = express();
app.use(express.json());

app.listen(PUERTO, ()=>{
  console.log(`Servidor venido en http://localhost:${PUERTO}`);
})


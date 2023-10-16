import Express, { application } from "express";
import morgan from "morgan";
import cors from "cors";
import tasksRoutes from "./routes/routes.js"; //no es necesario especificar porque hay 1 archivo en la carpeta

import { json } from "express";

const app = Express();

// //Middlewares
app.use(morgan("dev")); //Morgan muestra por consola los recursos que llegan al servidor.
app.use(cors()); // CORS permite la conexion entre distintos puertos, en este caso el frontend en con el backend.
app.use(Express.json()); //esta opcion habilita las solicitudes en JSON
app.use("/api", tasksRoutes);

export default app;

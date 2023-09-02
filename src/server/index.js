import app from "./app.js";

import { connect } from "./db/mongo.js";
connect(); //conectar a la base de datos.

//Iniciar Servidor
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server open on http://localhost:${port}`));

const express = require("express");
const ConectarBD = require("./config/db");
const cors = require ("cors");

// servidor
const app = express();
//configuración del puerto
const PORT = process.env.PORT || 5000;
//conexión a la bd
ConectarBD();
//habilitación del cors
app.use(cors());
//habilitación del express y json
app.use(express.json({extended : true}));

//Creamos las Rutas del proyecto
app.use ("/api/usuarios", require("./routes/usuarios"))
app.use ("/api/auth", require("./routes/auth"))
app.use ("/api/herramientas", require("./routes/herramientas"))
app.use ("/api/insumos", require("./routes/insumos"))
app.use ("/api/materiales", require("./routes/materiales"))

// CONFIGURACION DEL SERVIDOR

app.listen(PORT, () =>{
    console.log("el servidor esta conectado")

})
const express = require("express"); // Importar express
const routerApi = require("./routes"); // Importar las rutas
const app = express(); // Crear una instancia de express
const port = 3000; // Definir el puerto
const cors = require("cors"); // Importar cors
app.use(express.json());

app.use(cors());
routerApi(app);

app.listen(port, () => {
  console.log("Mi puerto" + port);
});
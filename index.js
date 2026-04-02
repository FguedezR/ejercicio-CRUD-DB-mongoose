const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const { dbConnection } = require("./config/config");
const routes = require("./routes/tasks");

dbConnection();

// para recibir req.body
app.use(express.json());

// rutas
app.use("/", routes);

// servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto https://localhost:${PORT}`);
});

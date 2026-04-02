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

app.use((req, res) => {
  res.status(404).send({
    message: `La ruta ${req.originalUrl} con el método ${req.method} no existe en esta API.`,
  });
});

// servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});

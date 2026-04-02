// conexión a la base de datos

const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Base de datos conecta con éxito");
  } catch (error) {
    console.error("Error al conectar la base de datos", error);
    throw new Error("Error al iniciar base de datos");
  }
};

module.exports = { dbConnection };
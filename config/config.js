// conexión a la base de datos

const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Base de datos conecta con éxito");
  } catch (error) {
    console.error("Error al conectar la base de datos", error);
    process.exit(1)
  }
};

module.exports = { dbConnection };

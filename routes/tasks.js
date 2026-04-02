// lógica de rutas y controladores donde usaremos Router de Express

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE
router.post("/create", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ message: "Error al crear la tarea".error });
  }
});

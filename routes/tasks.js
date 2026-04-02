// lógica de rutas y controladores donde usaremos Router de Express

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// CREATE crea una tarea
router.post("/create", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ message: "Error al crear la tarea".error });
  }
});

// READ obtiene todas las tareas

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener las tareas" });
  }
});

// READ obtener tarea por id

router.get("/id/:_id", async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) return res.status(404).send({ message: "Tarea no encontrada" });
    res.send(task);
  } catch (error) {
    res.status(500).send({ message: "ID no válido" });
  }
});

// UPDATE marcar como completada

router.put("/markAsCompleted/:_id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true }, // retorna doc actualizado
    );
    res.send(task);
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar la tarea" });
  }
});


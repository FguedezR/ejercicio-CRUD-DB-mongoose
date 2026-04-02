const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/test", (req, res) => {
  res.send({ message: "¡El servidor funciona correctamente!" });
});

// POST - Crear una tarea
router.post("/create", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).send(task);
  } catch (error) {
    console.error("Error detallado:", error);
    res.status(400).send({
      message: "Error al crear la tarea",
      error: error.message,
    });
  }
});

// GET - Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    // .sort() para traer las más nuevas primero (gracias a timestamps: true)
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: "Error al obtener las tareas" });
  }
});

// GET - Obtener tarea por id
router.get("/id/:_id", async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) {
      return res.status(404).send({ message: "Tarea no encontrada" });
    }
    res.send(task);
  } catch (error) {
    // CastError ocurre cuando el ID no tiene el formato de MongoDB
    if (error.name === "CastError") {
      return res.status(400).send({ message: "Formato de ID no válido" });
    }
    res.status(500).send({ message: "Error interno del servidor" });
  }
});

// PUT - Marcar como completada
router.put("/markAsCompleted/:_id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { completed: true },
      { new: true, runValidators: true }, // runValidators asegura que se respeten las reglas del Schema
    );

    if (!task)
      return res
        .status(404)
        .send({ message: "No se encontró la tarea para actualizar" });

    res.send(task);
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar el estado" });
  }
});

// PUT - Actualizar solo el título
router.put("/id/:_id", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title)
      return res.status(400).send({ message: "El nuevo título es necesario" });

    const task = await Task.findByIdAndUpdate(
      req.params._id,
      { title },
      { new: true, runValidators: true },
    );

    if (!task) return res.status(404).send({ message: "Tarea no encontrada" });

    res.send(task);
  } catch (error) {
    res.status(500).send({ message: "Error al actualizar el título" });
  }
});

// DELETE - Eliminar tarea
router.delete("/id/:_id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);

    if (!task) {
      return res
        .status(404)
        .send({ message: "La tarea que intentas borrar no existe" });
    }

    res.send({ message: "Tarea eliminada correctamente", task });
  } catch (error) {
    res.status(500).send({ message: "Error al eliminar la tarea" });
  }
});

module.exports = router;

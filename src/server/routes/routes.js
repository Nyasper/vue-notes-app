import { Router } from "express";
import Task from "../db/models/task.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    mensaje: "Bienvenido a mi servidor",
    recibido: true,
  });
});

router.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.post("/tasks", async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  console.log("Creado:\n", task);
  res.json(task);
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
    console.log("ID Obtenido:\n", task);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //es para especificar que devuelva el objeto ya actualizado
    });

    res.json(task);
    console.log("Tarea Actualizada:\n", task);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    console.log("Tarea eliminada:\n", task);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;

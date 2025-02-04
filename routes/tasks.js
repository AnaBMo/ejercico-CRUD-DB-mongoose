//! Rutas del CRUD de tareas.

const express = require("express");
const router = express.Router();
const Task = require('../models/tasks');

// POST /create: Endpoint para crear una tarea.
router.post("/create", async(req, res) => {
    try {
        const newTask = await Task.create(req.body);
        res.status(201).send(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to create a Task" });
    }
});

// GET /: Endpoint para traer todas las tareas. 
router.get("/tasks", async(req, res) => {
    try {
        // Model.find() se usa para obtener las tareas
        const tasks = await Task.find()
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem getting all the Tasks" });
    }
});

// GET /id/:_id: Endpoint para buscar tarea por id.
router.get("/tasks/:_id", async(req, res) => { 
    try {
        // Model.findById(). Busca un documento individual por su campo _id. 
        // findById(id)es casi* equivalente a findOne({ _id: id }). 
            // Si desea realizar una consulta por el campo _id 
            // de un documento _id, utilice findById()en lugar de findOne().
        const taskId = await Task.findById(req.params._id)
        res.status(200).json(taskId)
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem getting the Task with that id" });
    }
});

// PUT /markAsCompleted/:_id: Endpoint para marcar una tarea como completada. 
router.put("/tasks/:_id", async(req, res) => { 
    try { 
        // Model.findByIdAndUpdate(). 
        // Parameters:
            // id ----> Valor de <Objet|Number|String> del id a consultar
            // [update] ----> <Object>
        const task = await Task.findByIdAndUpdate(
            req.params._id, 
            {completed: true}, // objeto que queremos actualizar
            {new: true} // documento actualizado
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        };

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem updatting the task status" });
    }
});
        
// PUT /id/:_id: Endpoint para actualizar una tarea y que solo se pueda cambiar el título de la tarea. 
// Es decir, que no me deje cambiar el campo “completed” desde este endpoint, sino solo, el título.
router.put("/tasks/:_id", async(req, res) => { 
    try {
        // Model.findByIdAndUpdate(). 
        // Parameters:
            // id ----> Valor de <Objet|Number|String> del id a consultar
            // [update] ----> <Object>
        const { Taskname } = req.body;

        if (!Taskname) {
            return res.status(404).json({ message: "TaskName not found" });
        };

        const task = await Task.findByIdAndUpdate(
            req.params._id, 
            { Taskname }, // objeto que queremos actualizar
            { new: true } // documento actualizado
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        };

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem updatting the task name" });
    }
});

// DELETE /id/:_id: Endpoint para eliminar una tarea.
router.delete("/tasks/:_id", async(req, res) => { 
    try {
        // Model.findByIdAndDelete() 
        // Parameters:
            // id ----> Valor de <Objet|Number|String> del id a consultar
            // [options] ----> <Object>
        const task = await Task.findByIdAndDelete(req.params._id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        };

        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem deleting the task" });
    }
});


module.exports = router;
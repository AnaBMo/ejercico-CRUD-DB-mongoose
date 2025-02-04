//! Modelo de la tarea con los campos title, completed y los timestamps.

const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    Taskname: String,
    periodicity: String,
    priority: String,
    completed: { type: Boolean, default: false }
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);


module.exports = Task;
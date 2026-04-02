const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "El título es obligatorio"],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})
// el timestamp nos va a generar createdAt y updatedAt automáticamente

const Task = mongoose.model("Task", TaskSchema)

module.exports = Task;
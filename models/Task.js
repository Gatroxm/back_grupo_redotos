const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['pendiente', 'en progreso', 'completada'], default: 'pendiente' },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ['alta', 'media', 'baja'], default: 'media' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Administrador o creador
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Usuario asignado
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

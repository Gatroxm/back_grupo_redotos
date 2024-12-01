const Task = require('../models/Task');
const User = require('../models/User');

// Crear una tarea y asignarla a otro usuario (solo administradores)
const createTask = async (req, res) => {
    try {
        const { title, description, status, dueDate, priority, assignedTo } = req.body;
        console.log(req.body);
        // Verificar si el usuario es administrador
        if (req.user.rol !== 'Administrador') {
            return res.status(403).json({ message: 'No tienes permisos para asignar tareas' });
        }

        // Validar si el usuario asignado existe
        if (assignedTo) {
            const user = await User.findById(assignedTo);
            if (!user || user.rol !== 'Usuario') {
                return res.status(404).json({ message: 'El usuario asignado no existe o no es un rol válido' });
            }
        }

        const newTask = new Task({
            title,
            description,
            status,
            dueDate,
            priority,
            createdBy: req.user.id, // Administrador que creó la tarea
            assignedTo, // Usuario al que se asigna la tarea (si se proporciona)
        });

        await newTask.save();
        res.status(201).json({ message: 'Tarea creada y asignada exitosamente', task: newTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
    }
};


// Obtener tareas (con distinción de rol)
const getTasks = async (req, res) => {
    try {
        const { status, priority } = req.query;
        const filter = {};

        if (req.user.rol === 'Administrador') {
            // Administradores pueden ver todas las tareas
            if (status) filter.status = status;
            if (priority) filter.priority = priority;
        } else {
            // Usuarios normales solo ven sus tareas creadas o asignadas
            filter.$or = [
                { createdBy: req.user.id },
                { assignedTo: req.user.id }
            ];
            if (status) filter.status = status;
            if (priority) filter.priority = priority;
        }

        const tasks = await Task.find(filter)
            .populate('createdBy', 'nombre correo nickname')
            .populate('assignedTo', 'nombre correo nickname');

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las tareas', error: error.message });
    }
};


// Actualizar una tarea
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        console.log(updates);
        const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedTask) return res.status(404).json({ message: 'Tarea no encontrada' });

        res.status(200).json({ message: 'Tarea actualizada exitosamente', task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message });
    }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) return res.status(404).json({ message: 'Tarea no encontrada' });

        res.status(200).json({ message: 'Tarea eliminada exitosamente', task: deletedTask });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

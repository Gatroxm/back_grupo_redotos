const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../components/taskController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getTasks); // Listar tareas
router.post('/', authenticate, createTask); // Crear tarea
router.put('/:id', authenticate, updateTask); // Actualizar tarea
router.delete('/:id', authenticate, deleteTask); // Eliminar tarea

module.exports = router;

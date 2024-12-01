import jest from 'jest';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';

jest.mock('mongoose');

describe('TaskRoutes', () => {
    let request;
    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/test');
        request = supertest(app);
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    describe('GET /tasks', () => {
        it('should return all tasks', async () => {
            const response = await request.get('/tasks');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(3);
        });
    });
    describe('POST /tasks', () => {
        it('should create a new task', async () => {
            const response = await request.post('/tasks').send({
                title: 'Test Task',
                description: 'This is a test task',
                status: 'pendiente',
                dueDate: '2023-05-01',
                priority: 'alta',
                assignedTo: '5f8d9f6c8c5a4f0e8a3a1a',
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Tarea creada y asignada exitosamente');
        });

        it('should return an error if the user is not an administrator', async () => {
            const response = await request.post('/tasks').send({
                title: 'Test Task',
                description: 'This is a test task',
                status: 'pendiente',
                dueDate: '2023-05-01',
                priority: 'alta',
                assignedTo: '5f8d9f6c8c5a4f0e8a3a1a',
            });
            expect(response.status).toBe(403);
            expect(response.body.message).toBe('No tienes permisos para asignar tareas');
        });

        it('should return an error if the assignedTo user does not exist', async () => {
            const response = await request.post('/tasks').send({
                title: 'Test Task',
                description: 'This is a test task',
                status: 'pendiente',
                dueDate: '2023-05-01',
                priority: 'alta',
                assignedTo: '5f8d9f6c8c5a4f0e8a3a1b',
            });
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('El usuario asignado no existe o no es un rol válido');
        });
    });
});
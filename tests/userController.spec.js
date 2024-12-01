import jest from 'jest';
import supertest from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';

jest.mock('mongoose');

describe('UserController', () => {
    let request;
    beforeAll(() => {
        mongoose.connect('mongodb://localhost:27017/test');
        request = supertest(app);
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    describe('POST /register', () => {
        it('should register a new user', async () => {
            const response = await request.post('/register').send({
                nombre: 'Test User',
                correo: 'test@example.com',
                nickname: 'test',
                password: '123456',
                rol: 'Usuario',
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Usuario registrado exitosamente.');
        });

        it('should return an error if the email is already registered', async () => {
            const response = await request.post('/register').send({
                nombre: 'Test User',
                correo: 'test@example.com',
                nickname: 'test',
                password: '123456',
                rol: 'Usuario',
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('El correo ya está registrado.');
        });
    });

    describe('POST /login', () => {
        it('should login a user', async () => {
            const response = await request.post('/login').send({
                correo: 'test@example.com',
                password: '123456',
            });
            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Inicio de sesión exitoso.');
        });

        it('should return an error if the email or password is incorrect', async () => {
            const response = await request.post('/login').send({
                correo: 'test@example.com',
                password: '12345',
            });
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Contraseña incorrecta.');
        });
    });
});
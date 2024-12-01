# Backend para Gestión de Tareas - Grupo Rédotos

Este proyecto es el backend de una plataforma diseñada para gestionar tareas. Proporciona la lógica y los endpoints necesarios para la autenticación, la gestión de usuarios y tareas. Los administradores pueden crear y asignar tareas, mientras que los usuarios pueden ver las tareas asignadas a ellos.

## Características

- **Autenticación y Autorización**:
  - Registro y login de usuarios con tokens JWT.
  - Roles: Administrador y Usuario.
- **Gestión de Tareas**:
  - CRUD para tareas.
  - Asociación de tareas a usuarios.
  - Los administradores pueden ver y gestionar todas las tareas.
  - Los usuarios solo pueden ver las tareas asignadas a ellos.
- **Validación**:
  - Contraseñas encriptadas con **bcrypt**.
  - Validación de tokens para proteger los endpoints.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript.
- **Express.js**: Framework web para manejar rutas y middlewares.
- **MongoDB**: Base de datos no relacional.
- **Mongoose**: ODM para MongoDB.
- **JWT**: Autenticación basada en tokens.
- **bcrypt**: Encriptación de contraseñas.

## Requisitos Previos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión recomendada: 18 o superior)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Instalación y Ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Gatroxm/back-tasck.git
   cd back-tasck
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

   ```bash
   MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.c7g7.mongodb.net/<base_de_datos>?retryWrites=true&w=majority
   JWT_SECRET=secreto
   ```

4. Ejecuta el servidor:

   ```bash
   npm run dev
   ```

5. Abre una nueva terminal y ejecuta los siguientes comandos:

   ```bash
   curl -X POST -H "Content-Type: application/json" -d '{"email":"usuario@gmail.com", "password":"123456"}' http://localhost:3000/api/v1/auth/register

   curl -X POST -H "Content-Type: application/json" -d '{"email":"usuario@gmail.com", "password":"123456"}' http://localhost:3000/api/v1/auth/login
   ```

## API

### POST /api/v1/auth/register

Registra un nuevo usuario en la base de datos.

**Request**

```json
{
  "email": "usuario@gmail.com",
  "password": "123456"
}
```

**Response**

```json
{
  "message": "Usuario creado correctamente.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2MjY2NjI0NDQ0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.
  "user": {
    "_id": "5f8d9c4a0a4d1c0d0e4e",
    "email": "usuario@gmail.com",
    "password": "$2b$10$5.8/9.4.9.6/5.5/1.3/3.2.1.0.0.0.0.0.0.0.1.2.3.4.5.6.7.8.9",
    "role": "user"
  }
}
```

### POST /api/v1/auth/login

Envía un token de autenticación para un usuario.

**Request**

```json
{
  "email": "usuario@gmail.com",
  "password": "123456"
}
```

**Response**

```json
{
  "message": "Usuario autenticado correctamente.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE2MjY2NjI0NDQ0IiwiaWF0IjoxNjI5NjQ5Mzk5fQ.
  "user": {
    "_id": "5f8d9c4a0a4d1c0d0e4e",
    "email": "usuario@gmail.com",
    "password": "$2b$10$5.8/9.4.9.6/5.5/1.3/3.2.1.0.0.0.0.0.0.0.1.2.3.4.5.6.7.8.9",
    "role": "user"
  }
}
```

### swaggerhub

```bash
https://app.swaggerhub.com/apis/TAVOXPAU/Prueba_Tecnica_Grupo_Reditos/1.0.0
```

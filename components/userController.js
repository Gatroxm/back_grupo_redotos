const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { nombre, correo, nickname, password, rol } = req.body;

    try {
        // Validar si el usuario ya existe
        const existingUser = await User.findOne({ correo });
        if (existingUser) return res.status(400).json({ message: 'El correo ya está registrado.' });

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear nuevo usuario
        const newUser = new User({
            nombre,
            correo,
            nickname,
            password: hashedPassword,
            rol,
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario.', error });
    }
};

const loginUser = async (req, res) => {
    const { correo, password } = req.body;

    try {
        // Validar si el usuario existe
        const user = await User.findOne({ correo });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

        // Validar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Contraseña incorrecta.' });

        // Verificar que la clave secreta existe
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET no está definido en las variables de entorno.');
        }

        // Generar token
        const token = jwt.sign({ id: user._id, rol: user.rol }, secretKey, {
            expiresIn: '1h',
        });
        user.password = ':masked:';
        res.status(200).json({ message: 'Inicio de sesión exitoso.', token, user });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión.', error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        // Consultar usuarios con rol "Usuario" y seleccionar campos específicos
        const users = await User.find({ rol: 'Usuario' }, 'nombre nickname _id');
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios.', error: error.message });
    }
};

module.exports = { registerUser, loginUser, getAllUsers };

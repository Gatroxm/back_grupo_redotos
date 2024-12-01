const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  nickname: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['Administrador', 'Usuario'], default: 'Usuario' },
});

module.exports = mongoose.model('User', userSchema);

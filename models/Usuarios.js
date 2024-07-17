const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema ({
  email: {
    type: String,
    unique: true,
    lowerCase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: 'Agrega tu Nombre'
  },
  password:{
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Usuarios', usuariosSchema);
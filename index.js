const express = require('express')
const routes = require('./routes')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config({path: 'variables.env'})
// CORS nos permite que un cliente se conecte a otro servidor para el intercambio de recursos
const cors = require('cors')

// Conectar mongo
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_URL);

// Crear servidor
const app = express();

// Habilitar bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Definir un dominio(s) para recibir las peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: (origin, callback) => {
    //Revisar si la peticion viene de un servidor que esta en whitelist
    const existe = whitelist.some(dominio => dominio === origin);

    if (existe) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
}


// Ruta carpeta publica
app.use(express.static('uploads'))

// Habilitar CORS
app.use(cors(corsOptions));

// Rutas desde la app
app.use('/', routes());

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000;

// Iniciar app
app.listen(port, host, () => {
  console.log(`El servidor esta iniciado en el puerto ${port}`);
})





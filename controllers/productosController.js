const Productos = require('../models/Productos')

const multer = require('multer');
const shortid = require('shortid');

const configuracionMulter = {
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname + '../../uploads/');
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shortid.generate()}.${extension}`);
    }
  }),
  fileFilter(req, file, cb) {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Formato no válido'))
    }
  }
}

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
  upload(req, res, function (error) {
    if (error) {
      res.json({ mensaje: error })
    }
    return next();
  })
}

// Agregar un nuevo Producto
exports.nuevoProducto = async (req, res, next) => {
  const producto = new Productos(req.body)

  try {
    if(req.file.filename){
      producto.imagen = req.file.filename
    }
    await producto.save()
    res.json({mensaje: 'Se agrego un nuevo producto'})
    
  } catch (error) {
    console.log(error);
    next();
  }
}

// Muestra todos los productos
exports.mostrarProductos = async (req, res, next) => {
  try {
    const productos = await Productos.find({})
    res.json(productos)

  } catch (error) {
    console.log(error);
    next();
  }
  
}

// Mostrar productos por ID
exports.mostrarProducto = async(req, res, next) => {
  const producto = await Productos.findById(req.params.idProducto)
  if(!producto){
    res.json({mensaje: 'El producto no existe'})
    return next()
  }
  // Mostrar el producto
  res.json(producto)
}

// Actualizar producto por ID
exports.actualizarProducto = async(req, res, next) => {

  try {
    let productoAnterior = await Productos.findById(req.params.idProducto)
    
    // Construir un nuevo producto
    let nuevoProducto = req.body

    // Verificar si hay una nueva Imagen
    if(req.file){
      nuevoProducto.imagen = req.file.filename
    }else{
      nuevoProducto.imagen = productoAnterior.imagen
    }

    let producto = await Productos.findOneAndUpdate({_id : req.params.idProducto}, nuevoProducto, {
      new: true
    })
    res.json(producto)

  } catch (error) {
    console.log(error);
    next();
    
  }
}

exports.eliminarProducto = async(req, res, next) => {
  try {
    await Productos.findOneAndDelete({_id: req.params.idProducto})
    res.json({mensaje: 'El producto fue eliminado'})

  } catch (error) {
    console.log(error);
    next();
  }
}

exports.buscarProducto = async(req, res, next) => {
  try{
    // Obtener el query
    const {query} = req.params
    const producto = await Productos.find({nombre: new RegExp(query, 'i')})
    res.json(producto)

  }catch (error){
    console.log(error);
    next()

  }
}

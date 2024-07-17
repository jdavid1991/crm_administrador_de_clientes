const Pedidos = require ('../models/Pedidos')

// Registrar un Pedido
exports.nuevoPedido = async(req, res, next) => {
  const pedido = new Pedidos(req.body)

  try {
    await pedido.save()
    res.json({mensaje: 'Se agrego un nuevo pedido'})

  } catch (error) {
    console.log(error);
    next()
  }
}

// Mostrar todos los Pedidos
exports.mostrarPedidos = async(req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate('cliente').populate(
      {
        path: 'pedido.producto',
        model: 'Productos'
      })
      // Mostrar pedidos
      res.json(pedidos)
    
  } catch (error) {
    console.log(error);
    next();
  }
}

// Mostrar Pedido por ID
exports.mostrarPedido = async(req, res, next) => {
  try {
    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate(
      {
        path: 'pedido.producto',
        model: 'Productos'
      })

    if(!pedido){
      res.json({mensaje: 'Ese pedido no existe'})
      return next()
    }
    // Mostrar pedido
    res.json(pedido)

  } catch (error) {
    console.log(error);
    next();
  }
}

// Actualizar pedido por ID
exports.actualizarPedido = async(req, res, next) => {
  try {
    let pedido = await Pedidos.findOneAndUpdate({_id: req.params.idPedido}, req.body, {
      new: true
    })
    .populate('cliente')
    .populate(
      {
        path: 'pedido.producto',
        model: 'Productos'
      });

      res.json({mensaje: 'Pedido Actualizado'})
  } catch (error) {
    console.log(error);
    next();
  }
}

// Eliminar pedido por ID
exports.eliminarPedido = async(req, res, next) => {
  try {
    const pedido = await Pedidos.findOneAndDelete({_id: req.params.idPedido})

    if(!pedido){
      res.json({mesanje : 'Pedido no existe'})
      return next()
    }
    res.json({mensaje: 'Pedido eliminado correctamente'})

  } catch (error) {
    console.log(error);
    next();
  }
}
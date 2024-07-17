const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')
const usuariosController = require('../controllers/usuariosController');

//middleware para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function () {

  // Agregar nuevos clientes via POST
  router.post('/clientes', auth, clienteController.nuevoCliente);

  // Listar todos los clientes 
  router.get('/clientes', auth, clienteController.mostrarClientes);

  // Listar cliente
  router.get('/clientes/:idCliente', clienteController.mostrarCliente)

  // Actualizar cliente
  router.put('/clientes/:idCliente', clienteController.actualizarCliente)

  // Eliminar cliente
  router.delete('/clientes/:idCliente', clienteController.eliminarCliente)

  /** PRODUCTOS */
  // Nuevos Productos
  router.post('/productos', productosController.subirArchivo, productosController.nuevoProducto)

  // Listar todos los productos
  router.get('/productos', productosController.mostrarProductos);

  // Mostrar producto
  router.get('/productos/:idProducto', productosController.mostrarProducto)

  // Actualizar producto
  router.put('/productos/:idProducto', productosController.subirArchivo, productosController.actualizarProducto)

  // Eliminar productos
  router.delete('/productos/:idProducto', productosController.eliminarProducto)

  // Busqueda de productos
  router.post('/productos/busqueda/:query', productosController.buscarProducto)

  /** PEDIDOS */

  // Agregar nuevos pedidos
  router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido)

  // Mostrar todos los Pedidos
  router.get('/pedidos', pedidosController.mostrarPedidos)

  // Mostrar pedido
  router.get('/pedidos/:idPedido', pedidosController.mostrarPedido)

  // Actualizar pedido
  router.put('/pedidos/:idPedido', pedidosController.actualizarPedido)

  // Eliminar pedido
  router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido)

  /** USUARIO */

  // Registrar usuario
  router.post('/crear-cuenta', usuariosController.registrarUsuario);

  // Iniciar Sesion
  router.post('/iniciar-sesion', usuariosController.autenticarUsuario);

  return router;
}

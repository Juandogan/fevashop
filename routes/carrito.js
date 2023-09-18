'use strict'

var express = require('express');
 var carritoController = require('../controllers/carritoController')
var auth = require('../middlewares/authorization')
var api = express.Router()

api.post('/agregar_cliente_carrito',auth.auth, carritoController.agregar_cliente_carrito) 
api.get('/obtener_cliente_carrito/:id',auth.auth, carritoController.obtener_cliente_carrito) 
api.delete('/eliminar_cliente_carrito/:id',auth.auth, carritoController.eliminar_cliente_carrito) 




module.exports = api
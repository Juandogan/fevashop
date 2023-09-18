'use strict'

var express = require('express');
var productoController = require('../controllers/productoController')
var auth = require('../middlewares/authorization')
var api = express.Router()

api.post('/registro_producto_admin',auth.auth , productoController.registro_producto_admin) 
api.get('/listar_productos_admin',auth.auth, productoController.listar_productos_admin) 
api.delete('/eliminar_producto_admin/:id', auth.auth, productoController.eliminar_producto_admin) 
api.put('/actualizar_producto_admin/:id', auth.auth, productoController.actualizar_producto_admin) 
api.get('/obtener_producto_admin/:id', auth.auth, productoController.obtener_producto_admin) 
api.put('/actualizar_producto_variedades_admin/:id', auth.auth, productoController.actualizar_producto_variedades_admin)
api.put('/actualizar_imagen_galeria_admin/:id', auth.auth, productoController.actualizar_imagen_galeria_admin)



//inventario
api.get('/listar_inventario_producto_admin/:id', auth.auth, productoController.listar_inventario_producto_admin) 
api.delete('/eliminar_inventario_producto_admin/:id', auth.auth, productoController.eliminar_inventario_producto_admin) 
api.post('/registro_inventario_producto_admin', auth.auth, productoController.registro_inventario_producto_admin) 


//public
api.get('/pedir_un_producto_public/:id',productoController.pedir_un_producto_public)
api.get('/pedir_productos_public',productoController.pedir_productos_public)






module.exports = api
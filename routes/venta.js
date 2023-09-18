'use strict'

var express = require('express');
var ventasController = require('../controllers/ventaController')
var auth = require('../middlewares/authorization')
var api = express.Router()


api.post('/registro_compra_cliente', auth.auth,ventasController.registro_compra_cliente)





module.exports = api
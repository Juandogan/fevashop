'use strict'

var express = require('express');
var controller = require('../controllers/mercadoPagoController')
var auth = require('../middlewares/authorization')
var api = express.Router()

api.post('/crear_pago',controller.crear_pago) 


api.post('/webhook', controller.recibir_webhook) 





module.exports = api
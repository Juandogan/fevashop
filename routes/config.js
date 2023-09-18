'use strict'

var express = require('express');
var configController = require('../controllers/configController')
var auth = require('../middlewares/authorization')
var api = express.Router()



api.put('/actualizar_config_admin/:id',auth.auth,configController.actualizar_config_admin)
api.get('/obtener_config_admin', auth.auth, configController.obtener_config_admin);
api.get('/obtener_config_publico', configController.obtener_config_publico);


module.exports = api
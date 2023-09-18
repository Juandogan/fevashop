var Cliente = require('../models/cliente');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');
var Carrito = require('../models/carrito');

const agregar_cliente_carrito = async function(req,res){
    if(req.user){
        let data = req.body
        let reg = await Carrito.create(data)
        res.status(200).send({data:reg})
    }
}


const obtener_cliente_carrito = async function(req,res){
if(req.user){        
let id = req.params['id'];
let carrito_cliente = await Carrito.find({cliente:id}).populate('producto')
res.status(200).send({data:carrito_cliente})}
}

const eliminar_cliente_carrito = async function(req,res){
    if(req.user){        
    let id = req.params['id'];
    let carrito_cliente = await Carrito.findByIdAndRemove({_id:id}).populate('producto')
    res.status(200).send({data:carrito_cliente})}else{
            res.status(500).send({message:'noAccess'})
    }
    }
    
module.exports = { 
    agregar_cliente_carrito,
    obtener_cliente_carrito,
    eliminar_cliente_carrito 
}
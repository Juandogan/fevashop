var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarritoSchema = Schema({
    producto:{type: Schema.ObjectId, ref: 'producto', required:true},
    cliente:{type: Schema.ObjectId, ref: 'cliente', required:true},
    cantidad:{type: Number, required:true},
    variedad:{type: String, required:true},
    


}, {timestamps: true})

module.exports = mongoose.model('Carrito', CarritoSchema)
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InventarioSchema = Schema({
    producto:{type: Schema.ObjectId, ref:'producto', required:false},
    cantidad:{type: Number, required:false},
    admin:{type: Schema.ObjectId, ref:'admin', required:false},
    proveedor:{type: String, required:false},
  

}, {timestamps: true})

module.exports = mongoose.model('inventario', InventarioSchema)
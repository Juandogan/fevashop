var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DventaSchema = Schema({
    producto:{type: Schema.ObjectId, ref: 'producto', required:true},    
    venta:{type: Schema.ObjectId, ref: 'venta', required:false},    
    subtotal:{type: Number, required:false},
    variedad:{type: String, required:false},
    cantidad:{type: Number, required:false},    
    cliente:{type: Schema.ObjectId, ref: 'cliente', required:false},
    

    
}, {timestamps: true})

module.exports = mongoose.model('dventa', DventaSchema)
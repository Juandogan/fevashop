var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    cliente:{type: String, required:false},
    destinatario:{type: String, required:false},
    dni:{type: String, required:false},
    zip:{type: String, required:false},
    direccion:{type: String, required:false},
    pais:{type: String, required:false},
    provincia:{type: String, required:false},
    municipio:{type: String, required:false},
    region:{type: String, required:false},
    localidad:{type: String, required:false},
    telefono:{type: String, required:false},
    principal:{type: String, required:false},  


}, {timestamps: true})

module.exports = mongoose.model('direccion', DireccionSchema)
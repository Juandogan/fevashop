var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    titulo:{type: String, required:true},
    slug:{type: String, required:false},
    galeria:{type: Object, required:false},
    portada:{type: String, required:false},
    precio:{type: Number, required:true},
    descripcion:{type: String,default:'perfil.jpg', required:false},
    contenido:{type: String, required:false},
    stock:{type: Number, required:false},
    nventas:{type: Number, required:false},
    npuntos:{type: Number, required:false},
    variedades:{type: Object, required:false},
    titulo_variedad:{type: String, required:false},
    categoria:{type: String, required:false},
    estado:{type: String,default: 'edicion'},
    
}, {timestamps: true})

module.exports = mongoose.model('producto', ProductoSchema)
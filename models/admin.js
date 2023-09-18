var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = Schema({
    nombres:{type: String, required:true},
    apellidos:{type: String, required:true},
    rol:{type: String, required:false},
    email:{type: String, required:true},
    password:{type: String, required:true},
    telefono:{type: String, required:false},
     dni:{type: String, required:false},
})

module.exports = mongoose.model('admin', AdminSchema)
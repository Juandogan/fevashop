var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigSchema = Schema({
    categorias:[{type: Object, required:true}],
    titulo:{type: String, required:false},
    logo:{type: String, required:true},
    serie:{type: String, required:true},
    correlativo:{type: String, required:false},
    

}, {timestamps: true})

module.exports = mongoose.model('config', ConfigSchema)
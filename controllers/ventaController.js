var Venta = require('../models/venta')
var Dventa = require('../models/dventa')
var Producto = require('../models/productos')
const productos = require('../models/productos')

const registro_compra_cliente = async function(req,res){

    if(req.user){
    var data = req.body
    var detalles = data.detalles
    var venta_last = await Venta.find().sort({createdAt: -1})
     var serie
     var correlativo
     var n_venta

     if (venta_last.length == 0 ) {
        serie = '001'
        correlativo = '000001'
        n_venta = serie + '-' + correlativo
     
     } else{
        var last_venta = venta_last[0].nventa  
        var arr_nventa = last_venta.split('-')
        var new_correlativo = zfill(parseInt(arr_nventa[1])+1,6)
        n_venta = arr_nventa[0] + '-' + new_correlativo
        
     }
     
     data.nventa =  n_venta
     data.estado = 'procesando'
console.log(data)

     let venta = await Venta.create(data);
     
    detalles.forEach(async element => {
        element.venta = venta.id
       var aux = await Dventa.create(element)

       let element_producto = await Producto.findById({_id:element.producto})
       let new_stock = element_producto.stock - element.cantidad
       await Producto.findByIdAndUpdate({_id: element.producto}, {stock: new_stock})
        
    }); 
       
    res.status(200).send({venta:venta})
    

    }else{res.status(500).send({message:'noAcces'});
}
}

// const actualizar_compra_cliente = async function(req,res){
//     if(req.user){
//         if(req.user.role = "adm"){
//           var id = req.params['id']
//           var data = req.body
          
//                 res.status(200).send({data:reg})


//         }else{res.status(500).send({message:'noAcces'})}
//     }else{res.status(500).send({message:'noAcces'})}
// }
function zfill(number, width) {
    var numberOutput = Math.abs(number); 
    var length = number.toString().length;
    var zero = "0";
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }

    }
}

module.exports = {registro_compra_cliente}
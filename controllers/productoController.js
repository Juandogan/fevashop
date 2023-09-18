var Producto = require('../models/productos');
var bcrypt = require('bcrypt-nodejs');
var Inventario = require('../models/inventario');


var jwt = require('../helpers/jwt')

const registro_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
            var data = req.body;
            data.slug = data.titulo.toLowerCase().replace(/ /g,'-').replace(/[*\w-]+/g,'')
            let reg = await Producto.create(data);
            let inventario = await Inventario.create({
                admin: req.user.sub,
                cantidad: data.stock,
                proveedor: "Primer registro",
                producto: reg._id,
                categoria: data.categoria

            })
            res.status(200).send({data:reg,inventario})
        }
    }else{res.status(500).send({data:reg})}
}


const listar_productos_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
            let reg = await Producto.find();
            res.status(200).send({data:reg})
        }
    }else{res.status(500).send({data:reg})}
}

const eliminar_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
         console.log('borrar', id)
        let reg = await Producto.findByIdAndRemove({_id:id});
        res.status(200).send({message:reg})
               
 
        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}

const actualizar_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
          var data = req.body
          
            var reg = await Producto.findByIdAndUpdate({_id:id},{
                titulo:data.titulo,
                precio:data.precio,
                stock:data.stock,
                contenido:data.contenido,
                slug:data.slug,
                descripcion:data.descripcion,
                categoria:data.categoria,
                
            }
                
                );
            res.status(200).send({data:reg})


        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}

const obtener_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
          
            var reg = await Producto.findById({_id:id});
            res.status(200).send({data:reg})


        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}



const listar_inventario_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
          
     var reg = await Inventario.find({producto:id}).populate('admin').sort({createdAt:-1})
     res.status(200).send({data:reg})

        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}


const eliminar_inventario_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
          console.log(id)
     var reg = await Inventario.findByIdAndRemove({_id:id})
     
     var prod = await Producto.findById({_id:reg.producto})
     console.log('bandera', prod)
      var nuevo_stock = parseInt(prod.stock) - parseInt(reg.cantidad)
    let producto = await Producto.findByIdAndUpdate({_id:reg.producto},{stock:nuevo_stock})
      res.status(200).send({data:producto})


        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}



const registro_inventario_producto_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
         
            let data = req.body
            
            let reg = await Inventario.create(data);
            
            //obtener registro de producto
            var prod = await Producto.findById({_id:reg.producto})

            var nuevo_stock = parseInt(prod.stock) + parseInt(reg.cantidad)
            let producto = await Producto.findByIdAndUpdate({_id:reg.producto},{stock:nuevo_stock})

         
            res.status(200).send({data:reg})



        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}


const actualizar_producto_variedades_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
          var data = req.body
          console.log(data)
            var reg = await Producto.findByIdAndUpdate({_id:id},{
                
                titulo_variedad: data.titulo_variedad,
                variedades: data.variedades
                
            }
                
                );
            res.status(200).send({data:reg})


        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}


const actualizar_imagen_galeria_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
          var data = req.body
          console.log(data)
            var reg = await Producto.findByIdAndUpdate({_id:id},{
            id: data._id,
            galeria: data.galeria});
            
            res.status(200).send({data:reg})


        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}

const pedir_un_producto_public = async function(req,res){
    console.log(req.params['id'])
            var data = req.params['id']
            let reg = await Producto.findById({_id:data});
            res.status(200).send({data:reg})
        }

const pedir_productos_public = async function(req,res){
         
                    let reg = await Producto.find();
                    res.status(200).send({data:reg})
                }
        


module.exports = {
     registro_producto_admin, 
     listar_productos_admin, 
     eliminar_producto_admin,
     actualizar_producto_admin,
     obtener_producto_admin,
     listar_inventario_producto_admin,
     eliminar_inventario_producto_admin,
     registro_inventario_producto_admin,
     actualizar_producto_variedades_admin,
     actualizar_imagen_galeria_admin,
     pedir_un_producto_public,
     pedir_productos_public
     

    
    }
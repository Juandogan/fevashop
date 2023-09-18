var Cliente = require('../models/cliente');
var Direccion = require('../models/direccion');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt')

const registro_cliente = async function (req, res) {

    var data = req.body;
    var clientes_arr = [];

    //SE busca EL CORREO EN LA BASE 
    console.log(data.email)
    clientes_arr = await Cliente.find({ email: data.email })

    //validacion 
    if (clientes_arr.length == 0) {
        //validacion y encriptado de pass
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
                if (hash) {
                    data.password = hash
                    var reg = await Cliente.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({ message: 'Error server', data: undefined })   
                }
            })
        } else {
            res.status(200).send({ message: 'no hay password', data: undefined })
        }

    } else {
        res.status(200).send({ message: 'el correo ya existe en la base', data: undefined })
    }

}


const login_cliente = async function (req, res) {
    var data = req.body
    
    var clientes_arr = [];

    clientes_arr = await Cliente.find({ email: data.email })

    if(clientes_arr.length == 0 ){
        res.status(200).send({ message: 'no existe correo' })    
    }else{
        let user = clientes_arr[0];
        console.log(user.password)
        console.log(data.password)
      

        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){
                res.status(200).send({ data:user, token: jwt.crearToken(user) })  
            }else{
                res.status(200).send({ message: 'la contraseña no coicide', data:undefined}) 
            }
        })

         
    }


}

const listar_clientes_filtro_admin = async function(req,res){
    console.log(req.user,'llega')
    if(req.user){        
        if(req.user.rol == 'adm'){
            let reg = await Cliente.find();
            res.status(200).send({data:reg})
    }else{res.status(500).send({message:'noAcces'})}
}else{res.status(500).send({message:'noAcces'})}

}


const registro_cliente_admin = async function(req,res){
if(req.user){
    if(req.user.role = "adm"){
        var data = req.body;
        data.password = req.password
        let reg = await Cliente.create(data);
        res.status(200).send({data:reg})
    }
}
}


const obtener_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
          
            var reg = await Cliente.findById({_id:id});
            res.status(200).send({data:reg})


        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}


const actualizar_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
          var data = req.body
          
            var reg = await Cliente.findByIdAndUpdate({_id:id},{
                nombres:data.nombres,
                apellidos:data.apellidos,
                email:data.email,
                telefono:data.telefono,
                f_nacimiento:data.f_nacimiento,
                dni:data.dni,
                genero:data.genero
            }
                
                );
            res.status(200).send({data:reg})


        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}

const eliminar_cliente_admin = async function(req,res){
    if(req.user){
        if(req.user.role = "adm"){
          var id = req.params['id']
         
        let reg = await Cliente.findByIdAndRemove({_id:id});
        res.status(200).send({message:reg})
               
 
        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}

const obtener_cliente_public = async function(req,res){
    if(req.user){
        var id = req.params['id']
          
            var reg = await Cliente.findById({_id:id});
            res.status(200).send({data:reg})

    }else{res.status(500).send({message:'noAcces'})}
}

const actualizar_perfil_cliente_public = async function(req,res){
    if(req.user){
        var id = req.params['id']
          var data = req.body

          
            
                if(data.password){
                    bcrypt.hash(data.password, null, null, async function(err,hash){
                        var reg = await Cliente.findByIdAndUpdate({_id:id},{
                            nombres: data.nombres,
                            apellidos: data.apellidos,
                            f_nacimiento: data.f_nacimiento,
                            dni: data.dni,
                            genero: data.genero,
                            pais: data.pais,
                            password: hash,
                            telefono:data.telefono
            
                        });
                        res.status(200).send({data:reg}) 

                    });
                                }                     
                     else{
                            var reg = await Cliente.findByIdAndUpdate({_id:id},{
                                nombres: data.nombres,
                                apellidos: data.apellidos,
                                f_nacimiento: data.f_nacimiento,
                                dni: data.dni,
                                genero: data.genero,
                                pais: data.pais,
                                telefono:data.telefono
                            });  
                            res.status(200).send({data:reg}) 
                         }
     
        

    }else{res.status(500).send({message:'noAcces'})}
}


////////////////////////////////DIRECCIONES

const registro_direccion_cliente = async function (req, res) {

    if(req.user){
        var data = req.body
        
        if(data.principal){
            let direcciones = await Direccion.find({cliente:data.cliente});
            direcciones.forEach(async element =>{
                await Direccion.findByIdAndUpdate({_id:element._id},{principal:false})
            })

        }
        console.log(data)
            var reg = await Direccion.create(data);
            console.log(reg)
            res.status(200).send({data:reg})
            

    }else{res.status(500).send({message:'noAcces'})}
    
   }

   
const obtener_direccion_cliente = async function (req, res) {

    if(req.user){
        var id = req.params['id']
      
        
            let direcciones = await Direccion.find({cliente:id}).populate('cliente').sort({createdAt:-1});
            res.status(200).send({data:direcciones})

    }else{res.status(500).send({message:'noAcces'})}
    
   }

module.exports = { 
    registro_cliente, 
    login_cliente,
    listar_clientes_filtro_admin, 
    registro_cliente_admin,
    obtener_cliente_admin ,
    actualizar_cliente_admin,
    eliminar_cliente_admin,
    obtener_cliente_public,
    actualizar_perfil_cliente_public,
    registro_direccion_cliente,
    obtener_direccion_cliente    
}
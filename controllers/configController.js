var Config = require('../models/config')

const actualizar_config_admin = async function(req,res){


    if(req.user){
        if(req.user.role = "adm"){


            let data = req.body;
            let reg = await Config.findByIdAndUpdate({_id:'64ee72d83bec56e4613a1413'},{
                categorias: data.categorias,
                titulo: data.titulo,
                logo: data.logo,
                serie: data.serie,
                correlativo: data.correlativo

            });
            res.status(200).send({data:reg})
            
            
        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}


const obtener_config_admin = async function(req,res){

    if(req.user){
        if(req.user.role = "adm"){
            console.log(res)
            let reg = await Config.findById({_id:'64ee72d83bec56e4613a1413'})
            res.status(200).send({data:reg})
            console.log(res)
        }else{res.status(500).send({message:'noAcces'})}
    }else{res.status(500).send({message:'noAcces'})}
}

const obtener_config_publico = async function(req,res){

    console.log(res)
    let reg = await Config.findById({_id:'64ee72d83bec56e4613a1413'})
    res.status(200).send({data:reg})
    console.log(res)
}


module.exports = {actualizar_config_admin, obtener_config_admin, obtener_config_publico}
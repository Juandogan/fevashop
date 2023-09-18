var Admin = require('../models/admin');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../helpers/jwt')

const registro_admin = async function (req, res) {

    var data = req.body;
    var admin_arr = [];

    //SE busca EL CORREO EN LA BASE 
    admin_arr = await Admin.find({ email: data.email })
    
    //validacion 
    if (admin_arr.length == 0) {

        //validacion y encriptado de pass
        if (data.password) {
            bcrypt.hash(data.password, null, null, async function (err, hash) {
          console.log(hash)
                if (hash) {
                    data.password = hash
                    var reg = await Admin.create(data);
                    res.status(200).send(reg);
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


const login_admin = async function (req, res) {
    var data = req.body
    var admin_arr = [];


    admin_arr = await Admin.find({ email: data.email })

    if(admin_arr.length == 0 ){
        res.status(200).send({ message: 'no existe correo' })    
    }else{
        let user = admin_arr[0];
        bcrypt.compare(data.password, user.password, async function(error,check){
            if(check){
                res.status(200).send({ data:user, token: jwt.crearToken(user) })  
            }else{
                res.status(200).send({ message: 'la contraseña no coicide', data:undefined}) 
            }
        })

         
    }


}
module.exports = { registro_admin, login_admin }
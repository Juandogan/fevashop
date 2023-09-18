



var bodyparser = require('body-parser');
var jwt = require('jwt-simple')



exports.auth  = function(req, res, next){
    
    if(!req.headers.authorization) {
    return res.status(401).send('Sin autorizacion')
}

var secret = '123'

const token = req.headers.authorization.replace(/['"']+/g,'')
var segment = token.split('.')

if(segment.length != 3 ){
    return res.status(403).send({message:'invalidToken'})
}else{

    try {
        var payload = jwt.decode(token, secret)
       

    } catch (error) {
        return res.status(403).send({message:'invalidToken'})
        
    }

}
req.user = payload


            next();

}

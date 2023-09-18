'use strict'


const { mongoose } = require('./baseMongo'); //mongodb
const cors = require('cors'); // Importa el módulo cors
var express = require('express');
var app  = express();
var bodyparser = require('body-parser');
var jwt = require('jwt-simple')
const multipart = require('connect-multiparty');
const path = require ('path')

const morgan = require('morgan')

var cliente_route = require('./routes/cliente')
var admin_route = require('./routes/admin')
var productos_route = require('./routes/producto')
var config_route = require('./routes/config')
var carrito_route = require('./routes/carrito')
var venta_route = require('./routes/venta')
var mercado_pago_route = require('./routes/mercadopago')

var port = process.env.PORT || 4201;
var server = require('http').createServer(app);
var io = require('socket.io')(server,{
    cors:{origin :'*'}
})

io.on('connection', function(socket){
    socket.on('delete-carrito', function(data){
        io.emit('new-carrito',data);
        console.log(data)
    })
    socket.on('add-carrito-add', function(data){
        console.log(data,'via')
        io.emit('new-carrito-add',data);
        
    })
})


const multiPartMiddleware = multipart({
    uploadDir: './subidas'   //carpeta fisica se debe crear para que funcione
  });



app.use(cors());
server.listen(port, function(){
    console.log('Servidor en '+ port)
})

// Cors
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});
// Cors
app.use('/',express.static('client/', {redirect:false}));
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json({extended:true, limit:'500mb'}))

app.use(morgan('dev'))
app.use('/api', cliente_route)
app.use('/api', admin_route)
app.use('/api', productos_route)
app.use('/api', config_route)
app.use('/api', carrito_route)
app.use('/api', venta_route)
app.use('/', mercado_pago_route)
app.get('*', function(req, res, next){res.sendFile(path.resolve('client/index.html'));}) 







app.use('/upload', express.static(path.resolve('./subidas')))
  app.post('/upload', multiPartMiddleware, (req, res) => {
    // console.log('pasa')
    var link = req.files['upload'].path  //ojo con archivos!
    // console.log(link)

    var url = 'http://localhost:4001/upload/' + link.slice(8)
    // console.log({ 'url': url })
    res.json({ 'url': url }); 

  });


function verifyToken(req, res, next){
    
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


module.exports = app
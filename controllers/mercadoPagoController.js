var mercadopago = require('mercadopago');

const crear_pago = async function (req, res) {
    const dataFront = req.body

    console.log(dataFront)
    mercadopago.configure({
        access_token: 'TEST-5320397938177144-090810-fc5039c3211eec496424e1a4b1c021d0-1474340392'
    });
    
  
    
   const result = await mercadopago.preferences.create({items: dataFront
    ,back_urls:{
    success:"http://localhost:4200/landing",
    failure:"http://localhost:4200/landing",
    pending:"http://localhost:4200/landing"
},
notification_url:"https://48a9-181-209-91-123.ngrok-free.app/webhook",
})
const data = result


res.send({data:result})

}


const recibir_webhook = async (req, res)=>{
    const payment = req.query
 try {
    if (payment.type ==="payment")
    { 
        const data = await mercadopago.payment.findById(payment['data.id'])
        console.log(data);
        res.send(data)
        
    }
    
 } catch (error) {
    res.sendStatus(500)
    console.log(error)
 }

    
    

}


module.exports = { crear_pago, recibir_webhook }
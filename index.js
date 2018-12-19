// =============== constants =========

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// =============== variables =========

var Openpay = require('openpay');
var openpay = new Openpay('m2olpkdiqmcpq8nayoky', 'sk_baf0c9c0531f484a8d1a7836c3394bb5');
var port=5000;

// =============== settings =========

app.set('views',__dirname+'/views');
app.set('view engine','ejs');

// =============== middlewares =========

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/statics'));

// =============== routes =========
app.get('/',(req,resp)=>{
  resp.render('index.ejs')
});

app.get('/registro',(req,resp)=>{
  resp.render('clientes/registroClientes.ejs');
});

app.get('/listaclientes',(req,resp)=>{
  openpay.customers.list({}, function (error, body, response){
      console.log(body);
      clientes=(body);
      resp.render('clientes/listaClientes.ejs',{clientesList:clientes});
  });
});

app.post('/saveCliente',(req,resp)=>{
  const postBody = req.body;
  var newCustomer = {
    "name":postBody.name,
    "email":postBody.email,
    "last_name":postBody.last_name,
    "address":{
      "city":postBody.city,
      "state":postBody.state,
      "line1":postBody.line1,
      "line2":postBody.line2,
      "postal_code":postBody.postal_code,
      "country_code":postBody.country_code
    },
    "phone_number":postBody.phone_number
  };

  openpay.customers.create(newCustomer, function (error, body, response){
    if (error) {
      resp.render('error.ejs',{errorEncontrado:error.description});
    }else {
      console.log(response.statusCode, body, error);
      resp.render('clientes/registroExitoso.ejs');
    }

  });
});

app.get('*',(req,resp)=>{
  resp.end('::::::: Archivo no encontrado :::::::::');
});

// =============== server =========
app.listen(port ,function(){
  console.log('servidor funcionando en la dirección: http://localhost:'+port);
});

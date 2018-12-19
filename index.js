
const express = require('express');
const morgan = require('morgan');
const openPayApp = express();
const routes = require('./routes/router')
var port=5000;

// ::::::::: Settings ::::::::::

openPayApp.set('views',__dirname+'/views');
openPayApp.use(express.static(__dirname + '/statics'));
openPayApp.set('view engine','ejs');

// ::::::::: Middleware ::::::::::

openPayApp.use(morgan('short'));
openPayApp.use(routes);

// ::::::::: Server ::::::::::

openPayApp.listen(port ,function(){
    console.log('servidor funcionando en la dirección: http://localhost:'+port);
});




'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;
//Conexión Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/UsuariosOCasa', { useNewUrlParser: true ,useUnifiedTopology: true })
        .then(() => {
            console.log("La conexión a la base de datos UsuariosOCasa se ha realizado correctamente")
            
            //Crear  Servidor
            app.listen(port, () => {
                console.log("Servidor corriendo en el http://localhost:3800");
            });        
        })
        .catch(err => console.log(err));
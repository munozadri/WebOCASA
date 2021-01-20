'use strict'
var bcrypt = require('bcrypt-nodejs');

var User = require('../models/user');
var jwt = require('../services/jwt');

function home(req, res){
    res.status(200).send({
        message: "HOLA MUNDO"
    });

}

function pruebas (req, res) {
    res.status(200).send({
        message: "Accion de pueba en el servidor de NodeJS"
    });
}

function saveUser(req, res){
    var params = req.body;
    var user = new User();

    if(params.name && params.email && params.password){
        user.name = params.name;
        user.email = params.email;

        //controlar usuarios duplicados
        User.find({email: user.email.toLowerCase()}).exec((err, users) => {
            if(err) return res.status(500).send({message: "Error en la petición de usuarios"});

            if(users && users.length >= 1){
                return res.status(200).send({message:"El usuario que intentas registrar ya existe"});
            }else{
                //Cifrado de Contraseña y me guarda los datos
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    user.password = hash;

                    user.save((err, userStored) => {
                        if(err) return res.status(500).send({message:"Error al guardar el Usuario"});

                        if(userStored){
                            res.status(200).send({user: userStored});
                        }else{
                            res.status(404).send({message:"No se ha registrado el Usuario"});
                        }

                    });
                });
            }
        });

    }else{
        res.status(200).send({
            message: "Completa todos los camposo obligatorios"
        });
    }
}

function loginUSer(req, res){
    var params = req.body;

    var email = params.email;
    var  password = params.password;

    User.findOne({email: email}, (err, user) =>{
        if(err) return res.status(500).send({message: "Error en la petición"});
           
        if(user){
            bcrypt.compare(password, user.password, (err, check) => {
                if(check){
                    //devolver datos de usuarios
                    if(params.getToken){
                        //generar y devolver Token
                        return res.status(200).send({
                            token:jwt.createToken(user)
                        });
                    }else{
                        //devolver datos usuario                        
                        user.password = undefined;
                        return res.status(200).send({user})
                    }

                }else{
                    return res.status(404).send({message:"El usuario no se ha podido iddentificar"});
                }
            });
        }else{
            return res.status(404).send({message:"El usuario no se ha podido identificar!!"});
        }
    });
}



module.exports = {
    home,
    pruebas,
    saveUser,
    loginUSer
}
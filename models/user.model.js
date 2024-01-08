/*
Este código define un esquema y modelo de datos para objetos "User" en una aplicación, 
utilizando mongoose en JavaScript. El esquema contiene propiedades como nombre de usuario, c
orreo electrónico, contraseña, nombre, apellido y fecha de creación. El modelo 'User' está 
asociado a la colección 'users' en MongoDB y se exporta para su uso en otras partes del código.
*/
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : { type: String, required:true },
    email : { type: String,required:true,unique:true},
    password : {type: String,required:true},
    name : { type: String, required:true },
    lastName : { type: String, required:true },
    createdAt : { type: Date, default: Date.now},
});

const User = mongoose.model('User',userSchema,'users');
module.exports = User;
/*
   Este código define un esquema para objetos "Carro" utilizando mongoose en JavaScript.
   El esquema incluye propiedades como modelo, color, precio, descripción e imagen.
   Se crea un modelo 'Carro' basado en este esquema, vinculado a la colección 'carros' en MongoDB,
   y se exporta para su uso en otras partes del código. En resumen, el código facilita la manipulación 
   de datos de carros en una base de datos MongoDB.
*/
const mongoose = require('mongoose');

const carroSchema = new mongoose.Schema({
    modelo: { type: String},
    color: { type: String},
    precio: { type: Number},
    descripcion: { type: String},
    img: { type: String}      
});

const Carro = mongoose.model('Carro',carroSchema,'carros');
module.exports = Carro;
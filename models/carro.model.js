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
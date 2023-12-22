const mongoose = require('mongoose');

const subastaSchema = new mongoose.Schema({
    idSubasta: { type: String },
    idCarro: { type: String },
    ofertas: [
        {
            idUser: { type: String },
            fecha: { type: Date },
            precioOfertado: { type: Number }
        }
    ],
    precioFinal: { type: Number },
    fechaIni: { type: Date },
    fechaFin: { type: Date },
    estado: { type: String, enum: ['abierto', 'cerrado'] }
});

const Subasta = mongoose.model('Subasta', subastaSchema, 'subastas');
module.exports = Subasta;
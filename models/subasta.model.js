/*   
Este código en JavaScript utiliza mongoose para definir un esquema y modelo de datos para objetos
"Subasta" en una aplicación de subastas de carros. El esquema incluye información como el ID
del carro, ofertas realizadas con detalles de usuario, precio final, fechas de inicio y fin, 
y estado (abierto o cerrado). La función getSubastas busca todas las subastas en la base de datos 
y devuelve una respuesta JSON con la información correspondiente.
*/
const mongoose = require('mongoose');

const subastaSchema = new mongoose.Schema({
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

exports.getSubastas = async (req, res) => {
    try {
        const subastas = await Subasta.find();
        return res.status(200).json({
            success: true,
            message: "Consulta de subastas",
            data: subastas
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al consultar subastas",
            data: error
        });
    }
}


const Subasta = mongoose.model('Subasta', subastaSchema, 'subastas');
module.exports = Subasta;
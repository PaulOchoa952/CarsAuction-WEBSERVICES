const Subasta = require('../models/subasta.model');

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

exports.createSubasta = async (req, res) => {
    try {
        // Desestructura solo los campos que deseas establecer por defecto
        const {
            idCarro,
            // Establece ofertas como un array vacío por defecto
            ofertas = [],
            // Establece precioFinal a 0 por defecto
            precioFinal = 0,
            // Establece fechaIni a la fecha actual por defecto
            fechaIni = new Date(),
            // Establece fechaFin a null por defecto (puedes ajustar según tus necesidades)
            fechaFin,
            // Establece estado a 'abierto' por defecto
            estado = 'abierto'
        } = req.body;

        // Crea el objeto newSubasta con los valores predeterminados
        const newSubasta = new Subasta({
            idCarro,
            ofertas,
            precioFinal,
            fechaIni,
            fechaFin,
            estado
        });

        await newSubasta.save();

        return res.status(201).json({
            success: true,
            message: "Subasta creada con éxito",
            data: newSubasta
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al crear subasta",
            data: error
        });
    }
}

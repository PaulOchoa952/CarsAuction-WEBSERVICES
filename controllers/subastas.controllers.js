const Subasta = require('../models/subasta.model');
const Carro = require('../models/carro.model');

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
        precioFinal = 0;
        const {
            idCarro,
            // Establece ofertas como un array vacío por defecto
            ofertas = [],
            // Establece fechaIni a la fecha actual por defecto
            fechaIni = new Date(),
            // Establece fechaFin a null por defecto (puedes ajustar según tus necesidades)
            fechaFin,
            // Establece estado a 'abierto' por defecto
            estado = 'abierto'
        } = req.body;
         // Consulta el precio del carro en la base de datos para establecerlo como precioFinal
         const carro = await Carro.findById(idCarro);
         if (!carro) {
             return res.status(404).json({
                 success: false,
                 message: "Carro no encontrado",
             });
         } else {
             precioFinal = carro.precio;
         }
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

exports.verifiedSubasta = async (req, res) => {
    try {
        // Obtiene el valor si encuentra una subasta con dicho carro
        const subasta = await Subasta.findOne({ idCarro: req.params.id });
        if (!subasta) {
            return res.status(200).json({
                success: false,
                message: "Carro sin subasta",
            });
        } else {
            return res.status(200).json({
                success: true,
                message: "Carro con una subasta",
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al consultar subasta",
            data: error
        });
    }
}

exports.updateSubasta = async (req, res) => {
    try {
        const subasta = await Subasta.findById(req.params.id);
        if (!subasta) {
            return res.status(404).json({
                success: false,
                message: "Subasta no encontrada",
            });
        } else {
            const {
                idCarro = subasta.idCarro,
                ofertas = subasta.ofertas,
                precioFinal = subasta.precioFinal,
                fechaIni = subasta.fechaIni,
                fechaFin = subasta.fechaFin,
                estado = subasta.estado
            } = req.body;

            const updateSubasta = {
                idCarro,
                ofertas,
                precioFinal,
                fechaIni,
                fechaFin,
                estado
            };

            await Subasta.findByIdAndUpdate(req.params.id, updateSubasta, { new: true });

            return res.status(200).json({
                success: true,
                message: "Subasta actualizada con éxito",
                data: updateSubasta
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar subasta",
            data: error
        });
    }
}

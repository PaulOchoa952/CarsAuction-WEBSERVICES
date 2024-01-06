const Carro = require('../models/carro.model');
const Subasta = require('../models/subasta.model');
exports.getCarros = async (req,res) => {
    try{
        const carros = await Carro.find();
        return res.status(200).json(
            {
                message: "Consulta de carros",
                data: carros

            }
        );
    }catch(error){
        return res.status(500).json(
            {
                message: "Error al consultar carros",
                data:error
            }
        )
    }
}

exports.getCarrosId = async (req,res) => {
    const carroId = req.params.carroId;
    try{
        const carro = await Carro.findById(carroId);
        return res.status(200).json(
            {
                message: "Carro obtenido con éxito",
                data: carro
            }
        );
    }catch(error){
        return res.status(500).json(
            {
                message: "Error al consultar carro",
                data:error
            }
        )
    }
}

exports.newCarro = async (req,res) => {
    try{
        const {modelo,color,precio,descripcion,img} = req.body
        const newCarro = new Carro({modelo,color,precio,descripcion,img});
        await newCarro.save();
        return res.status(200).json(
            {
                message: "Carro registrado con éxito",
                data: newCarro
            }
        );
    }catch(error){
        return res.status(500).json(
            {
                message: "Error al registrar carro",
                data:error
            }
        )
    }
}

exports.updateCarro = async(req,res) => {
    const carroId = req.params.carroId;
    const newData = req.body;
    try{
        const updateCarro = await Carro.findByIdAndUpdate(carroId,newData,{new:true});
        return res.status(200).json(
            {
                message: "Actualizar carro por Id: "+carroId+" con éxito",
                data: updateCarro
            }
        );
    }catch(error){
        return res.status(500).json(
            {
                message: "Error al actualizar carro",
                data:error
            }
        )
    }
}

exports.deleteCarro = async (req, res) => {
    const carroId = req.params.carroId;

    try {
        // Busca el carro por ID
        const carro = await Carro.findById(carroId);
        
        if (!carro) {
            return res.status(404).json({
                message: "Carro no encontrado"
            });
        }

       
        // Busca la subasta asociada al carro
        const subasta = await Subasta.findOne({ idCarro: carroId });
       
        // Si existe una subasta, elimínala
        if (subasta) {
            await Subasta.findByIdAndDelete(subasta._id);
        }

        // Elimina el carro
        await Carro.findByIdAndDelete(carroId);

        return res.status(200).json({
            message: "Carro y subasta eliminados con éxito"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar carro y subasta",
            data: error
        });
    }
};
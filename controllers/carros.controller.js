const Carro = require('../models/carro.model');
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
        const {idCarro,modelo,color,precio,descripcion,img} = req.body
        const newCarro = new Carro({idCarro,modelo,color,precio,descripcion,img});
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

exports.deleteCarro = async(req,res) => {
    const carroId = req.params.carroId;
    try{
        await Carro.findByIdAndDelete(carroId);
        return res.status(200).json(
            {
                message: "Carro eliminado con éxito " 
            }
        );
    }catch(error){
        return res.status(500).json(
            {
                message: "Error al eliminar carro",
                data:error
            }
        )
    }
}
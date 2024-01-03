const Subasta = require('../models/subasta.model');
const Carro = require('../models/carro.model');
const Usuario = require('../models/user.model');
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

exports.getOfertasBySubastaId = async (req, res) => {
    try {
        const  idSubasta = req.params.id;

        // Realiza la consulta en la base de datos utilizando el idSubasta
        const subasta = await Subasta.findById(idSubasta);

        if (!subasta) {
            return res.status(404).json({
                success: false,
                message: "Subasta no encontrada",
            });
        }
        console.log(subasta);
        // Mapea las ofertas para obtener información específica del usuario
        const ofertasConInformacion = await Promise.all(subasta.ofertas.map(async (oferta) => {
            // Puedes realizar consultas adicionales aquí según tus necesidades
            // En este ejemplo, se asume que el idUser corresponde a un usuario en la colección de usuarios
            const usuario = await Usuario.findById(oferta.idUser);

            return {
                idUser: oferta.idUser,
                userName: usuario ? usuario.userName : "Nombre no encontrado",
                email: usuario ? usuario.email : "Correo no encontrado",
                fecha: oferta.fecha,
                precioOfertado: oferta.precioOfertado,
            };
        }));
        console.log(ofertasConInformacion);
        // Retorna solo el arreglo de ofertas con detalles del usuario
        return res.status(200).json({
            success: true,
            message: "Ofertas encontradas",
            data: ofertasConInformacion,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener ofertas",
            data: error,
        });
    }
};

exports.getSubastaById = async (req, res) => {
    const subastaId = req.params.id;

    try {
        // Intenta encontrar la subasta por el ID proporcionado directamente
        const subasta = await Subasta.findById(subastaId);

        // Si no se encuentra la subasta por el ID proporcionado, realiza una segunda búsqueda por el ID del carro
        if (!subasta) {
            const subastaPorCarro = await Subasta.findOne({ idCarro: req.params.id });

            if (!subastaPorCarro) {
                // Si no se encuentra ninguna subasta, responde con un mensaje de error
                return res.status(404).json({
                    message: "Subasta no encontrada"
                });
            }

            // Si se encuentra una subasta por el ID del carro, la devuelve en la respuesta
            return res.status(200).json({
                message: "Subasta obtenida con éxito",
                data: subastaPorCarro
            });
        }

        // Si se encuentra la subasta por el ID proporcionado, la devuelve en la respuesta
        return res.status(200).json({
            message: "Subasta obtenida con éxito",
            data: subasta
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar la subasta",
            data: error
        });
    }
};


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

exports.updateOfertaSubasta = async (req, res) => {
    try {
        const subasta = await Subasta.findById(req.params.id);

        if (!subasta) {
            return res.status(404).json({
                success: false,
                message: "Subasta no encontrada",
            });
        }

        // Extrae el valor de la nueva oferta del cuerpo de la solicitud
        const { precioOfertado, idUser } = req.body;

        // Verifica si el estado está cerrado o la fecha final ya ha pasado
        if (subasta.estado === 'cerrado' || subasta.fechaFin < new Date()) {
            return res.status(400).json({
                success: false,
                message: "No se pueden hacer ofertas en una subasta cerrada o después de la fecha final.",
            });
        }

        // Verifica si la nueva oferta es mayor que el precio final actual
        if (precioOfertado > subasta.precioFinal) {
            // Actualiza el precio final con el precio de la nueva oferta
            subasta.precioFinal = precioOfertado;
        }

        // Agrega la nueva oferta al array de ofertas
        const nuevaOferta = {
            idUser, // ID del usuario que realiza la oferta
            fecha: new Date(),
            precioOfertado
        };
        subasta.ofertas.push(nuevaOferta);

        // Guarda la subasta actualizada en la base de datos
        await subasta.save();

        return res.status(200).json({
            success: true,
            message: "Subasta actualizada con éxito",
            data: subasta
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar subasta",
            data: error
        });
    }
}

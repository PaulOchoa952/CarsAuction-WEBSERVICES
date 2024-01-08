/*

Este conjunto de funciones en JavaScript utiliza Express y la biblioteca bcrypt para gestionar el registro, 
inicio de sesión y actualización de usuarios en una aplicación.
La función registerUser maneja la creación de nuevos usuarios, verifica si ya existe 
un usuario con el mismo correo electrónico y guarda la contraseña cifrada en la base de datos.

La función getUsers obtiene todos los usuarios de la base de datos.

La función loginUser maneja el inicio de sesión, verifica las credenciales del usuario,
genera un token JWT y devuelve información del usuario junto con el token.

La función updateUser actualiza la información de un usuario existente por su ID.

Estas funciones manejan situaciones de éxito y error, proporcionando respuestas JSON apropiadas. 
Además, se utiliza JWT para gestionar la autenticación y autorización del usuario.
*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.registerUser = async (req,res) =>{
    try{
        const{userName,email,password,name,lastName} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'El usuario ya existe'})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User ({userName,email,password: hashedPassword,name,lastName});
        await newUser.save();

        return res.status(201).json({message: 'Usuario registrado exitosamente'});
    }catch(error){
        res.status(500).json({error: 'Error al registrar usuario'});
    }
};
exports.getUsers = async (req,res) =>{
    try{
        const users = await User.find();
        return res.status(200).json(
            {
                message : 'Usuarios obtenidos exitosamente',
                data : users
            }
        );
    }catch(error){
        return res.status(500).json(
            {
                message: 'Error al consultar usuarios',
                data: error
            }
        );
    }
};
exports.loginUser = async (req,res) =>{
    try {
        const{email,password} = req.body;

        await User.findOne({email})
        .then(async user => {
            if(!user){
                return res.status(401).json({error: 'Credenciales invalidas'});
            }
            const passwordMatch = await bcrypt.compare(password,user.password);
            if(!passwordMatch){
                return res.status(401).json({error: 'Credenciales invalidas'});
            }
            const token = jwt.sign({userId: user._id,userName: user.userName},
                'secreto',{expiresIn: '8h'});
            let formatUser = {
                _id: user._id,
                userName : user.userName,
                userEmail : user.email
            };
            return res.json({
                user : formatUser,
                token: token,
                action :'login'
            });
        }).catch(err =>{
            return res.status(500).json(
                {
                    action : 'login',
                    error: error
                }
            );
        });
    }catch(error){
        res.status(500).json({error: 'Error al iniciar sesion'});
    }
};
exports.updateUser = async(req,res) => {
    const userId = req.params.userId;
    const newData = req.body;
    try{
        const updateUser = await User.findByIdAndUpdate(userId,newData,{new:true});
        return res.status(200).json(
            {
                message: "Actualizar usuario por Id: "+userId+" con éxito",
                data: updateUser
            }
        );
    }catch(error){
        return res.status(500).json(
            {
                message: "Error al actualizar usuario",
                data:error
            }
        )
    }
}

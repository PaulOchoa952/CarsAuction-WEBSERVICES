/*

Este código en JavaScript define un middleware de autenticación llamado authenticateToken. 
Este middleware verifica la presencia de un token de acceso en el encabezado de la solicitud
(req.headers.authorization). Si no se proporciona un token, devuelve una respuesta de error 401 
indicando que no se proporcionó un token de acceso.

Si se proporciona un token, utiliza el método jwt.verify para verificar la autenticidad del 
token utilizando una clave secreta ('secreto'). Si el token es inválido, devuelve una respuesta 
de error 401 indicando que el token es inválido. Si el token es válido, decodifica la información del 
token y establece req.userId con el ID del usuario extraído del token. Luego, invoca next() para pasar 
la solicitud al siguiente middleware o controlador.

En resumen, este middleware verifica la autenticidad de un token JWT y establece el ID del usuario en 
la solicitud si el token es válido, permitiendo así la autenticación de usuarios en rutas protegidas.
*/
const jwt =require('jsonwebtoken');

exports.authenticateToken = (req,res,next)=>{
    const token= req.headers.authorization;
    if(!token){
        return res.status(401).json({
            error:'No se proporciono un token de acceso'
        });

    }

    jwt.verify(token,'secreto',(error,decoded)=>{
        if(error){
            return res.status(401).json({error:'Token inválido'});
        }
        req.userId=decoded.userId;
        next();
    });

};
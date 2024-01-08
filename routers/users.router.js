/*
Este código en JavaScript utiliza Express para definir rutas relacionadas con la gestión 
de usuarios en una aplicación. Cada ruta está asociada a una función específica del 
controlador userController, y algunas rutas están protegidas por un middleware de 
autenticación (authMiddleware.authenticateToken). Las rutas incluyen:

POST "/": Registra un nuevo usuario.
GET "/": Obtiene todos los usuarios.
POST "/login": Inicia sesión de un usuario.
PUT "/:userId": Actualiza la información de un usuario por su ID.
Estas rutas están definidas en el archivo users.routes.js y se exportan para su uso en otros archivos del proyecto.
*/
const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controllers');
const authMiddleware = require('../utils/auth.middleware');

router.post('/',userController.registerUser);
router.get('/', userController.getUsers);
router.post('/login', userController.loginUser);
router.put('/:userId', userController.updateUser);
router.delete('/:id', authMiddleware.authenticateToken,userController.deleteUser);
module.exports = router;
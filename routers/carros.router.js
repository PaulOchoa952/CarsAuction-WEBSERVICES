/*

Este código en JavaScript utiliza Express y define rutas para operaciones CRUD en la
colección de carros de una aplicación. Cada ruta está asociada a una función específica del controlador carroController. Además, se utiliza un middleware de autenticación (authMiddleware.authenticateToken) para asegurar que las rutas solo sean accesibles para usuarios autenticados.

GET "/": Obtiene todos los carros.
GET "/:carroId": Obtiene un carro por su ID.
POST "/": Crea un nuevo carro.
PUT "/:carroId": Actualiza un carro por su ID.
DELETE "/:carroId": Elimina un carro por su ID.
Estas rutas están definidas en el archivo carros.routes.js y se exportan para su uso en otros
archivos del proyecto.
*/
const express=require('express');
const router=express.Router();
const carroController=require('../controllers/carros.controller');
const authMiddleware = require('../utils/auth.middleware');

router.get("/",authMiddleware.authenticateToken,carroController.getCarros);

router.get("/:carroId",authMiddleware.authenticateToken,carroController.getCarrosId);

router.post("/",authMiddleware.authenticateToken,carroController.newCarro);

router.put("/:carroId",authMiddleware.authenticateToken,carroController.updateCarro);

router.delete("/:carroId",authMiddleware.authenticateToken,carroController.deleteCarro);

module.exports=router;
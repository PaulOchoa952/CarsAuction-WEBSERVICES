/*
Este código en JavaScript utiliza Express para definir rutas relacionadas con las subastas 
de una aplicación. Cada ruta está asociada a una función específica del controlador subastaController, y algunas rutas están protegidas por un middleware de autenticación (authMiddleware.authenticateToken). Las rutas incluyen:

POST "/": Crea una nueva subasta.
GET "/activa/": Obtiene subastas activas.
GET "/:id": Verifica si hay una subasta asociada a un carro específico.
PUT "/:id": Actualiza el estado de una subasta por su ID.
GET "/info/:id": Obtiene detalles de una subasta por su ID.
PUT "/oferta/:id": Actualiza las ofertas de una subasta por su ID.
GET "/ofertas/:id": Obtiene las ofertas de una subasta por su ID.
GET "/": Obtiene todas las subastas.
Estas rutas están definidas en el archivo subastas.routes.js y se exportan para 
su uso en otros archivos del proyecto.
*/
const express = require('express');
const router = express.Router();
const subastaController = require('../controllers/subastas.controllers');
const authMiddleware = require('../utils/auth.middleware');

router.post('/',authMiddleware.authenticateToken,subastaController.createSubasta);
router.get('/activa/', subastaController.getSubastasActivas);
router.get('/:id', subastaController.verifiedSubasta);
router.put('/:id', authMiddleware.authenticateToken,subastaController.updateSubasta);
router.get('/info/:id', authMiddleware.authenticateToken,subastaController.getSubastaById);
router.put('/oferta/:id', authMiddleware.authenticateToken,subastaController.updateOfertaSubasta);
router.get('/ofertas/:id',authMiddleware.authenticateToken,subastaController.getOfertasBySubastaId);
router.get('/', subastaController.getSubastas);

module.exports = router;
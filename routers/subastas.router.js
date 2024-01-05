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
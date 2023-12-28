const express = require('express');
const router = express.Router();
const subastaController = require('../controllers/subastas.controllers');
const authMiddleware = require('../utils/auth.middleware');

router.post('/',authMiddleware.authenticateToken,subastaController.createSubasta);
router.get('/', subastaController.getSubastas);

module.exports = router;
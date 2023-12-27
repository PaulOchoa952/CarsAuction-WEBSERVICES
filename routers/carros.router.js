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
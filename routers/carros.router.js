const express=require('express');
const router=express.Router();
const carroController=require('../controllers/carros.controller');
const authMiddleware = require('../utils/auth.middleware');

router.get("/",carroController.getCarros);

router.get("/:carroId",carroController.getCarrosId);

router.post("/",authMiddleware.authenticateToken,carroController.newCarro);

router.put("/:carroId",carroController.updateCarro);

router.delete("/:carroId",carroController.deleteCarro);

module.exports=router;
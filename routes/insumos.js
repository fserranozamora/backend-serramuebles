const express = require ('express');
const router = express.Router();
const InsumoController = require ('../controllers/insumosController');


router.post('/',InsumoController.agregarInsumos);
router.get('/',InsumoController.mostrarInsumos);
router.get('/:id',InsumoController.mostrarUnInsumo);
router.delete('/:id',InsumoController.eliminarInsumos);
router.put("/:id",InsumoController.actualizarInsumo);



module.exports = router;
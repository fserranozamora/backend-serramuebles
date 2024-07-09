const express = require ('express');
const router = express.Router();
const MaterialController = require ('../controllers/materialesController');


router.post('/',MaterialController.agregarMateriales);
router.get('/',MaterialController.mostrarMateriales);
router.get('/:id',MaterialController.mostrarUnMaterial);
router.delete('/:id',MaterialController.eliminarMateriales);
router.put("/:id",MaterialController.actualizarMaterial);



module.exports = router;
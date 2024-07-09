const express = require ('express');
const router = express.Router();
const HerramientaController = require ('../controllers/herramientasController');


router.post('/',HerramientaController.agregarHerramientas);
router.get('/',HerramientaController.mostrarHerramientas);
router.get('/:id',HerramientaController.mostrarUnaHerramienta);
router.delete('/:id',HerramientaController.eliminarHerramientas);
router.put("/:id",HerramientaController.actualizarHerramienta);



module.exports = router;
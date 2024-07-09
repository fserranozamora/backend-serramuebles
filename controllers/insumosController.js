//Exportar el modelo
const Insumo = require('../models/Insumo');

// función agregar

exports.agregarInsumos = async(req, res) => {

    try {
        let insumos = new Insumo(req.body)
        await insumos.save();
        res.send(insumos);

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al agregar un insumo')
    }
}

// funcion mostrar

exports.mostrarInsumos = async(req, res) => {
    try {
        const insumos = await Insumo.find()
        res.json({insumos});

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al mostrar los insumos')
    }
}

// Funcion mostrar un dato

exports.mostrarUnInsumo = async(req, res) => {
    try {
        let insumos = await Insumo.findById(req.params.id); 
        if(!insumos) {
            res.status(404).json({ msg: 'No se encuentra el insumo con ese Id'}); 
        }
        res.send(insumos);

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al buscar un insumo en la web')
    }
}

// Eliminar 

exports.eliminarInsumos= async (req, res) => {
    try {
        let insumos = await Insumo.findById(req.params.id);
        if(!insumos) {
            res.status(404).json({msg: 'El insumo no existe'});
            return
        }
        await Insumo.findOneAndDelete({_id:req.params.id}); 
        res.json({msg: 'El insumo fue eliminada'});

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al eliminar el insumo en la base de datos')
    }
}

// Actualizar

exports.actualizarInsumo= async (req, res) => {
    try {
        const {referencia, descripcion_insumo, unidades, disponible} = req.body
        let insumo = await Insumo.findById(req.params.id);

        if(!insumo) {
            res.status(404).json({msg: 'El insumo no existe'});
            return
        }
            insumo.referencia = referencia;
            insumo.descripcion_insumo = descripcion_insumo;
            insumo.unidades = unidades;
            insumo.disponible = disponible;

            insumo = await Insumo.findOneAndUpdate({_id: req.params.id}, insumo,{new: true});
            res.json(insumo);

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al actualizar el insumo');
    }

}
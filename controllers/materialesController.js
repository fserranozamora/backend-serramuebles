//Exportar el modelo
const Material = require('../models/Material');

// función agregar

exports.agregarMateriales = async(req, res) => {

    try {
        let materiales = new Material(req.body)
        await materiales.save();
        res.send(materiales);

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al agregar un material')
    }
}

// funcion mostrar

exports.mostrarMateriales = async(req, res) => {
    try {
        const materiales = await Material.find()
        res.json({materiales});

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al mostrar los materiales')
    }
}

// Funcion mostrar un dato

exports.mostrarUnMaterial = async(req, res) => {
    try {
        let materiales = await Material.findById(req.params.id); 
        if(!materiales) {
            res.status(404).json({ msg: 'No se encuentra el material con ese Id'}); 
        }
        res.send(materiales);

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al buscar un material en la web')
    }
}

// Eliminar 

exports.eliminarMateriales= async (req, res) => {
    try {
        let materiales = await Material.findById(req.params.id);
        if(!materiales) {
            res.status(404).json({msg: 'El material no existe'});
            return
        }
        await Material.findOneAndDelete({_id:req.params.id}); 
        res.json({msg: 'El material fue eliminada'});

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al eliminar el material en la base de datos')
    }
}

// Actualizar

exports.actualizarMaterial= async (req, res) => {
    try {
        const {referencia, descripcion_material, unidades, disponible} = req.body
        let material= await Material.findById(req.params.id);

        if(!material) {
            res.status(404).json({msg: 'El material no existe'});
            return
        }
            material.referencia = referencia;
            material.descripcion_material = descripcion_material;
            material.unidades = unidades;
            material.disponible = disponible;

            material = await Material.findOneAndUpdate({_id: req.params.id}, material,{new: true});
            res.json(material);

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al actualizar el material');
    }

}
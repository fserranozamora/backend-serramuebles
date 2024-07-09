//Exportar el modelo
const Herramienta = require('../models/Herramienta');

// función agregar

exports.agregarHerramientas = async(req, res) => {

    try {
        let herramientas = new Herramienta(req.body)
        await herramientas.save();
        res.send(herramientas);

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al agregar una herramienta')
    }
}

// funcion mostrar

exports.mostrarHerramientas = async(req, res) => {
    try {
        const herramientas = await Herramienta.find()
        res.json({herramientas});

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al mostrar las herramientas')
    }
}

// Funcion mostrar un dato

exports.mostrarUnaHerramienta = async(req, res) => {
    try {
        let herramientas = await Herramienta.findById(req.params.id); 
        if(!herramientas) {
            res.status(404).json({ msg: 'No se encuentra la herramienta con ese Id'}); 
        }
        res.send(herramientas);

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al buscar una herramienta en la web')
    }
}

// Eliminar 

exports.eliminarHerramientas = async (req, res) => {
    try {
        let herramientas = await Herramienta.findById(req.params.id);
        if(!herramientas) {
            res.status(404).json({msg: 'La Herramienta no existe'});
            return
        }
        await Herramienta.findOneAndDelete({_id:req.params.id}); 
        res.json({msg: 'La herramienta fue eliminada'});

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al eliminar la herramienta en la base de datos')
    }
}

// Actualizar

exports.actualizarHerramienta= async (req, res) => {
    try {
        const {referencia, descripcion_herramienta, unidades, disponible} = req.body
        let herramienta = await Herramienta.findById(req.params.id);

        if(!herramienta) {
            res.status(404).json({msg: 'La herramienta no existe'});
            return
        }
            herramienta.referencia = referencia;
            herramienta.descripcion_herramienta = descripcion_herramienta;
            herramienta.unidades = unidades;
            herramienta.disponible = disponible;

            herramienta = await Herramienta.findOneAndUpdate({_id: req.params.id}, herramienta,{new: true});
            res.json(herramienta);

    } catch (err) {
        console.log(err)
        res.status(500).send('Hubo un error al actualizar la herramienta');
    }

}
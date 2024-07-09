const { version } = require("os");

const mongoose = require ('mongoose');

//Modelo que vamos a trabajar es igual a la BD ya establecida

const materialSchema = mongoose.Schema({

referencia:{
    type: String,
    require:true
},
descripcion_material:{
    type: String,
    require:true
},
unidades:{
    type: Number,
    require:true
},
disponible:{
    type: String,
    require:true
},
},{versionkey: false});

module.exports = mongoose.model('Material', materialSchema)
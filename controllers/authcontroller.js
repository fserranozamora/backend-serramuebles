const Usuario = require("../models/Usuario");
const bcryptjs = require ("bcryptjs");
const {validationResult} = require ("express-validator");
const jwt = require ("jsonwebtoken");

exports.autenticarusuario = async (req,res) => {
    // revisar si hay errores

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }
    
    const { email, password} = req.body;

    try {
        // verificar si tenemos un usuario registrado
        let usuario = await Usuario.findOne({ email});
        if(!usuario){
            return res.status(400).json({msg: "el usuario no esta registrado"})
        }
     // revisar el password
      const passCorrecto = await bcryptjs.compare(password,usuario.password);
      if(!passCorrecto){
        return res.status(400).json({mng:"la contrasena es incorrecta"});

      }
      // si todo está bien si se firma el token

      const payload ={
        usuario:{id: usuario.id},

      };
      jwt.sign( 
      payload,
      process.env.SECRETA,
      {
        expiresIn: 43200,// una hora
      },
      (error,token) =>{
        if(error) throw error;
        //mensaje de confirmacion
        res.json({token});

     }

    );
    } catch (error){
        console.log("hubo un error");
        console.log(error);
        res.status(400).send("hubo un error");
    }
};

exports.usuarioAutenticado =async (req,res) =>{
    try {
        const usuario= await Usuario.findById(req.usuario.id);
        res.json({usuario});
    } catch (error) {
        res.status(400).json({msg: "hubo un error"});
    }

}
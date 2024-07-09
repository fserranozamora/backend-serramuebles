const Usuario = require ("../models/Usuario");
const bcryptjs = require ("bcryptjs");
const { validationResult } = require ("express-validator");
const jwt = require ("jsonwebtoken");

exports.crearUsuario= async (req,res) =>{
    // revisar si hay errores

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({ errores: errores.array()});
    }

    const{ email, password} = req.body;
    try {
        //verificar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });
        if(usuario){
            return res.status(400).json({ msg: " el usuario ya existe"})
        }
        // crear un nuevo usuario
        usuario = new Usuario(req.body);

        usuario.password = await bcryptjs.hash(password, 10);
        // guardar el usuario
        await usuario.save();

      
        // se firma el token si está correcto
       const payload ={
        usuario: {id: usuario.id},
       };

       jwt.sign(
       payload,
       process.env.SECRETA,
       {
         expiresIn: 3600, // 1 hora
       },
       (error, token)=>{
        if(error) throw error;
         // mensaje de confirmacion
         res.json({token});

       }
    );
    } catch (error) {
        console.log("hubo un error");
        console.log(error);
        res.status(400).send("hubo un error");
        
    }
};
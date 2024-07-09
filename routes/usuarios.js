const express = require( "express");
const router = express.Router();
const { check } = require ("express-validator");
const usuariosController = require ("../controllers/usuariosController");

// crear usuario

router.post(
    "/", [
        check("nombre", "El nombre debe ser obligatorio").not().isEmpty(),
        check("email", "Agregar un correo electrónico válido").isEmail(),
        check("password", "La contraseña debe tener minimo 10 caracteres").isLength({
            min:8,
        }),



    ],
    usuariosController.crearUsuario
);
module.exports = router;
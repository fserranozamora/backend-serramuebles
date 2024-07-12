const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authcontroller");
const auth = require("../middleware/auth");

//autenticar el usuario ---// api/auth

router.post(
    "/", [
    check("email", "Digite un correo electrónico válido").isEmail(),
    check("password", "La contraseña debe tener minimo 10 caracteres").isLength({
        min: 8,
    }),
],
    authController.autenticarusuario
);

router.post("/register",
    [
        check("email", "Digite un correo electrónico válido").isEmail(),
        check("password", "Contraseña debil").isStrongPassword(),
        check("nombre", "Mínimo tres carácteres, máximo 40 carácteres").isLength({
            min: 3,
            max: 40,
        }),
    ],
    authController.register)

router.get("/", auth, authController.autenticarusuario);



module.exports = router;

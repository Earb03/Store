const { Router } = require("express");
const { autentificarUsuario } = require("../controllers/usuarios");
const router = Router();

router.post("/login", autentificarUsuario);

module.exports = router;

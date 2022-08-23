const { Router } = require("express");
const {
  autentificarUsuario,
  autentificarUsuarioView,
  crearUsuario,
} = require("../controllers/usuarios");
const router = Router();

router.post("/login", autentificarUsuario);

router.get("/registro", autentificarUsuarioView);
router.post("/registro", crearUsuario);

module.exports = router;

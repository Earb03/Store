const usuarios = require("../models/usuarios");
const bcrypt = require("bcrypt");

//crear user
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, nombreUsuario, password } = req.body;

    bcrypt.hash(password, 12, async function (err, hash) {
      if (err) console.log("\n\n\n:::::bycript err::::\n\n\n", err);
      await usuarios.create({
        nombre,
        apellido,
        email,
        nombreUsuario,
        hash,
      });
    });

    //cambiar esto a que muestre la respectiva vista
    res.redirect("/admin/puestos_electivos/view_all");
  } catch (error) {
    console.log(error + "\n\n\n:::Error::::::\n\n\n");
  }
};

//login
exports.autentificarUsuario = async (req, res) => {
  console.log(req.body);
  // const { username, password } = req.body;

  try {
    const userData = await usuarios.findOne({
      where: {
        nombreUsuario: username,
      },
    });

    if (!userData) {
      console.log("usuario no encontrado");
      return res.redirect("/");
    }

    bcrypt.compare(password, userData.dataValues.password).then((result) => {
      if (result) {
        req.session.isAuth = true;
        req.session.save();
        console.log(req.locals);
        // cambiar esto al path correcto
        return res.redirect("/admin");
      }

      console.log("error Password incorrecto");
      return res.redirect("/");
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

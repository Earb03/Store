const usuarios = require("../models/usuarios");
const bcrypt = require("bcrypt");

//crear user
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, email, nombreUsuario, password } = req.body;
    console.log(nombre, apellido, email, nombreUsuario, password);

    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) console.log("\n\n\n:::::bycript err::::\n\n\n", err);
      await usuarios.create({
        nombre,
        apellido,
        email,
        nombreUsuario,
        password: hash,
      });
    });

    //cambiar esto a que muestre la respectiva vista
    res.redirect("/");
  } catch (error) {
    console.log(error + "\n\n\n:::Error::::::\n\n\n");
  }
};

exports.autentificarUsuarioView = (req, res) => {
  res.render("../views/layouts/registro.hbs", {
    layout: false,
  });
};

//login
exports.autentificarUsuario = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

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
    console.log(password, userData.dataValues);
    bcrypt.compare(password, userData.dataValues.password).then((result) => {
      if (result) {
        req.session.isAuth = true;
        req.session.save();
        console.log(req.locals);
        // cambiar esto al path correcto
        console.log("se logueo");
        return res.redirect("/store");
      }

      console.log("error Password incorrecto");
      return res.redirect("/");
    });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

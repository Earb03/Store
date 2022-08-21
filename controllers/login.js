const bcrypt = require('bcrypt')
const userModel = require('../../models/usuarios')

/* const loginView = (req, res) => {
  res.render('admin/login/admin-login')
} */

const loginController = async (req, res) => {
  const { user, password } = req.body


  try{
    const userData = await userModel.findOne({
      where: {
        nombreUsuario: user
      }
    })

    if (!userData){
      req.flash('error','No se encontro un usuario con estas credenciales')
      return res.redirect('/login')
    }

    bcrypt.compare(password, userData.dataValues.password).then(( result )=>{
      if(result) {
        req.session.isAuth = true
        req.session.save()
        console.log(req.locals)
        return res.redirect('/admin')
      }

      req.flash('error','Password incorrecto')
      return res.redirect('/login')

    })
  }catch(err){
    console.log(err)
    req.flash('error','Algo inesperado sucedio...')
    res.redirect('/login')
  }
  bcrypt.compare( password, async function(err, hash) {
   
  })
}

const logout = (req, res) => {
  req.session.destroy()
  res.redirect('/main')
}

module.exports = { loginView, loginController,logout }
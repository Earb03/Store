const { Router } = require('express')

//const {home} = require('../controllers/home')

const router = Router()

 router.get('/',   (req, res)=> {
    res.render('../views/layouts/main.hbs' )
  })
 router.get('/about', (req, res)=> {
    res.render('../views/layouts/about.hbs', {layout: false} )
  })
 router.get('/help-center', (req, res)=> {
    res.render('../views/layouts/help-center.hbs', {layout: false} )
  }) 

module.exports = router
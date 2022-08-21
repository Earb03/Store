const { Router } = require('express')

const home = require('./home')
const login = require('./login')
const product = require('./product')
const shop = require('./shop')


const router = Router()


// router.use(login)
router.use(product)
// router.use(shop)
router.use(home)

module.exports = router
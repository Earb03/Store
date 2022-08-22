const { Router } = require('express')

const { store, viewAll, createView, createPost, updateView, updateViewForm, updatePost, deleteView, deletePost } = require('../controllers/product')
const {verifyAuthIslogged} = require("../middleware/verificarAutentificacion")
const router = Router()



router.get('/store', store)

// router.get('/view_all', viewAll)



router.get('/add-product', verifyAuthIslogged, createView)
router.post('/add-product', createPost)



// router.get('/product/update/:id', updateView)
router.get('/product/update/:id', updateViewForm)
router.post('/product/update/:id',updatePost)

// router.get('/product/delete', deleteView)
router.post('/product/delete/:id', deletePost)

module.exports = router
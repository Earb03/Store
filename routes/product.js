const { Router } = require('express')

const { store, viewAll, createView, createPost, updateView, updateViewForm, updatePost, deleteView, deletePost } = require('../controllers/product')

const router = Router()

router.get('/product/view_all', viewAll)

router.get('/store', store)

router.get('/product/create', createView)
router.post('/product/create', createPost)

// router.get('/product/update/:id', updateView)
router.get('/product/update/:id', updateViewForm)
router.post('/product/update/:id',updatePost)

// router.get('/product/delete', deleteView)
router.post('/product/delete/:id', deletePost)

module.exports = router
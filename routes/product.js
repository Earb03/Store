const { Router } = require("express");

const {
  store,
  viewAll,
  createView,
  createPost,
  updateView,
  updateViewForm,
  updatePost,
  deleteView,
  deletePost,
} = require("../controllers/product");
const {
  verifyAuthIslogged,
} = require("../middleware/verificarAutentificacion");
const router = Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "views/layouts/img");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    let imgType = file.mimetype.split("/");
    imgType = `.${imgType[1]}`;

    cb(null, file.originalname + "-" + uniqueSuffix + imgType);
  },
});

const upload = multer({ storage: storage });

router.get("/store", store);

// router.get('/view_all', viewAll)

router.get("/add-product", createView);
router.post("/add-product", upload.single("Imagen"), createPost);

// router.get('/product/update/:id', updateView)
router.get("/product/update/:id", updateViewForm);
router.post("/product/update/:id", updatePost);

// router.get('/product/delete', deleteView)
router.post("/product/delete/:id", deletePost);

module.exports = router;

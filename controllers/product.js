const productos = require("../models/products");

const store = async (req, res) => {
  /* res.render('../views/layouts/store.hbs', {
    layout: false,
    adminMode: false
  }) */
  let data = await productos.findAll();
  let isAdmin = false;
  if (req.session && req.session.isAuth) {
    isAdmin = true;
  }
  data = data.map((result) => result.dataValues);
  console.log(data);

  res.render("../views/layouts/store.hbs", {
    data: data,
    layout: false,
    adminMode: isAdmin,
  });
};

const viewAll = async (req, res) => {};

const createView = async (req, res) => {
  res.render("../views/layouts/add-product.hbs", {
    layout: false,
  });
};

const createPost = async (req, res) => {
  try {
    let { Titles, Sinopsis, Precios, Generos, Imagen } = req.body;
    if (!Titles || !Sinopsis || !Precios || !Generos) {
      console.log("Error, Debes llenar todos los campos");
      return res.redirect("/add-product");
    }

    console.log(req.file.filename);

    await productos.create({
      title: Titles,
      sinopsis: Sinopsis,
      precio: Precios,
      genero: Generos,
      imageUrl: req.file.filename,
      // imagenUrl: Imagen
    });
    res.redirect("/store");
  } catch (err) {
    console.log(err);
    //req.flash('error', 'Algo sucedio, contacte con el administrador...')
    res.redirect("/add-product");
  }
};

const updateViewForm = async (req, res) => {
  //   // enviar form view
  //   try {
  //     const id = req.params.id;
  //     let data = await productos.findOne({
  //       where: {
  //         id: id,
  //       },
  //     });
  //     data = data.dataValues;
  res.render("../views/layouts/add-product.hbs", {
    layout: false,
    /*  editMode: true,
      data: data  */
  });
  //   } catch (err) {
  //     console.log(err);
  //     // req.flash('error', 'Algo sucedio, contacte con el administrador...')
  //     res.redirect(`/product/update/${id}`);
  //   }
};

const updatePost = async (req, res) => {
  try {
    const id = req.params.id;

    let { Titles, Sinopsis, Precios, Generos, Imagen } = req.body;

    if (!Titles || !Sinopsis || !Precios || !Generos || !Imagen) {
      console.log("Error, Debes llenar todos los campos");
      return res.redirect(`/product/updateViewForm/${id}`);
    }

    await productos.update(
      {
        title: Titles,
        sinopsis: Sinopsis,
        precio: Precios,
        genero: Generos,
        imagenUrl: Imagen,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.redirect("/admin/ciudadanos/view_all");
  } catch (err) {
    console.log(err);
    //  req.flash('error', 'Algo sucedio, contacte con el administrador...')
    res.redirect(`/admin/puestos_electivos/update/${id}`);
  }
};

// const deleteView = async() => {
//   let data = await getAllpartidosData()

//   data = data.map( result => result)
//   console.log(data)
//   //mandar data al front
// }

const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    await productos.destroy({
      where: {
        id: id,
      },
    });

    //req.flash('exito', 'Accion completada con exito!')
    res.redirect("/store");
  } catch (err) {
    console.log(err);
    // req.flash('error', 'Algo sucedio, contacte con el administrador...')
    res.redirect("/store");
  }
};

module.exports = {
  viewAll,
  store,
  createView,
  createPost,
  // updateView,
  updateViewForm,
  updatePost,
  // deleteView,
  deletePost,
};

const productos = require('../models/products')


const store = (req, res)=> {
  res.render('../views/layouts/store.hbs', {
    layout: false,
    adminMode: false
  })
}


const viewAll = async (req, res) => {
  let data = await productos.findAll()

  data = data.map( result => result.dataValues)
  console.log(data)
  res.render('/views/layouts/store.hbs', {data: data})

}

const createView = async (req, res) => {
  res.render('/views/layouts/add-product.hbs')
}

const createPost = async (req, res) => {
 try{

  let { Name, Apellidos, email, DocIdentidad, StatusActive } = req.body

  if(!Name || !Apellidos || !email || !DocIdentidad) {
    req.flash('error', 'Debes llenar todos los campos')
    return res.redirect('/views/layouts/add-product.hbs')
  }

  if(!StatusActive) {
    StatusActive = false
  } else {
    StatusActive = true
  }

  await productos.create({
    nombre: Name,
    apellido: Apellidos,
    email: email,
    documentoIdentidad: DocIdentidad,
    estado: StatusActive
  })
  res.redirect('/views/layouts/store.hbs')
 }
 catch(err){
   console.log(err)
   req.flash('error', 'Algo sucedio, contacte con el administrador...')
   res.redirect('/views/layouts/add-product.hbs')
 }

}

const updateViewForm = async (req, res) => {
   // enviar form view 
 try{
  const id = req.params.id
  let data = await productos.findOne({
    where:{
      id: id
    },
  })
  data = data.dataValues
  
  res.render('admin/ciudadanos/form-ciudadanos',{ 
    editMode: true,
    data: data
  })

 } catch(err) {
  console.log(err)
  req.flash('error', 'Algo sucedio, contacte con el administrador...')
  res.redirect('/admin/ciudadanos/view_all')

 }
}

const updatePost = async (req, res) => {
  try {
    const id  = req.params.id

    let { Name, Apellidos, email, DocIdentidad, StatusActive } = req.body

    if(!Name || !Apellidos || !email || !DocIdentidad) {
      req.flash('error', 'Debes llenar todos los campos')
      return res.redirect('/admin/ciudadanos/create')
    }
  
    if(!StatusActive) {
      StatusActive = false
    } else {
      StatusActive = true
    }
  
  let data = await productos.findOne({
    where:{
      id: id
    },
  })

  await productos.update({
    nombre: Name,
    apellido: Apellidos,
    email: email,
    documentoIdentidad: DocIdentidad,
    estado: StatusActive
  },
  {
    where: {
      id: id
    }
  }
  )
  res.redirect('/admin/ciudadanos/view_all')
  } catch(err) {
    console.log(err)
    req.flash('error', 'Algo sucedio, contacte con el administrador...')
    res.redirect(`/admin/puestos_electivos/update/${id}`)
  }
}

// const deleteView = async() => {
//   let data = await getAllpartidosData()

//   data = data.map( result => result)
//   console.log(data)
//   //mandar data al front
// }

const deletePost = async (req, res) => {
  const id = req.params.id

 try{

  await productos.update({estado: false },{
    where:{
      id: id
    }
  })

  req.flash('exito', 'Accion completada con exito!')
  res.redirect('/admin/ciudadanos/view_all')

 } catch(err) {
   console.log(err)
   req.flash('error', 'Algo sucedio, contacte con el administrador...')
   res.redirect('/admin/ciudadanos/view_all')
 }
  
}

module.exports =  { 
  viewAll,
  store,
  createView,
  createPost,
  // updateView,
  updateViewForm,
  updatePost,
  // deleteView,
  deletePost 
}

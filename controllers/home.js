exports.home = (req, res)=> {
    res.render('../views/layouts/main.hbs' )
  }


   exports.about = (req, res)=> {
    res.render('../views/layouts/about.hbs', {layout: false} )
  }
  
  module.exports = help = (req, res)=> {
    res.render('../views/layouts/help-center.hbs', {layout: false})
  }

  
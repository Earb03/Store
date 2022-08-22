exports.verifyAuthIslogged = (req, res, next) => {
  //arreglar endpoint
  if (req.session.isAuth) return res.redirect("/admin");
  next();
};

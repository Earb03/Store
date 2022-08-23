exports.verifyAuthIslogged = (req, res, next) => {
  //arreglar endpoint
  if (req.session && !req.session.isAuth) return res.redirect("/");
  next();
};

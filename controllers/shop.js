const ProductModel = require("../models/Product");

exports.GetIndex = (req, res, next) => {
  //arrow functions
  ProductModel.GetAll(function (products) {
    res.render("shop/index", {
      pageTitle: "Itla shop",
      prods: products,
      hasProducts: products.length > 0,
      ShopActive: true,
    });
  });
};

exports.GetProducts = (req, res, next) => {
  //arrow functions
  ProductModel.GetAll(function (products) {
    res.render("shop/product-list", {
      pageTitle: "Products",
      prods: products,
      hasProducts: products.length > 0,
      ProductsActive: true,
    });
  });
};

exports.GetCart = (req, res, next) => {
  //arrow functions
  res.render("shop/cart", {
    pageTitle: "Cart",
    CartActive: true,
  });
};

exports.GetOrders = (req, res, next) => {
  //arrow functions
  res.render("shop/orders", {
    pageTitle: "Orders",
    OrdersActive: true,
  });
};

exports.GetCheckout = (req, res, next) => {
  //arrow functions
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    CartActive: true,
  });
};

exports.GetProduct = (req, res, next) => {

  const productId = req.params.productId;

  //arrow functions
  ProductModel.GetById(productId, (product) => {
    res.render("shop/product-details", {
      pageTitle: "detail",
      ProductsActive: true,
      product: product,
    });
  });
};

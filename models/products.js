const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/db')

const productos = db.define('productos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    sinopsis: {
      type: DataTypes.STRING
    },
    genero: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    precio: {
      type: DataTypes.STRING
    }
    
  })

  
  module.exports = productos;
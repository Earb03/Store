const { Sequelize, DataTypes } = require('sequelize')
const db = require('../config/db')

const usuarios = db.define('usuarios', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  apellido: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  nombreUsuario: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  }
  
})

module.exports = usuarios
const Sequelize = require('sequelize');

/* const sequelize = new Sequelize("tic-games-store", "root", "",
{dialect: "mysql", 
host: "localhost", 
port: 3306
}); */

const config = {
    dbName: 'tic-games-store',
    dbUser: 'root',
    dbPassword: '',
    port: 3306
  }
  
  const sequelize = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    dialect: "mysql",
    host: "localhost",
    port: config.port
  });
  
module.exports = sequelize;
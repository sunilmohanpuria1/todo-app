const Sequelize = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize(config.mysqldata.database, config.mysqldata.username, config.mysqldata.password, {
    host: config.mysqldata.host,
    dialect: config.mysqldata.dialect
  });

  const news = sequelize.define('news', {
    newsTitle: {
        type: Sequelize.STRING,
        allowNull: true
      }, 
      Discription: {
      type: Sequelize.TEXT
    }
  }, {
    paranoid: true,
  });

  module.exports = {sequelize,news};
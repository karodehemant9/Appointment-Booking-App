const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User  = sequelize.define('user',{
  id: {type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
  userName: {type: Sequelize.STRING, allowNull: false},
  userEmail: {type: Sequelize.STRING, allowNull: false},
  userPhoneNumber: {type: Sequelize.BIGINT, allowNull: false}
});

module.exports = User; 
  
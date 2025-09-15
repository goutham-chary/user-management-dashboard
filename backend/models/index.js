const Sequelize = require("sequelize");
const sequelize = require("../config/db");
const UserModel = require("./user");

const User = UserModel(sequelize, Sequelize.DataTypes);

module.exports = {
  sequelize,
  User,
};

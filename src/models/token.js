"use strict";
const { Model } = require("sequelize");
const { tokenTypes } = require("../config/tokens");
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      Token.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Token.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      type: {
        type: DataTypes.STRING,
        enum: [
          tokenTypes.REFRESH,
          tokenTypes.RESET_PASSWORD,
          tokenTypes.VERIFY_EMAIL,
        ],
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        // Foreign key to User model
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", // This is the table name, usually plural of model name
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Token",
      timestamps: true,
    }
  );
  return Token;
};

'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "The field name cannot be empty"
        },
        len: {
          args: [3, 20],
          msg: "The length of this field cannot be less than 4 characters or more than 20 characters"
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "The field phone cannot be empty"
        },
        len: {
          args: [11, 15],
          msg: "The length of this field cannot be less than 11 characters or more than 15 characters"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "The field email cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 30],
          msg: "The length of this field cannot be less than 6 characters or more than 30 characters"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    administrator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    resetPasswordToken: DataTypes.STRING,
    resetPasswordTokenExpiress: DataTypes.DATE
  }, {
    hooks: {
      afterValidate: user => {
        user.password = bcrypt.hashSync(user.password, 8);
      }
    },
    sequelize
  });
  User.associate = function(models) {
    User.belongsToMany(models.Culinary, { foreignKey: 'userId', through: 'UserCulinaries', as: 'culinaries' });
    User.belongsToMany(models.Ingredient, { foreignKey: 'userId', through: 'UserIngredients', as: 'ingredients' });
    User.belongsToMany(models.Recipe, { foreignKey: 'userId', through: 'Likes', as: 'likes' });
    User.hasMany(models.Recipe);
  };
  
  return User;
};

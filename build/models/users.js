'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataType) {
  var Users = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataType.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    timestamps: false,
    hooks: {
      beforeCreate: function beforeCreate(user) {
        var salt = _bcrypt2.default.genSaltSync();
        user.password = _bcrypt2.default.hashSync(user.password, salt);
      }
    },
    classMethods: {
      associate: function associate(models) {},
      isPassword: function isPassword(encodedPassword, password) {
        return _bcrypt2.default.compareSync(password, encodedPassword);
      }
    }
  });
  return Users;
};
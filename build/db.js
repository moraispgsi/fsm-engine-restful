'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var db = null;

module.exports = function (app) {
  if (!db) {
    var config = app.libs.config;
    var sequelize = new _sequelize2.default(config.database, config.username, config.password, config.params);
    db = {
      sequelize: sequelize,
      Sequelize: _sequelize2.default,
      models: {}
    };
    var dir = _path2.default.join(__dirname, 'models');
    _fs2.default.readdirSync(dir).forEach(function (file) {
      var modelDir = _path2.default.join(dir, file);
      var model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });
    Object.keys(db.models).forEach(function (key) {
      db.models[key].associate(db.models);
    });
  }
  return db;
};
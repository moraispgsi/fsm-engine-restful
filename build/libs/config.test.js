'use strict';

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  database: 'database',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: function logging(sql) {
      _logger2.default.info('[' + new Date() + '] ' + sql);
    },
    define: {
      underscored: true
    }
  },
  jwtSecret: 'Nta$K-AP1',
  jwtSession: { session: false }
};
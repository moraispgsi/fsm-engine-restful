'use strict';

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {

  host: process.env.DB_SERVER,
  database: process.env.DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DIALECT,
  params: {
    logging: function logging(sql) {
      _logger2.default.info('[' + new Date() + '] ' + sql);
    },
    define: {
      underscored: false
    }
  },
  jwtSecret: 'Nta$K-AP1',
  jwtSession: { session: false }
};
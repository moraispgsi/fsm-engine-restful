'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _logger = require('./logger.js');

var _logger2 = _interopRequireDefault(_logger);

var _fsmEngine = require('fsm-engine');

var _fsmEngine2 = _interopRequireDefault(_fsmEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  app.set('port', process.env.PORT);
  app.set('json spaces', 4);
  app.use((0, _morgan2.default)('common', {
    stream: {
      write: function write(message) {
        _logger2.default.info(message);
      }
    }
  }));
  app.use((0, _helmet2.default)());
  app.use((0, _cors2.default)({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(_bodyParser2.default.json());
  app.use(app.auth.initialize());
  app.use(function (req, res, next) {
    delete req.body.id;
    next();
  });
  app.use(_express2.default.static('public'));
  app.engine = new _fsmEngine2.default(process.env.DISPATCHER_URL, process.env.DISPATCHER_TOKEN, _path2.default.join(__dirname, '../repository'), null);
};
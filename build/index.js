'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _consign = require('consign');

var _consign2 = _interopRequireDefault(_consign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

(0, _consign2.default)({ verbose: false, cwd: __dirname }).include('libs/config.js').then('db.js').then('auth.js').then('libs/middlewares.js').then('routes').then('libs/boot.js').into(app);

module.exports = app;
//# sourceMappingURL=index.js.map
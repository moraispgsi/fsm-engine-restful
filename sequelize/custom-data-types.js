/**
 * Created by Ricardo Morais on 18/07/2017.
 */

const BaseTypes = require('sequelize/lib/data-types'),
  util = require('util');

const DATE2005 = function () {
  if (!(this instanceof DATE2005)) return new DATE2005();
  BaseTypes.DATE.apply(this, arguments);
};
util.inherits(DATE2005, BaseTypes.ABSTRACT);

DATE2005.prototype.toSql = function () {
  return 'DATETIME';
};

module.exports = {
  DATE2005,
};

if (!DATE2005.key) DATE2005.key = DATE2005;
if (!DATE2005.extend) {
  DATE2005.extend = function (oldType) {
    return new DATE2005(oldType.options);
  };
}

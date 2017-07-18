'use strict';

module.exports = {
  database: 'database',
  username: '',
  password: '',
  dialect: 'sqlite',
  params: {
    storage: 'database.sqlite',
    logging: false,
    define: {
      underscored: true
    }
  },
  jwtSecret: 'NTASK_TEST',
  jwtSession: { session: false }
};
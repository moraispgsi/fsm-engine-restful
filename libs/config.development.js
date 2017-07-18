import logger from './logger.js';

module.exports = {
  database: 'database',
  username: '',
  password: '',
  dialect: 'sqlite',
  params: {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'Nta$K-AP1',
  jwtSession: { session: false },
};

import logger from './logger.js';

module.exports = {

  host: process.env.DB_SERVER,
  database: process.env.DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DIALECT,
  params: {
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`);
    },
    define: {
      underscored: false,
    },
  },
  jwtSecret: 'Nta$K-AP1',
  jwtSession: { session: false },
};

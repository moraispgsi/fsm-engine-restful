import logger from './logger.js';

module.exports = {

  database: process.env.DB,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  params: {
    host: process.env.DB_SERVER,
    dialect: process.env.DIALECT,
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


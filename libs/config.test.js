module.exports = {
  database: 'database',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: false,
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'NTASK_TEST',
  jwtSession: { session: false },
};

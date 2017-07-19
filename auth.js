import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import debugInit from 'debug';
const debug = debugInit('auth');

module.exports = app => {
  const Users = app.db.models.Users;
  const cfg = app.libs.config;
  const params = {
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
  };

  const strategy = new Strategy(params, (payload, done) => {

    Users.findAll({
      where: {
        id: payload.id,
      },
    })
    .then(users => {
      if (users[0]) {
        return done(null, {
          id: users[0].id,
          email: users[0].email,
        });
      }
      return done(null, false);
    })
    .catch(error => done(error, null));
  });
  passport.use(strategy);
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', cfg.jwtSession);
    },
  };
};

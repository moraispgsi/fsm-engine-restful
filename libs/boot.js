import bootProduction from './boot.production';
import bootTest from './boot.test';
import bootDevelopment from './boot.development';
import bootHeroku from './boot.heroku';

import debugInit from 'debug';
const debug = debugInit('boot');


module.exports = app => {
  debug('Booting in %s mode.', process.env.NODE_ENV);
  process.on('uncaughtException', err => {
    console.log('Caught exception: ' + err);
  });
  switch (process.env.NODE_ENV) {
    case 'production':
      if (process.env.PLATFORM === 'heroku') {
        bootHeroku(app);
      } else {
        bootProduction(app);
      }
      break;
    case 'development':
      bootDevelopment(app);
      break;
    case 'test':
      bootTest(app);
      break;
    default:
      bootDevelopment(app);
      break;
  }
};

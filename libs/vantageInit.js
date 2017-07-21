/* eslint-disable no-eval */

const vm = require('vm');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const request = require('request');
const schedule = require('node-schedule');
const debug = require('debug')('vantage');

const logging = {
  logs: '',
};
const write = process.stderr.write;

function interceptOutput(string, encoding, fd) {
  write.apply(process.stderr, arguments);
  logging.logs += string;
  if (logging.logs.length > 1000) {
    logging.logs = logging.logs.substring(logging.logs.length - 1000);
  }
}

process.stderr.write = interceptOutput;

module.exports = function (app, server) {

  const settings = {
    multiline: false,
    temp: '',
  };
  const global = {};
  let sandbox = null;
  server
    .mode('server', 'Enters REPL mode in the server.')
    .delimiter('server: ')
    .init((args, cb) => {
      try {
        sandbox = {
          logging,
          global,
          fs,
          path,
          moment,
          request,
          schedule,
          debug,
          app,
          server,
          engine: app.engine,
        };
        vm.createContext(sandbox);
        settings.multiline = false;
        settings.temp = '';
        cb();
      } catch (e) {
        debug(e);
        this.log(e);
        cb();
      }
    })
    .action(function (command, cb) {
      try {
        sandbox.log = this.log.bind(this);

        if (!settings.multiline && command.startsWith('@@@')) {
          settings.temp = '';
          settings.multiline = true;
          this.log('Building multiline command');
          cb();
          return;
        }

        if (settings.multiline) {
          if (command.startsWith('@@@')) {
            settings.multiline = false;
            const res = vm.runInContext(settings.temp, sandbox);
            settings.temp = '';
            this.log('Executing command');
            this.log(res);
          } else {
            settings.temp += command;
          }
          cb();
          return;
        }
        const res = vm.runInContext(command, sandbox);
        // const log = (typeof res === 'string') ? String(res).white : res;
        this.log(res);
        cb(res);
      } catch (e) {
        this.log(e);
        cb(e);
      }
    });


  server
    .mode('debug', 'Enters REPL mode in the server.')
    .delimiter('debug: ')
    .init((args, cb) => {
      cb();
    })
    .action(function (command, cb) {
      this.log('');
      cb();
    });
};

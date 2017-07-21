'use strict';

/* eslint-disable no-eval */

var vm = require('vm');
var fs = require('fs');
var path = require('path');
var moment = require('moment');
var request = require('request');
var schedule = require('node-schedule');
var debug = require('debug')('vantage');

var logging = {
  logs: ''
};
var write = process.stderr.write;

function interceptOutput(string, encoding, fd) {
  write.apply(process.stderr, arguments);
  logging.logs += string;
  if (logging.logs.length > 1000) {
    logging.logs = logging.logs.substring(logging.logs.length - 1000);
  }
}

process.stderr.write = interceptOutput;

module.exports = function (app, server) {
  var _this = this;

  var settings = {
    multiline: false,
    temp: ''
  };
  var global = {};
  var sandbox = null;
  server.mode('server', 'Enters REPL mode in the server.').delimiter('server: ').init(function (args, cb) {
    try {
      sandbox = {
        logging: logging,
        global: global,
        fs: fs,
        path: path,
        moment: moment,
        request: request,
        schedule: schedule,
        debug: debug,
        app: app,
        server: server,
        engine: app.engine
      };
      vm.createContext(sandbox);
      settings.multiline = false;
      settings.temp = '';
      cb();
    } catch (e) {
      debug(e);
      _this.log(e);
      cb();
    }
  }).action(function (command, cb) {
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
          var _res = vm.runInContext(settings.temp, sandbox);
          settings.temp = '';
          this.log('Executing command');
          this.log(_res);
        } else {
          settings.temp += command;
        }
        cb();
        return;
      }
      var res = vm.runInContext(command, sandbox);
      // const log = (typeof res === 'string') ? String(res).white : res;
      this.log(res);
      cb(res);
    } catch (e) {
      this.log(e);
      cb(e);
    }
  });

  server.mode('debug', 'Enters REPL mode in the server.').delimiter('debug: ').init(function (args, cb) {
    cb();
  }).action(function (command, cb) {
    this.log('');
    cb();
  });
};
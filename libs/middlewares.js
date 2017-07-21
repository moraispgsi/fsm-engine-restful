import Vantage from 'vantage';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import logger from './logger.js';
import Engine from 'fsm-engine';

module.exports = app => {
  app.set('port', process.env.PORT || 3001);
  app.set('json spaces', 4);
  app.use(morgan('common', {
    stream: {
      write: (message) => {
        logger.info(message);
      },
    },
  }));
  app.use(helmet());
  app.use(cors({
    origin: ['http://localhost:3001'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(bodyParser.json());
  app.use(app.auth.initialize());
  app.use((req, res, next) => {
    delete req.body.id;
    next();
  });
  app.use(express.static('public'));
  app.vantage = new Vantage();
  app.engine = new Engine(process.env.DISPATCHER_URL, process.env.DISPATCHER_TOKEN,
    process.env.REPOSITORY_PATH || path.join(__dirname, '../repository'), null);
};

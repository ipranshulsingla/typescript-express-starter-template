import morgan from 'morgan';
import { logger, stream } from './utils/logger';
import db from './database';
import { connect } from 'mongoose';
import hpp from 'hpp';
import compression from 'compression';
import helmet from 'helmet';
import Route from './interfaces/route.interface';
import express from 'express';
import errorMiddleware from './middlewares/error.middleware';

class App {
  private app: express.Application;
  private port: string | number;
  private env: string;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT;
    this.env = process.env.NODE_ENV;

    this.connectDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`🚀 App listening on the port ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach(route => {
      this.app.use(route.path, route.router);
    });
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(morgan('combined', { stream }));
    } else if (this.env === 'development') {
      this.app.use(morgan('dev', { stream }));
    }
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
  }

  private connectDatabase() {
    connect(db.url, db.options)
      .then(() => logger.info('🟢 The database is connected.'))
      .catch((error: Error) => {
        logger.error(`🔴 Unable to connect to the database: ${error}.`);
      });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;

import * as express from 'express';
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as cors from 'cors'
import router from './routes/routers'

class Server {

  public app: express.Application;

  constructor() {

    this.app = express()
    this.middleware()
    this.routes()
  }

  private middleware(): void {

    const app = this.app;

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    this.app.use(cors());
  }

  private routes(): void {

    this.app.use('/api/', router);
  }
}

export default new Server().app

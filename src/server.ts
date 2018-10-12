import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as morgan from 'morgan'
import * as cors from 'cors'
import * as passport from 'passport'
import router from './routes/routers'
import {Sequelize} from 'sequelize-typescript'
import responseService from "./services/responseService"
import APIError from './util/apiError'
import config from './config/config'

class Server {

  public app: express.Application;
  private sequelize: Sequelize

  constructor() {

    this.app = express()
    this.middleware()
    this.routes()
    this.connectDatabase()
  }

  private middleware(): void {

    const app = this.app;

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json());
    app.use(morgan('dev'));
    app.use(passport.initialize())
    this.app.use(cors());
  }

  private routes(): void {

    this.app.use('/api/', router);

    //Handle Error
    this.app.use((err: APIError, req, res, next) => {
      res.status(err.status).json(responseService.failureResponse(err))
    });
  }

  connectDatabase() {
     this.sequelize = new Sequelize(config.db)
  }

  getSequelize() {
    return this.sequelize
  }
}
export const server = new Server()
export default server.app
export const sequelize = server.getSequelize()

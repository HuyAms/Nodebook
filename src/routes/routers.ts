import * as express from 'express'
import UserController from '../controllers/userController'
import AuthController from '../controllers/authController'

class Router {

  router: express.Router
  userController: UserController
  authController: AuthController

  constructor() {

    this.router = express.Router()
    this.userController = new UserController()
    this.authController = new AuthController()
    this.setUpRouter()
  }

  private setUpRouter() {

    const router = this.router

    router.post('/login', this.authController.login)

    router.post('/user', this.userController.post)
  }
}

export default new Router().router

import * as express from 'express'
import UserController from '../controllers/userController'
import AuthController from '../controllers/authController'
import AuthService from '../services/authService'
import {Permission} from "../services/permission";

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

    const checkUserWithPermission = (permissions: [Permission]) => {

      return [AuthService.verifyJwt(), AuthService.checkPermission(permissions)]
    }

    const writeUser = checkUserWithPermission([Permission.WriteUser])
    const readUser = checkUserWithPermission([Permission.ReadUser])

    //AUTH
    router.post('/login', this.authController.login)

    //USER
    router.post('/user', this.userController.post)
    router.get('/user', readUser, this.userController.get)
    router.delete('/user/:id', writeUser, this.userController.delete)
  }
}

export default new Router().router

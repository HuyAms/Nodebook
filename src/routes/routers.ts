import * as express from 'express'
import UserController from '../controllers/userController'

class Router {

  router: express.Router
  userController: UserController

  constructor() {

    this.router = express.Router()
    this.userController = new UserController()
    this.setUpRouter()
  }

  private setUpRouter() {

    const router = this.router

    router.post('/user', this.userController.post)

    router.get('/user', (req, res) => {
      res.json({"user":"testUser"})
    })
  }
}

export default new Router().router

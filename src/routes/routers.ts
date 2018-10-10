import * as express from 'express'

class Router {

  router: express.Router

  constructor() {

    this.router = express.Router()
    this.setUpRouter()
  }

  private setUpRouter() {

    const router = this.router

    router.get('/user', (req, res) => {
      res.json({"user":"testUser"})
    })
  }
}

export default new Router().router

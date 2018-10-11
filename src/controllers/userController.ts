import UserService from '../services/userService'
import ResponseService from '../services/responseService'

export default class UserController {

  public post(req, res, next) {

    const object = req.body

    UserService.insertUser(object)
      .then(result => res.send(ResponseService.successResponse(result)))
      .catch(next)
  }

}

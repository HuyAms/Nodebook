import userService from '../services/userService'
import responseService from '../services/responseService'

export default class UserController {

  public post(req, res, next) {

    const object = req.body

    userService.insertUser(object)
      .then(result => res.send(responseService.successResponse(result)))
      .catch(next)
  }

}

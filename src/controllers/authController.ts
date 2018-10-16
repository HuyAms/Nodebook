import AuthService from '../services/authService'
import ResponseService from '../services/responseService'

export default class AuthController {

  public login(req, res, next) {

    AuthService.login(req, res, next).then(result => res.send(ResponseService.successResponse(result)))
      .catch(next)
  }
}

import App from '../../src/server'
import chai = require('chai')
import chaiHttp = require('chai-http')
import AuthService from '../../src/services/authService'

chai.use(chaiHttp)

export function createTokenFromUser(user): string {

  if(!user) {
    throw Error('User cannot be null')
  }

  return AuthService.createToken(user)
}


export function agent() {

  return chai.request.agent(App)
}


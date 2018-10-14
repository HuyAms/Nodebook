import * as assert from 'assert'
import App from '../../src/server'
import chai = require('chai')
import chaiHttp = require('chai-http')

chai.use(chaiHttp)

export function agent() {

  return chai.request.agent(App)
}

export function request() {

  return chai.request(App)
}

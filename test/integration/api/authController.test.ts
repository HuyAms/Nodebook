import * as chai from 'chai'
import chaiHttp = require('chai-http')
import {createMockUser} from '../../util/mock'
import * as dbUtil from "../../util/db";
import {agent} from "../../util/common";
const httpStatus = require('http-status');

const expect = chai.expect

chai.use(chaiHttp)

const chaiAgent = agent()

describe('[LOGIN API]', () => {

  let testUser
  let testPassword

  beforeEach(function() {

    const mockUser = createMockUser()
    testPassword = mockUser.password

    return dbUtil.addUser(mockUser)
      .then(user => {testUser = user})
  })

  afterEach(function () {
    dbUtil.clearDB()
  })

  describe('POST /api/login', () => {

    it('Send username and password. Expect return 200 with token', () => {

      const loginParams = {
        username: testUser.username,
        password: testPassword
      }

      return chaiAgent.post('/api/login')
        .send(loginParams)
        .then(res => {
          expect(res).to.have.status(httpStatus.OK)

          const {token} = res.body.data

          expect(token).to.be.a('string')
        })
    })

    it('Send incorrect username. Expect return 401 with error message', () => {

      const mockUser = createMockUser()

      const loginParams = {
        username: testUser.username,
        password: mockUser.password
      }

      return chaiAgent.post('/api/login')
        .send(loginParams)
        .then(res => {
          expect(res).to.have.status(httpStatus.UNAUTHORIZED)

          const {message} = res.body

          expect(message).to.be.a('string')
        })
    })

    it('Send incorrect password. Expect return 401 with error message', () => {

      const mockUser = createMockUser()

      const loginParams = {
        username: mockUser.username,
        password: testUser.password
      }

      return chaiAgent.post('/api/login')
        .send(loginParams)
        .then(res => {
          expect(res).to.have.status(httpStatus.UNAUTHORIZED)

          const {message} = res.body

          expect(message).to.be.a('string')
        })
    })
  })
})



import * as chai from 'chai'
import chaiHttp = require('chai-http')
import * as _ from 'lodash'
import {createUser} from '../../util/mock'
import UserService from '../../../src/services/userService'
import * as dbUtil from "../../util/db";
import {UserRole} from "../../../src/models/user"
import {agent} from "../../util/common";
const httpStatus = require('http-status');

const expect = chai.expect

chai.use(chaiHttp)

const chaiAgent = agent()

describe('[/login]', () => {

  let testUser
  let testPassword

  beforeEach(function() {

    const mockUser = createUser()
    testPassword = mockUser.password

    return dbUtil.addUser(mockUser)
      .then(user => {testUser = user})
  })

  afterEach(function () {
    dbUtil.clearDB()
  })

  describe('[/api/login]', () => {

    it('should return token when login user with username and password', () => {

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
  })
})



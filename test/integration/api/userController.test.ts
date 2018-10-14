import * as chai from 'chai'
import chaiHttp = require('chai-http')
import {createMockUser} from '../../util/mock'
import * as dbUtil from "../../util/db";
import {agent} from "../../util/common";
import {UserRole} from "../../../src/models/user";
import * as _ from "lodash";
import UserService from "../../../src/services/userService";
const httpStatus = require('http-status');

const expect = chai.expect

chai.use(chaiHttp)

const chaiAgent = agent()

const requiredFields = ['username', 'firstName', 'lastName', 'email', 'role']

describe('[USER API]', () => {

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

  describe('POST /api/user', () => {

    it('Send user fields. Expect return 200 with token', () => {

      const mockUser = createMockUser()

      return chaiAgent.post('/api/user')
        .send(mockUser)
        .then(res => {
          expect(res).to.have.status(httpStatus.OK)

          const {token} = res.body.data

          expect(token).to.be.a('string')
        })
    })

    function testMissingFields(missingField) {

      it('Send user with missing required fields  ' + missingField + '. Expect return status 400 with error message', () => {

        let mockUser = createMockUser(UserRole.User)
        mockUser = _.omit(mockUser, missingField)

        return chaiAgent.post('/api/user')
          .send(mockUser)
          .then(res => {
            expect(res).to.have.status(httpStatus.BAD_REQUEST)

            const {message} = res.body

            expect(message).to.be.a('string')
          })

        return UserService.insertUser(mockUser)
          .then(result => expect(result).not.to.be.exist)
          .catch(error => expect(error.status).to.be.equal(httpStatus.BAD_REQUEST))
      })
    }

    requiredFields.forEach(testMissingFields)
  })
})



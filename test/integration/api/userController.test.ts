import * as chai from 'chai'
import {createMockUser} from '../../util/mock'
import * as dbUtil from "../../util/db";
import {agent, createTokenFromUser} from "../../util/common";
import {UserRole} from "../../../src/models/user";
import * as _ from "lodash";
import UserService from "../../../src/services/userService";
import chaiHttp = require('chai-http');
import * as Promise from 'bluebird'

const httpStatus = require('http-status');

const expect = chai.expect

chai.use(chaiHttp)

const chaiAgent = agent()

const requiredFields = ['username', 'firstName', 'lastName', 'email', 'role']

describe('[USER API]', () => {

  let testUser
  let testPassword
  let testToken

  let testAdminUser
  let testAdminPassword
  let testAdminToken

  describe('POST /api/user', () => {

    it('Expect 200 with token. Create user with all required fields', () => {

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

      it('Expect 400 with error message. Create user with missing required fields  ' + missingField, () => {

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

  describe('DELETE /api/user/:id', () => {

    beforeEach(function() {

      const mockUser = createMockUser(UserRole.User)
      testPassword = mockUser.password

      const mockAdminUser  = createMockUser(UserRole.Admin)
      testAdminPassword = mockAdminUser.password

      return Promise.all([dbUtil.addUser(mockUser), dbUtil.addUser(mockAdminUser)])
        .then(users => {

          testUser = users[0]
          testToken = createTokenFromUser(testUser.toJSON())

          testAdminUser = users[1]
          testAdminToken = createTokenFromUser(testAdminUser.toJSON())
        })
        .catch(error => {
          console.log(error)
        })
    })

    afterEach(function () {
      dbUtil.clearDB()
    })

    it('Expect 200. Admin role deletes existing user', () => {

      return chaiAgent.del('/api/user/' + testUser.id)
        .set('Authorization', testAdminToken)
        .then(res => {
          expect(res).to.have.status(httpStatus.OK)
        })
    })

    it('Expect 404. Admin role delete non-existing user', () => {

      const nonExistingUserId = 1000

      return chaiAgent.del('/api/user/' + nonExistingUserId)
        .set('Authorization', testAdminToken)
        .then(res => {
          expect(res).to.have.status(httpStatus.NOT_FOUND)
        })
    })

    it('Expect 403. User role deletes user', () => {

      return chaiAgent.del('/api/user/' + testUser.id)
        .set('Authorization', testToken)
        .then(res => {
          expect(res).to.have.status(httpStatus.FORBIDDEN)
        })
    })

    it('Expect 401. Delete user without token', () => {

      return chaiAgent.del('/api/user/' + testUser.id)
        .then(res => {
          expect(res).to.have.status(httpStatus.UNAUTHORIZED)
        })
    })
  })
})



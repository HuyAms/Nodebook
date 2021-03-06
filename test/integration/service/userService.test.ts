import * as chai from 'chai'
import * as _ from 'lodash'
import {createMockUser} from '../../util/mock'
import UserService from '../../../src/services/userService'
import * as dbUtil from "../../util/db";
import {UserRole} from "../../../src/models/user";

const httpStatus = require('http-status');

const expect = chai.expect

const requiredFields = ['username', 'firstName', 'lastName', 'email', 'role']

describe('[USER SERVICE]', () => {

  before(done => {
    dbUtil.clearDB().finally(done)
  })

  describe('[CREATE USER]', () => {

    it('should create user with all required fields', () => {

      const mockUser = createMockUser()

      return UserService.insertUser(mockUser)
        .then(result => {
          expect(result.token).to.be.a('string')
        })

    })

    function testMissingFields(missingField) {

      it('show throw error due to missing field ' + missingField, () => {

        let mockUser = createMockUser(UserRole.User)
        mockUser = _.omit(mockUser, missingField)

        return UserService.insertUser(mockUser)
          .then(result => expect(result).not.to.be.exist)
          .catch(error => expect(error.status).to.be.equal(httpStatus.BAD_REQUEST))
      })
    }

    requiredFields.forEach(testMissingFields)
  })

})

import * as chai from 'chai'
import * as _ from 'lodash'
import {createUser} from '../../util/mock'
import UserService from '../../../src/services/userService'
import * as dbUtil from "../../util/db";
import {UserRole} from "../../../src/models/user";

const httpStatus = require('http-status');

const expect = chai.expect

describe('userService', () => {

  before(done => {
    dbUtil.clearDB().finally(done)
  })

  describe('createUser', () => {

    it('should create user with all required fields', () => {

      const mockUser = createUser()

      return UserService.insertUser(mockUser)
        .then(result => {
          expect(result.token).to.be.a('string')
        })

    })

    function testMissingFields(missingField) {

      it('show throw error due to missing field ' + missingField, () => {

        let mockUser = createUser(UserRole.User)
        mockUser = _.omit(mockUser, missingField)

        return UserService.insertUser(mockUser)
          .then(result => expect(result).not.to.be.exist)
          .catch(error => expect(error.status).to.be.equal(httpStatus.BAD_REQUEST))
      })
    }

    ['username', 'firstName', 'lastName', 'email', 'role'].forEach(testMissingFields)
  })

})

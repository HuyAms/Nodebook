import * as chai from 'chai'
import * as dbUtil from "../util/db";
import {createMockUser} from "../util/mock";
import * as _ from 'lodash'
import {UserRole} from "../../src/models/user";

const expect = chai.expect

const omitFields = ['id', 'password', 'createdAt', 'updatedAt']
const requiredFields = ['username', 'firstName', 'lastName', 'email', 'role']
const uniqueFields = ['username', 'email']

describe('[USER MODEL]', () => {

  before(done => {
    dbUtil.clearDB().finally(done)
  })

  describe('[CREATE]', () => {

    it('should create user with valid data', () => {

      const mockUser = createMockUser(UserRole.User)

      return dbUtil.addUser(mockUser)
        .then(user => {
          expect(user).to.be.exist
          expect(user.authenticate(mockUser.password)).to.be.true
          expect(_.omit(user.toJSON(), omitFields)).to.deep.equal(_.omit(mockUser, 'password'))
        })
    })

    function testAddMissingFields(missingField) {

      it('show throw error due to creating user with missing field ' + missingField, () => {

        let mockUser = createMockUser(UserRole.User)
        mockUser = _.omit(mockUser, missingField)

        return dbUtil.addUser(mockUser)
          .then(user => expect(user).not.to.be.exist)
          .catch(error => expect(error).to.be.exist)
      })
    }

    requiredFields.forEach(testAddMissingFields)


    function testAddUniqueFields(uniqueField) {

      it('show throw error due to violating unique field ' + uniqueField, () => {

        let mockUser = createMockUser(UserRole.User)

        return dbUtil.addUser(mockUser)
          .then(user => {

            const anotherUser = {...user}

            return dbUtil.addUser(anotherUser)
              .then(user => expect(user).not.to.be.exist)
              .catch(error => expect(error).to.be.exist)
          })
      })
    }

    uniqueFields.forEach(testAddUniqueFields)
  })

  describe('[UPDATE]', () => {

    let user

    beforeEach(() => {

      const mockUser = createMockUser()

      return dbUtil.addUser(mockUser)
        .then(instance => user = instance)
    })

    afterEach(() => {
      return dbUtil.clearDB()
    })

    it('should update user with valid data', () => {

      const mockUser = createMockUser()

      user = _.merge(user, mockUser)

      user.save()
        .then(instance => {
          expect(instance).to.be.exist
          expect(instance.authenticate(mockUser.password)).to.be.true
          expect(_.omit(instance.toJSON(), omitFields)).to.deep.equal(_.omit(mockUser, 'password'))
        })
        .catch(error => expect(error).not.to.be.exist)
    })

    function testUpdateMissingFields(missingField) {

      it('show throw error due to updating user with missing field ' + missingField, () => {

       user[missingField] = undefined

        user.save()
          .then(instance => expect(instance).not.to.be.exist)
          .catch(error => expect(error).to.be.exist)
      })
    }

    requiredFields.forEach(testUpdateMissingFields)


    function testUpdateUniqueField(uniqueField) {

      it('show throw error due to violating unique field ' + uniqueField, () => {

        let mockUser = createMockUser(UserRole.User)
        user[uniqueField] = mockUser[uniqueField]

        user.save()
          .then(instance => expect(instance).not.to.be.exist)
          .catch(error => expect(error).to.be.exist)
      })
    }

    uniqueFields.forEach(testUpdateUniqueField)

  })

})



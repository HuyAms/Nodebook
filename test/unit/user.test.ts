import * as chai from 'chai'
import * as dbUtil from "../util/db";
import {createUser} from "../util/mock";
import * as _ from 'lodash'
import {UserRole} from "../../src/models/user";

const expect = chai.expect

const omitFields = ['password', 'createdAt', 'updatedAt']

describe('user', () => {

  before(done => {
    dbUtil.clearDB().finally(done)
  })

  describe('create', () => {

    it('Should success with valid data', () => {

      const mockUser = createUser(UserRole.User)

      return dbUtil.addUser(mockUser)
        .then(user => {
          expect(user).to.be.exist
          expect(_.omit(mockUser, omitFields)).to.deep.equal(_.omit(mockUser, 'password'))
        })
    })
  })

})

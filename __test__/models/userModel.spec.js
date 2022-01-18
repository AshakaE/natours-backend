/**
 * @jest-environment node
 */

const User = require('../../models/userModel')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

describe('User model', () => {
  beforeAll(async () => {
    await mongoose.connect(
      'mongodb+srv://ashaka:uaDHiRMdckf0o0SN@cluster0.cy01s.mongodb.net/natours_test?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
  })

  it('should hash the user password before save', async () => {
    const user = {
      name: 'Laura',
      email: 'test@email.com',
      password: 'test1234',
      passwordConfirm: 'test1234',
    }
    const createUser = await User.create(user)
    expect(bcrypt.compareSync(user.password, createUser.password)).toBe(true)

    afterAll(async () => {
      await mongoose.connection.close()
    })
  })
})

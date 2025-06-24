const bcrypt = require('bcryptjs')
const { User } = require('../models')
const userServices = {
  // signUp: async req => {
  //   if (req.body.password !== req.body.passwordCheck) {
  //     throw new Error('Passwords do not match!')
  //   }
  //   const user = await User.findOne({
  //     where: {
  //       email: req.body.email
  //     }
  //   })
  //   if (user) throw new Error('Email already exists!')
  //   const hash = await bcrypt.hash(req.body.password, 10)
  //   const newUser = await User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: hash
  //   })
  //   return { newUser }
  // }
  signUp: async (req, cb) => {
    try {
      if (req.body.password !== req.body.passwordCheck) {
        throw new Error('Passwords do not match!')
      }
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      })
      if (user) throw new Error('Email already exists!')
      const hash = await bcrypt.hash(req.body.password, 10)
      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      })
      delete newUser.password
      return cb(null, { newUser })
    } catch (err) {
      cb(err)
    }
  }
}
module.exports = userServices

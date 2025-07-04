const jwt = require('jsonwebtoken')
const userServices = require('../../services/user-services')

const userController = {
  signIn: (req, res, next) => {
    try {
      const userData = req.user.toJSON()
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: '30d'
      })
      res.json({ status: 'success', data: { token, user: userData } })
    } catch (err) {
      next(err)
    }
  },
  // signUp: async (req, res, next) => {
  //   try {
  //     const user = await userServices.signUp(req)
  //     return res.json({ status: 'success', data: user })
  //   } catch (err) {
  //     next(err)
  //   }
  // }
  signUp: (req, res, next) => {
    userServices.signUp(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  }
}

module.exports = userController

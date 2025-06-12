const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db
const { localFileHandler } = require('../helpers/file-helpers')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: async (req, res, next) => {
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
      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      })
      req.flash('success_messages', '成功註冊帳號!')
      return res.redirect('/signin')
    } catch (err) {
      next(err)
    }
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_messages', '成功登入!')
    res.redirect('/restaurants')
  },
  logout: (req, res) => {
    req.flash('success_messages', '登出成功!')
    req.logout()
    res.redirect('/signin')
  },
  getUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, { raw: true })
      if (!user) throw new Error("User didn't exist!")
      return res.render('users/profile', { user })
    } catch (err) {
      next(err)
    }
  },
  editUser: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, { raw: true })
      if (!user) throw new Error("User didn't exist!")
      return res.render('users/edit', { user })
    } catch (err) {
      next(err)
    }
  },
  putUser: async (req, res, next) => {
    try {
      if (Number(req.params.id) !== Number(req.user.id)) return res.redirect(`/users/${req.params.id}`)
      const { name } = req.body
      const { file } = req

      const [user, filePath] = await Promise.all([
        User.findByPk(req.params.id),
        localFileHandler(file)
      ])
      if (!user) throw new Error("User didn't exist!")

      await user.update({
        name,
        image: filePath || user.image
      })
      req.flash('success_messages', '使用者資料編輯成功')
      return res.redirect(`/users/${req.params.id}`)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController

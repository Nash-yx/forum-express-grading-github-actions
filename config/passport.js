const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const { User, Restaurant } = require('../models')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      const user = await User.findOne({ where: { email } })
      if (!user) return done(null, false, req.flash('error_messages', '帳號或密碼輸入錯誤!'))
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return done(null, false, { type: 'error_messages', message: '帳號或密碼輸入錯誤!' })
      return done(null, user)
    })
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, {
      include: [
        { model: Restaurant, as: 'FavoritedRestaurants' }, // or 'FavoritedRestaurants'
        { model: Restaurant, as: 'LikedRestaurants' }
      ]
    })
    // console.log(user.toJSON())
    return done(null, user.toJSON())
  } catch (err) {
    done(err)
  }
})

module.exports = passport

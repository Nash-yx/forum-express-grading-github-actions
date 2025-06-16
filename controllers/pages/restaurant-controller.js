const { Restaurant, Category, Comment, User } = require('../../models')
const restaurantServices = require('../../services/restaurant-services')

const restaurantController = {
  getRestaurants: (req, res, next) => {
    restaurantServices.getRestaurants(req, (err, data) => err ? next(err) : res.render('restaurants', data))
  },
  getRestaurant: async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, {
        include: [
          Category,
          { model: Comment, include: User },
          { model: User, as: 'FavoritedUsers' },
          { model: User, as: 'LikedUsers' }
        ],
        order: [[Comment, 'createdAt', 'DESC']]
      })
      if (!restaurant) throw new Error("Restaurant didn't exist!")
      const result = await restaurant.increment('viewCount')
      const isFavorited = restaurant.FavoritedUsers.some(
        f => f.id === req.user.id
      ) // some => 找到一個符合條件的項目，就會回傳true
      const isLiked = restaurant.LikedUsers.some(
        user => user.id === req.user.id
      )
      return res.render('restaurant', {
        restaurant: result.toJSON(),
        isFavorited,
        isLiked
      })
    } catch (err) {
      next(err)
    }
  },
  getDashboard: async (req, res, next) => {
    try {
      const restaurant = await Restaurant.findByPk(req.params.id, {
        include: [Category, { model: Comment, include: User }]
      })
      if (!restaurant) throw new Error("Restaurant didn't exist!")
      return res.render('dashboard', { restaurant: restaurant.toJSON() })
    } catch (err) {
      next(err)
    }
  },
  getFeeds: async (req, res, next) => {
    try {
      const [restaurants, comments] = await Promise.all([
        Restaurant.findAll({
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [Category],
          raw: true,
          nest: true
        }),
        Comment.findAll({
          limit: 10,
          order: [['createdAt', 'DESC']],
          include: [User, Restaurant],
          raw: true,
          nest: true
        })
      ])
      return res.render('feeds', { restaurants, comments })
    } catch (err) {
      next(err)
    }
  },
  getTopRestaurants: async (req, res, next) => {
    try {
      const restaurants = await Restaurant.findAll({
        include: [{ model: User, as: 'FavoritedUsers' }]
      })
      let result = restaurants.map(rest => {
        return {
          ...rest.dataValues,
          description: rest.dataValues.description.substring(0, 50),
          favoritedCount: rest.dataValues.FavoritedUsers.length,
          isFavorited:
            req.user &&
            req.user.FavoritedRestaurants.map(d => d.id).includes(rest.id)
        }
      })
      result.sort((a, b) => b.favoritedCount - a.favoritedCount)
      result = result.slice(0, 10)
      return res.render('top-restaurants', { restaurants: result })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = restaurantController

// [{user1}, {user2}, {user3}]
// [1,2,3]

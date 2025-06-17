const { Restaurant, Category } = require('../models')

const adminServices = {
  getRestaurants: async cb => {
    try {
      const restaurants = await Restaurant.findAll({
        raw: true,
        nest: true,
        include: [Category]
      })
      return cb(null, { restaurants })
    } catch (err) {
      cb(err)
    }
  },
  // getRestaurants: async () => {
  //   const restaurants = await Restaurant.findAll({
  //     raw: true,
  //     nest: true,
  //     include: [Category]
  //   })
  //   return { restaurants }
  // },
  // deleteRestaurant: async (req, cb) => {
  //   try {
  //     const restaurant = await Restaurant.findByPk(req.params.id)
  //     if (!restaurant) throw new Error("Restaurant didn't exist!")

  //     const deletedRestaurant = await restaurant.destroy()
  //     return cb(null, { restaurant: deletedRestaurant })
  //   } catch (err) {
  //     cb(err)
  //   }
  // }
  deleteRestaurant: async req => {
    const restaurant = await Restaurant.findByPk(req.params.id)
    if (!restaurant) throw new Error("Restaurant didn't exist!")

    const deletedRestaurant = await restaurant.destroy()
    return { restaurant: deletedRestaurant }
  }
}

module.exports = adminServices

const { Restaurant, Category } = require('../models')

const adminServices = {
  // getRestaurants: async cb => {
  //   try {
  //     const restaurants = await Restaurant.findAll({
  //       raw: true,
  //       nest: true,
  //       include: [Category]
  //     })
  //     return cb(null, { restaurants })
  //   } catch (err) {
  //     cb(err)
  //   }
  // }
  getRestaurants: async () => {
    const restaurants = await Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
    return { restaurants }
  }
}

module.exports = adminServices

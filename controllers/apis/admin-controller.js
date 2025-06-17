const adminServices = require('../../services/admin-services')

const adminController = {
  // getRestaurants: async (req, res, next) => {
  //   adminServices.getRestaurants((err, data) => err ? next(err) : res.json(data))
  // }
  getRestaurants: async (req, res, next) => {
    try {
      const data = await adminServices.getRestaurants()
      return res.json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController

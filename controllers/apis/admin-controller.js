const adminServices = require('../../services/admin-services')

const adminController = {
  getRestaurants: (req, res, next) => {
    adminServices.getRestaurants((err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  // getRestaurants: async (req, res, next) => {
  //   try {
  //     const data = await adminServices.getRestaurants()
  //     return res.json(data)
  //   } catch (err) {
  //     next(err)
  //   }
  // },
  // deleteRestaurant: (req, res, next) => {
  //   adminServices.deleteRestaurant(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  // }
  deleteRestaurant: async (req, res, next) => {
    try {
      const deletedData = await adminServices.deleteRestaurant(req)
      return res.json({ status: 'success', deletedData })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController

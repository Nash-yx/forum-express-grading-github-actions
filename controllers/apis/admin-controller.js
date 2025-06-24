const adminServices = require('../../services/admin-services')

const adminController = {
  getRestaurants: (req, res, next) => {
    adminServices.getRestaurants((err, data) =>
      err ? next(err) : res.json({ status: 'success', data })
    )
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
  },
  postRestaurant: (req, res, next) => {
    adminServices.postRestaurant(req, (err, data) =>
      err ? next(err) : res.json({ status: 'success', data })
    )
  },
  // postRestaurant: async (req, res, next) => {
  //   try {
  //     const data = await adminServices.postRestaurant(req)
  //     return res.json({ status: 'success', data })
  //   } catch (err) {
  //     next(err)
  //   }
  // }
  putRestaurant: async (req, res, next) => {
    try {
      const data = await adminServices.putRestaurant(req)
      // console.log(data.toJSON())
      return res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  },
  getUsers: async (req, res, next) => {
    try {
      const users = await adminServices.getUsers()
      return res.json({ data: users })
    } catch (err) {
      next(err)
    }
  },
  patchUser: async (req, res, next) => {
    try {
      const data = await adminServices.patchUser(req)
      return res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController

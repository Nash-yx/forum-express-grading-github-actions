const { Restaurant, Category } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')

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
  },
  postRestaurant: async (req, cb) => {
    try {
      const { name, tel, address, openingHours, description, categoryId } = req.body
      if (!name) throw new Error('Restaurant name is required!')

      const { file } = req
      const filePath = await localFileHandler(file)

      const newRestaurant = await Restaurant.create({
        name,
        tel,
        address,
        openingHours,
        description,
        image: filePath || null,
        categoryId
      })
      return cb(null, { restaurant: newRestaurant })
    } catch (err) {
      cb(err)
    }
  }
  // postRestaurant: async req => {
  //   const { name, tel, address, openingHours, description, categoryId } = req.body
  //   if (!name) throw new Error('Restaurant name is required!')

  //   const { file } = req
  //   const filePath = await localFileHandler(file)

  //   const data = await Restaurant.create({
  //     name,
  //     tel,
  //     address,
  //     openingHours,
  //     description,
  //     image: filePath || null,
  //     categoryId
  //   })
  //   req.flash('success_messages', 'restaurant was successfully created')
  //   return { data }
  // }
}

module.exports = adminServices

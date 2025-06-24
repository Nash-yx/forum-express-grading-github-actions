const { Restaurant, Category, User } = require('../models')
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
      const { name, tel, address, openingHours, description, categoryId } =
        req.body
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
  },
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
  putRestaurant: async req => {
    const { name, tel, address, openingHours, description, categoryId } =
      req.body
    if (!name) throw new Error('Restaurant name is required!')

    const { file } = req
    const filePath = await localFileHandler(file)

    const restaurant = await Restaurant.findByPk(req.params.id)
    if (!restaurant) throw new Error("Restaurant didn't exist!")

    const data = await restaurant.update({
      name,
      tel,
      address,
      openingHours,
      description,
      image: filePath || restaurant.image,
      categoryId
    })
    return data
  },
  getUsers: async () => {
    const users = await User.findAll({ raw: true })
    return { users }
  },
  patchUser: async req => {
    const user = await User.findByPk(req.params.id)
    if (!user) throw new Error("User didn't exist!")
    if (user.email === 'root@example.com') { throw new Error('禁止變更 root 權限') }
    const data = await user.update({ isAdmin: !user.isAdmin })
    return data
  },
  getCategories: async req => {
    const [categories, category] = await Promise.all([
      Category.findAll({ raw: true }),
      req.params.id ? Category.findByPk(req.params.id, { raw: true }) : null
    ])
    return { categories, category }
  },
  postCategories: async req => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')

    const category = await Category.create({ name })
    return category
  },
  putCategory: async req => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')

    const category = await Category.findByPk(req.params.id)
    if (!category) throw new Error("Category didn't exist!")

    const data = await category.update({ name })
    return data
  },
  deleteCategory: async req => {
    const category = await Category.findByPk(req.params.id)
    if (!category) throw new Error("Category didn't exist!")
    const deletedData = await category.destroy()
    return deletedData
  }
}

module.exports = adminServices

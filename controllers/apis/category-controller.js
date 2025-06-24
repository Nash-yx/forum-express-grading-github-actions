const adminServices = require('../../services/admin-services')
const categoryController = {
  getCategories: async (req, res, next) => {
    try {
      const { categories, category } = await adminServices.getCategories(req)
      if (category) return res.json({ data: { category } })
      return res.json({ data: { categories } })
    } catch (err) {
      next(err)
    }
  },
  postCategories: async (req, res, next) => {
    try {
      const data = await adminServices.postCategories(req)
      return res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  },
  putCategory: async (req, res, next) => {
    try {
      const data = await adminServices.putCategory(req)
      return res.json({ status: 'success', data })
    } catch (err) {
      next(err)
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const deletedData = await adminServices.deleteCategory(req)
      return res.json({ status: 'success', deletedData })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = categoryController

const express = require('express')
const router = express.Router()

const adminController = require('../../../controllers/apis/admin-controller')

const upload = require('../../../middleware/multer')

router.get('/restaurants', adminController.getRestaurants)
router.delete('/restaurants/:id', adminController.deleteRestaurant)
router.post('/restaurants', upload.single('image'), adminController.postRestaurant)

module.exports = router

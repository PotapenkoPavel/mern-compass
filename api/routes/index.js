const express = require('express')
const router = express.Router()
const ctrlLocations = require('../controllers/locations')
const ctrlReviews = require('../controllers/reviews')
const ctrlAuth = require('../controllers/auth')
const { check } = require('express-validator')
const validateJWT = require('../../middleware/validateJWT')

//locations
router.get('/locations', ctrlLocations.locationsList)
router.get('/locations-distance', ctrlLocations.locationsListByDistance)
router.post('/locations', ctrlLocations.locationsCreate)
router.get('/locations/:locationid', ctrlLocations.locationsReadOne)
router.put('/locations/:locationid', ctrlLocations.locationsUpdateOne)
router.delete('/locations/:locationid', ctrlLocations.locationsDeleteOne)

//reviews
router.post('/locations/:locationid/reviews', validateJWT, ctrlReviews.reviewsCreate)
router.get(
  '/locations/:locationid/reviews/:reviewid',
  ctrlReviews.reviewsReadOne
)
router.put(
  '/locations/:locationid/reviews/:reviewid',
  ctrlReviews.reviewsUpdateOne
)
router.delete(
  '/locations/:locationid/reviews/:reviewid',
  ctrlReviews.reviewsDeleteOne
)

//auth
router.post('/auth/register', validateFormData(), ctrlAuth.register)
router.post('/auth/login', validateFormData(), ctrlAuth.login)
router.get('/auth/validate', ctrlAuth.validate)

function validateFormData() {
  return [
    check('email', 'Некорректно введен email').normalizeEmail().isEmail(),
    check('password', 'Пароль должен содержать не менее 5 символов').isLength({ min: 5 })
  ]
}

module.exports = router

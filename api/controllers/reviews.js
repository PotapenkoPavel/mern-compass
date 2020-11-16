const Loc = require('../models/locations')

module.exports.reviewsReadOne = async (req, res) => {
  try {
    const locationid = req.params.locationid
    const reviewid = req.params.reviewid

    if (!locationid || !reviewid) {
      res.status(404).json({ message: `Not found, ${!locationid ? 'locationid' : 'reviewid'} required` })
      return
    }

    const location = await Loc.findById(locationid).select('name reviews')

    if (!location) {
      res.status(404).json({ message: 'Location was not found' })
      return
    }

    if (!location.reviews.length) {
      res.status(404).json({ message: 'This location has not reviews' })
      return
    }

    const review = location.reviews.id(reviewid)

    if (!review) {
      res.status(404).json({ message: 'Review was not found' })
      return
    }

    const response = {
      location: {
        name: location.name,
        id: locationid,
      },
      review,
    }

    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

module.exports.reviewsCreate = async (req, res) => {
  try {
    const { _id: author_id } = req.userData
    const locationid = req.params.locationid

    if (!locationid) {
      res.statu(404).json({ message: 'Not found, locationid required' })
      return
    }

    if (!req.body.author || !req.body.reviewText) {
      res.status(404).json({ message: 'Имя автора и текст сообщения не могут быть пустыми' })
      return
    }

    const review = {
      author_id,
      author: req.body.author,
      rating: parseInt(req.body.rating),
      reviewText: req.body.reviewText,
    }

    const location = await Loc.findById(locationid).select({ reviews: 1 })

    if (!location) {
      res.status(404).json({ message: 'Location was not found' })
      return
    }

    addReview()

    async function addReview() {
      //Проверка не оставлял ли для данной локации пользователь отзывы ранее
      let reviewsCount = location.reviews.find(
        (item) => item.author_id === author_id
      )
      if (reviewsCount) {
        res.status(404).json({ message: 'Вы можете оставить только один отзыв к каждому заведению' })
        return
      }

      location.reviews.push(review)

      await location.save()

      delete review.author_id
      res.status(201).json(review)

      updateAverageRating(location._id)
    }
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

module.exports.reviewsUpdateOne = async (req, res) => {
  try {
    const locationid = req.params.locationid
    const reviewid = req.params.reviewid

    if (!locationid || !reviewid) {
      res.status(404).json({ message: `Not found, ${!locationid ? 'locationid' : 'reviewid'} required` })
      return
    }

    const location = await Loc.findById(locationid).select('reviews')

    if (!location) {
      res.status(404).json({ message: 'Location was not found' })
      return
    }

    if (!location?.reviews.length) {
      res.status(404).json({ message: 'This location has not reviews' })
      return
    }

    updateReview()

    async function updateReview() {
      const data = req.body
      const review = location.reviews.id(reviewid)

      if (!review) {
        res.status(404).json({ message: 'Review was not found' })
        return
      }

      if (data.author) review.author = data.author
      if (data.reviewText) review.reviewText = data.reviewText
      if (data.rating) review.rating = parseInt(data.rating)

      await location.save()

      res.status(200).json(review)

      updateAverageRating(locationid)
    }
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

module.exports.reviewsDeleteOne = async (req, res) => {
  try {
    const locationid = req.params.locationid
    const reviewid = req.params.reviewid

    if (!locationid || !reviewid) {
      res.status(404).json({ message: `Not found, ${!locationid ? 'locationid' : 'reviewid'} required` })
      return
    }

    const location = await Loc.findById(locationid).select('name reviews')

    if (!location) {
      res.status(404).json({ message: 'Location was not found' })
      return
    }

    if (!location.reviews.length) {
      res.status(404).json({ message: 'This location has not reviews' })
      return
    }

    deleteReview()

    async function deleteReview() {
      let review = location.reviews.id(reviewid)

      if (!review) {
        res.status(404).json({ message: 'Review was not found' })
        return
      }

      review.remove()

      await location.save()

      res.status(204).json(null)

      updateAverageRating(locationid)
    }
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

const updateAverageRating = async (locationid) => {
  try {
    const location = await Loc.findById(locationid).select('rating reviews')
    setAverageRating(location)
  } catch (e) {
    console.log(e.message)
  }
}

const setAverageRating = async (location) => {
  try {
    const reviewCount = location.reviews.length
    const ratingTotal = location.reviews.reduce(
      (total, item) => total + +item.rating,
      0
    )
    const ratingAverage = +ratingTotal / (reviewCount || 1)

    location.rating = ratingAverage

    await location.save()
  } catch (e) {
    console.log(e.message)
  }
}

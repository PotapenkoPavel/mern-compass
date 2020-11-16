const { Schema, model } = require('mongoose')

const openingTimeSchema = new Schema(
  {
    days: {
      type: String,
      required: true,
    },
    opening:{
      type: String,
      required: true,
    },
    closing: {
      type: String,
      required: true,
    },
    closed: {
      type: Boolean,
      required: true,
    },
  },
  { _id: false }
)

const geoJSON = new Schema(
  {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      require: true,
    },
  },
  { _id: false }
)

const reviewSchema = new Schema({
  author_id: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    maxlength: 32
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  reviewText: {
    type: String,
    required: true,
    maxlength: 255
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const locationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  facilities: [String],
  loc: {
    type: geoJSON,
    index: '2dsphere',
  },
  openingTimes: [openingTimeSchema],
  reviews: [reviewSchema],
})

module.exports = model('Location', locationSchema)

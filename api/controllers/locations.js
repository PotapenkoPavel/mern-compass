const Loc = require('../models/locations')

module.exports.locationsList = async (req, res) => {
  try {
    const locations = await Loc.find().sort([['rating', -1]])
    res.status(200).json(locations)
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

module.exports.locationsListByDistance = async (req, res) => {
  try {
    const lng = parseFloat(req.query.lng),
      lat = parseFloat(req.query.lat),
      maxDist = parseInt(req.query.maxDistance)

    if (!lng || !lat) {
      res.status(400).json({ message: 'lng and lat params is required' })
      return
    }

    const locations = await Loc.aggregate()
      .near({
        near: { type: 'Point', coordinates: [lng, lat] },
        distanceField: 'distance',
        maxDistance: maxDist || 5000,
        spherical: true,
      })
      .project({ doc: 0, __v: 0 })
      .limit(10)

    res.status(200).json(locations)
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

module.exports.locationsCreate = async (req, res) => {
  try {
    let facilities = req.body.facilities ? req.body.facilities.split(',') : []

    let openingTimes = req.body.ot
    if (Array.isArray(openingTimes)) {
      openingTimes = openingTimes.map((item) => JSON.parse(item))
    } else if (typeof openingTimes === 'string') {
      openingTimes = [JSON.parse(openingTimes)]
    }

    const newLocation = {
      name: req.body.name,
      address: req.body.address,
      facilities,
      loc: {
        coordinates: [+req.body.lng, +req.body.lat],
      },
      openingTimes,
    }

    await Loc.create(newLocation)

    res.status(200).json(newLocation)
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

module.exports.locationsReadOne = async (req, res) => {
  try {
    const locationid = req.params.locationid

    if (!locationid) {
      res.status(404).json({ message: 'Not found, locationid required' })
      return
    }

    const location = await Loc.findById(req.params.locationid).select('-loc.type -__v')
    if (!location) {
      res.status(404).json({ message: 'Location was not found' })
      return
    }

    res.status(200).json(location)
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

module.exports.locationsUpdateOne = async (req, res) => {
  try {
    const locationid = req.params.locationid

    if (!locationid) {
      res.status(404).json({ message: 'Not found, locationid required' })
      return
    }

    const location = await Loc.findById(locationid).select('-reviews -rating -loc.type -__v')

    if (!location) {
      res.status(404).json({ message: 'Location was not found' })
      return
    }

    updateData()

    async function updateData() {
      const data = req.body
      if (data.name) location.name = data.name
      if (data.address) location.address = data.address
      if (data.coordinates)
        location.loc.coordinates = [parseFloat(data.lng), parseFloat(data.lat)]
      if (data.facilities) location.facilities = data.facilities.split(',')
      if (data.ot) {
        let openingTimes = data.ot

        if (Array.isArray(openingTimes)) {
          openingTimes = openingTimes.map((item) => JSON.parse(item))
        } else {
          openingTimes = [JSON.parse(ot)]
        }

        location.openingTimes = openingTimes
      }

      await location.save()

      res.status(200).json(location)
    }
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

module.exports.locationsDeleteOne = async (req, res) => {
  try {
    const locationid = req.params.locationid

    if (!locationid) {
      res.status(404).json({ message: 'Not found, locationid required' })
      return
    }

    await Loc.findByIdAndRemove(locationid)

    res.status(204).json(null)
  } catch (e) {
    res.status(500).json({ message: e.message || 'Что-то пошло не так' })
  }
}

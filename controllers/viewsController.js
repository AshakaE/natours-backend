const Tour = require('../models/tourModel')
const catchAsync = require('../utils/catchAsync')

exports.getOveriew = catchAsync(async (req, res) => {
  // Get tour data
  const tours = await Tour.find()
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  })
})

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
  })
}

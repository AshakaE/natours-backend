const path = require('path')
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cookieParser = require('cookie-parser')
const compression = require('compression')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const reviewRouter = require('./routes/reviewRoutes')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')
const bookingRouter = require('./routes/bookingRoutes')
const viewRouter = require('./routes/viewRoutes')

const app = express()

app.enable('trust proxy')

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

//GLOBAL MIDDLEWARE

//Serving static files
app.use(express.static(path.join(__dirname, 'public')))

// Secure HTTP headers
// content-security-policy
app.use(helmet())

//Development loggin
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
})

app.use('/api', limiter)

//Body parser, reading data from req.body
app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())

//Data sanitization against NOSQL query injection
app.use(mongoSanitize())

//Data sanitization against XSS
app.use(xss())

//Prevent data pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
)

app.use(compression())

//Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  // console.log(req.cookies)
  next()
})

// ROUTE HANDLERS

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// ROUTES

app.use('/', viewRouter)
app.use('/api/v1/users/', userRouter)
app.use('/api/v1/tours/', tourRouter)
app.use('/api/v1/reviews/', reviewRouter)
app.use('/api/v1/bookings/', bookingRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

module.exports = app

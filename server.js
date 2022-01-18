const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message)
  process.exit(1)
})

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection succesful!')
  })

const port = process.env.PORT || 5914
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received, Shutdown in progress...')
  server.close(() => {
    console.log('Process terminated!')
  })
})

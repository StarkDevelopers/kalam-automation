const mongoose = require('mongoose')

async function DatabaseConnection() {
  const url = process.env.MONGODB_URI
  console.log('Establish new connection with url', url)
  mongoose.Promise = global.Promise
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useFindAndModify', false)
  mongoose.set('useCreateIndex', true)
  mongoose.set('useUnifiedTopology', true)
  await mongoose.connect(url)
}

module.exports = DatabaseConnection

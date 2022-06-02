const mongoose = require("mongoose")
const Device = require('./device.model')
const Gateway = require('./gateway.model')
const connectToDb = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
const Disconnect = () => {
  return mongoose.disconnect()
}
const cleanDb = () => {
  return Promise.all([
    Gateway.deleteMany({}),
    Device.deleteMany({})]);
}
module.exports = {
  models: {
    "Gateway": Gateway,
    "Device": Device
  },
  dbHelper: { connectToDb, Disconnect, cleanDb }
}
const Schema = require('../models')
const Seeder = require('../seeder/mongoSeed')
const app = require('../app.js')
const supertest = require('supertest')
const Request = supertest(app);
const connectDB = () => {
  return Schema.dbHelper.connectToDb(process.env.MONGO_URL)
}
const seeder = () => {
  return Seeder.seeder()
}

const disconnect = () => {
  return Schema.dbHelper.Disconnect()
}
const initTest = () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnect();
  });
}
const serializeObj = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

module.exports = {
  initTest,
  disconnect,
  connectDB,
  seeder,
  serializeObj,
  Request,
  Device: Schema.models.Device,
  Gateway: Schema.models.Gateway
}
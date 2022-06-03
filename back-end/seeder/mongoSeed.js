const Device = require('../models/device.model')
const Gateway = require('../models/gateway.model')
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const initSeederWithNewConnection = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  await Promise.all([
    Gateway.deleteMany({}),
    Device.deleteMany({})
  ])
  await seeder()
  await mongoose.connection.close()
}
const seeder = async () => {
  const gateways = [
    {
      serial_number: 'S1234',
      name: "gateway1",
      ipV4: "210.250.12.2"
    },
    {
      serial_number: 'S5134',
      name: "gateway2",
      ipV4: "210.250.12.2"
    },
    {
      serial_number: 'S6222',
      name: "gateway3",
      ipV4: "210.250.12.2"
    },
    {
      serial_number: 'A7828',
      name: "gateway4",
      ipV4: "210.250.12.2"
    },
    {
      serial_number: 'X15322',
      name: "gateway5",
      ipV4: "210.250.12.2"
    },

  ]
  const gatewaysObjs = await Gateway.insertMany(gateways)
  const devices = [
    {
      uid: 123,
      vendor: "Musala",
      status: "online",
      gateway: gatewaysObjs[0]._id
    },
    {
      uid: 1254,
      vendor: "VmWare",
      status: "online",
      gateway: gatewaysObjs[0]._id
    },
    {
      uid: 22336,
      vendor: "BMW",
      status: "offline",
      gateway: gatewaysObjs[0]._id
    },
    {
      uid: 123,
      vendor: "BMW",
      status: "offline",
      gateway: gatewaysObjs[1]._id
    },
    {
      uid: 7852,
      vendor: "VmWare",
      status: "online",
      gateway: gatewaysObjs[1]._id
    },
    {
      uid: 96321,
      vendor: "Musala Soft",
      status: "online",
      gateway: gatewaysObjs[2]._id
    },
    {
      uid: 847963,
      vendor: "Musala",
      status: "online",
      gateway: gatewaysObjs[2]._id
    },
    {
      uid: 89635,
      vendor: "VMWare",
      status: "online",
      gateway: gatewaysObjs[3]._id
    },
    {
      uid: 3258,
      vendor: "Apple",
      status: "online",
      gateway: gatewaysObjs[4]._id
    }

  ]
  await Device.insertMany(devices)
  console.log("=======seeder complete======")
}
module.exports = {
  initSeederWithNewConnection: initSeederWithNewConnection,
  seeder: seeder
}
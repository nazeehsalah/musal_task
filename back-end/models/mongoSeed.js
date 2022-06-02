const Device = require('./device.model')
const Gateway = require('./gateway.model')
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(res => {
  Promise.all([
    Gateway.deleteMany({}),
    Device.deleteMany({})
  ])
    .then(res => {
      seeder().then(async res => {
        console.log("====seed done====")
        mongoose.connection.close()
      }).catch(e => {
        console.log(e)
        mongoose.connection.close()
      })
    })
    .catch(e => {
      console.log(e)
      mongoose.connection.close()
    });
}).catch(e => {
  console.log(e)
  mongoose.connection.close()
})

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

  await Gateway.insertMany(gateways).then(async res => {
    const devices = [
      {
        uid: 123,
        vendor: "Musala",
        status: "online",
        gateway: res[0]._id
      },
      {
        uid: 1254,
        vendor: "VmWare",
        status: "online",
        gateway: res[0]._id
      },
      {
        uid: 22336,
        vendor: "BMW",
        status: "offline",
        gateway: res[0]._id
      },
      {
        uid: 123,
        vendor: "BMW",
        status: "offline",
        gateway: res[1]._id
      },
      {
        uid: 7852,
        vendor: "VmWare",
        status: "online",
        gateway: res[1]._id
      },
      {
        uid: 96321,
        vendor: "Musala Soft",
        status: "online",
        gateway: res[2]._id
      },
      {
        uid: 847963,
        vendor: "Musala",
        status: "online",
        gateway: res[2]._id
      },
      {
        uid: 89635,
        vendor: "VMWare",
        status: "online",
        gateway: res[3]._id
      },
      {
        uid: 3258,
        vendor: "Apple",
        status: "online",
        gateway: res[4]._id
      }

    ]
    await Device.insertMany(devices)
  })
}
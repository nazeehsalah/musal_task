const db = require("../models/index")
const Device = db.models.Device
const Gateway = db.models.Gateway
const ipv4 = new RegExp(/^(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)$/)
module.exports = {
  all: (req, res) => {
    Gateway.find((err, result) => {
      if (err) return next(err)
      res.status(200).send({ status: 'success', result: result })
    })
  },
  getOne: (req, res, next) => {
    Gateway.findById(req.params.gatewayId, (err, result) => {
      console.log(result)
      if (!result) res.status(500).send({ status: "Error", message: "Requested Gateway not found" })
      if (err) return next(err)
      res.status(200).send({ status: 'success', result: result })
    })
  },
  add: async (req, res) => {
    if (!ipv4.test(req.body.ipV4))
      res.status(500).send({ status: "Error", message: "invalid ip V4 format." })
    const gateway = new Gateway(req.body);
    gateway.save()
      .then(result => {
        res.status(201).send({ status: 'success', result: result });
      },
        error => {
          if (error["code"] === 11000) {
            res.status(500).send({ status: "Error", message: "Gateway serial must be unique." })
          }
          res.status(500).send({ status: "Error", message: error['_message'] })
        }
      )
  },
  update: (req, res) => {
    if (!ipv4.test(req.body.ipV4))
      res.status(500).send({ status: "Error", message: "invalid ip V4 format." })
    Gateway.findByIdAndUpdate({ _id: req.params.gatewayId }, req.body, { new: true })
      .then(result => {
        if (result)
          res.status(201).send({ status: 'success', result: result });
        else res.status(500).send({ status: "Error", message: "Gateway not found" })

      }, error => {
        if (error["code"] === 11000) {
          res.status(500).send({ status: "Error", message: "Gateway serial must be unique." })
        }
        res.status(500).send({ status: "Error", message: error['_message'] })
      })
  },
  delete: async (req, res) => {
    await Device.deleteMany({ gateway: req.params.gatewayId })
    Gateway.deleteOne({ _id: req.params.gatewayId }, (err, result) => {
      if (err) return next(err);
      res.status(200).send({ status: 'success', result: result });
    })
  },
  addDevice: async (req, res) => {
    let gateWayId = req.params.gatewayId
    let gateway = await Gateway.findById(gateWayId);
    if (!gateway)
      res.status(500).send({ status: "Error", message: "Gateway not found" })
    let devices = await Device.find({ gateway: gateWayId })
    console.log(devices.length)
    if (devices.length >= 10)
      res.status(500).send({ status: "Error", message: "Can't set more than 10 device per Gateway" })
    else {
      const device = new Device({ ...req.body, gateway: gateWayId })
      device.save()
        .then(result => {
          res.status(201).send({ status: 'success', result: result });
        }, error => {
          console.log(error)
          res.status(500).send({ status: "Error", message: error['_message'] })
        })
    }

  },
  getDevices: (req, res) => {
    Device.find({ gateway: req.params.gatewayId }, (err, result) => {
      if (err) return next(err)
      res.status(200).send({ status: 'success', result: result })
    })
  }
}
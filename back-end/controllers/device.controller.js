const db = require("../models/index")
const Device = db.models.Device
module.exports = {
  getOne: (req, res) => {
    Device.findById(req.params.deviceId, (err, result, next) => {
      if (err) return next(err)
      if (!result)
        res.status(500).send({ status: 'Error', result: "Device not found!" })
      res.status(200).send({ status: 'success', result: result })
    })
  },
  update: (req, res) => {
    Device.findByIdAndUpdate({ _id: req.params.deviceId }, req.body, { new: true })
      .then(result => {
        if (result)
          res.status(201).send({ status: 'success', result: result });
        else res.status(500).send({ status: "Error", message: "Device not found" })
      }, error => {
        res.status(500).send({ status: "Error", message: error['_message'] })
      })
  },
  delete: (req, res, next) => {
    Device.deleteOne({ _id: req.params.deviceId }, (err, result) => {
      if (err) return next(err);
      res.status(200).send({ status: 'success', result: result });
    });
  },
}
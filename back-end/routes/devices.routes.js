const router = require("express").Router()
const DeviceController = require("../controllers/device.controller")
router.get("/:deviceId", DeviceController.getOne)
router.delete("/:deviceId", DeviceController.delete)
router.put("/:deviceId", DeviceController.update)
module.exports = router
const router = require("express").Router()
const GatewayController = require("../controllers/gateway.controller")
router.get("/", GatewayController.all)
router.get("/:gatewayId", GatewayController.getOne)
router.post("/", GatewayController.add)
router.put("/:gatewayId", GatewayController.update)
router.delete("/:gatewayId", GatewayController.delete)
router.post("/:gatewayId/devices", GatewayController.addDevice)
router.get("/:gatewayId/devices", GatewayController.getDevices)
module.exports = router
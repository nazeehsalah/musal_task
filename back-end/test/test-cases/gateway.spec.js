const TestHelper = require('../testHelper')
const gatewayApi = "/api/gateways/"
TestHelper.initTest();

describe("GET All Gateways API Route path : api/gateways/ --- Method GET", () => {
  test("must get Gateway info", async () => {
    const gatewaysLength = await TestHelper.Gateway.countDocuments()
    const res = await TestHelper.Request.get(`${gatewayApi}`)
    expect(res.status).toBe(200);
    expect(gatewaysLength).toEqual(res.body.result.length)
  })
})

describe("GET Gateway API Route path : api/gateways/:id --- Method GET", () => {
  test("must get Gateway info", async () => {
    const gateway = await TestHelper.Gateway.findOne()
    const res = await TestHelper.Request.get(`${gatewayApi}${gateway._id}`)
    expect(res.status).toBe(200);
    expect(TestHelper.serializeObj(gateway)).toEqual(res.body.result)
  })
})
describe("Post gateway API Route path : api/gateways/:id --- Method POST", () => {
  test("Must add gateway info", async () => {
    const gateway_param = {
      serial_number: "s2587",
      name: "gateway name",
      ipV4: "1.2.3.4"
    }
    const res = await TestHelper.Request.post(`${gatewayApi}`).send(gateway_param)
    const gateways = await TestHelper.Gateway.find({ _id: res.body.result._id })
    expect(res.status).toBe(201);
    expect(gateways.length).toBe(1);
  })
  test("Not Add gateway with existing serial number", async () => {
    const params = {
      serial_number: "X15322",
      name: "gateway name",
      ipV4: "1.2.3.4"
    }
    const res = await TestHelper.Request.post(`${gatewayApi}`).send(params)
    expect(res.status).toBe(500);
    expect(res.body.status).toBe("Error");
    expect(res.body.message).toBe("Gateway serial must be unique.");
  })
  test("Not Add gateway with invalid ip", async () => {
    const params = {
      serial_number: "ser5201",
      name: "gateway name",
      ipV4: "2.2.2.2.2"
    }
    const res = await TestHelper.Request.post(`${gatewayApi}`).send(params)
    expect(res.status).toBe(500);
    expect(res.body.status).toBe("Error");
    expect(res.body.message).toBe("invalid ip V4 format.");
  })

})
describe("UPDATE gateway API Route path : api/gateways/:id --- Method PUT", () => {
  test("Must update gateway info", async () => {
    const gateway = await TestHelper.Gateway.findOne()
    const params = {
      serial_number: gateway.serial_number,
      name: "gateway updated name",
      ipV4: gateway.ipV4
    }
    const res = await TestHelper.Request.put(`${gatewayApi}${gateway._id}`).send(params)
    expect(res.status).toBe(201);
    expect(res.body.result.name).toBe("gateway updated name");
  })
  test("Not update gateway with existing serial number", async () => {
    const gateway = await TestHelper.Gateway.findOne()
    const params = {
      serial_number: "X15322",
      name: gateway.name,
      ipV4: gateway.ipV4
    }
    const res = await TestHelper.Request.put(`${gatewayApi}${gateway._id}`).send(params)
    expect(res.status).toBe(500);
    expect(res.body.status).toBe("Error");
    expect(res.body.message).toBe("Gateway serial must be unique.");
  })
  test("Not update gateway with invalid ip", async () => {
    const gateway = await TestHelper.Gateway.findOne()
    const params = {
      serial_number: gateway.serial_number,
      name: gateway.name,
      ipV4: "2.2.2.2.2"
    }
    const res = await TestHelper.Request.put(`${gatewayApi}${gateway._id}`).send(params)
    expect(res.status).toBe(500);
    expect(res.body.status).toBe("Error");
    expect(res.body.message).toBe("invalid ip V4 format.");
  })

})
describe("DELETE gateway API Route path : api/gateways/:id --- Method DELETE", () => {
  test("must delete gateway", async () => {
    const gateway = await TestHelper.Gateway.findOne()
    const lengthBefore = await TestHelper.Gateway.countDocuments()
    const res = await TestHelper.Request.delete(`${gatewayApi}${gateway._id}`)
    const lengthAfter = await TestHelper.Gateway.countDocuments()
    expect(res.status).toBe(200);
    expect(lengthAfter).toBe(lengthBefore - 1);
  })
})

/* devices and gateways */
describe("Get gateway's devices API Route path : api/gateways/:id/devices --- Method GET", () => {
  test("must return all devices belongs to specific gateway", async () => {
    const gateway = await TestHelper.Gateway.findOne()
    const devices = await TestHelper.Device.find({ gateway: gateway._id })
    const res = await TestHelper.Request.get(`${gatewayApi}${gateway._id}/devices`)
    expect(res.status).toBe(200);
    expect(res.body.result.length).toBeGreaterThan(0);
    expect(TestHelper.serializeObj(devices)).toEqual(res.body.result)
  })
})
describe("Add new device to gateway Route path : api/gateways/:id/devices --- Method POST", () => {
  test("must Add new device to gateway devices", async () => {
    const gateway = await TestHelper.Gateway.findOne()
    const params = {
      uid: 12578,
      vendor: "Musala device",
      status: "offline",
      gateway: gateway._id
    }
    const res = await TestHelper.Request.post(`${gatewayApi}${gateway._id}/devices`).send(params)
    const devices = await TestHelper.Device.find({ gateway: gateway._id })
    expect(res.status).toBe(201);
    expect(devices.length).toBeGreaterThan(0);
  })
  test("Not Add new device with string uid", async () => {
    const gateway = await TestHelper.Gateway.findOne()
    const params = {
      uid: "x450",
      vendor: "Musala device",
      status: "offline",
      gateway: gateway._id
    }
    const res = await TestHelper.Request.post(`${gatewayApi}${gateway._id}/devices`).send(params)
    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Device validation failed")
    expect(res.body.status).toBe("Error");
  })
  test("Not Add new device with invalid status", async () => {
    const gateway = await TestHelper.Gateway.findOne()
    const params = {
      uid: 450,
      vendor: "Musala device",
      status: "invalid",
      gateway: gateway._id
    }
    const res = await TestHelper.Request.post(`${gatewayApi}${gateway._id}/devices`).send(params)
    expect(res.status).toBe(500);
    expect(res.body.message).toBe("Device validation failed")
    expect(res.body.status).toBe("Error");
  })
})

const TestHelper = require('../testHelper')
const deviceApi = "/api/devices/"
TestHelper.initTest();

describe("GET device API Route path : api/devices/:id --- Method GET", () => {
  test("must get device info", async () => {
    const device = await TestHelper.Device.findOne()
    const res = await TestHelper.Request.get(`${deviceApi}${device._id}`)
    expect(res.status).toBe(200);
    expect(TestHelper.serializeObj(device)).toEqual(res.body.result)
  })
})

describe("UPDATE device API Route path : api/devices/:id --- Method PUT", () => {
  test("Must update device info", async () => {
    const device = await TestHelper.Device.findOne()
    const params = {
      uid: device.uid,
      vendor: "Musala update",
      status: "offline",
      gateway: device.gateway
    }
    const res = await TestHelper.Request.put(`${deviceApi}${device._id}`).send(params)
    expect(res.status).toBe(201);
    expect(res.body.result.status).toBe("offline");
    expect(res.body.result.vendor).toBe("Musala update");
  })
})

describe("DELETE device API Route path : api/devices/:id --- Method DELETE", () => {
  test("must delete device", async () => {
    const device = await TestHelper.Device.findOne()
    const lengthBefore = await TestHelper.Device.countDocuments()
    const res = await TestHelper.Request.delete(`${deviceApi}${device._id}`)
    const lengthAfter = await TestHelper.Device.countDocuments()
    expect(res.status).toBe(200);
    expect(lengthAfter).toBe(lengthBefore - 1);
  })
})


import { Device } from "@core/interfaces/device";
import { Gateway } from "@core/interfaces/gateway";
export const gatewaysData: Gateway[] = [
  {
    _id: "1",
    ipV4: "1.2.3.4",
    serial_number: "S123",
    name: "Musala"
  },
  {
    _id: "2",
    ipV4: "1.2.3.4",
    serial_number: "S1234",
    name: "Musala"
  },
  {
    _id: "3",
    ipV4: "1.2.3.4",
    serial_number: "S1235",
    name: "Musala"
  }
]
export const DevicesList: Device[] = [
  {
    _id: "1234",
    gateway: "1",
    created_date: new Date().toLocaleString(),
    status: "online",
    uid: "123",
    vendor: "MUSALA"
  },
  {
    _id: "1234",
    gateway: "1",
    created_date: new Date().toLocaleString(),
    status: "online",
    uid: "123",
    vendor: "MUSALA"
  },
  {
    _id: "1234",
    gateway: "1",
    created_date: new Date().toLocaleString(),
    status: "online",
    uid: "123",
    vendor: "MUSALA"
  }
]

import { Injectable } from '@angular/core';
import { Device } from '@core/interfaces/device';
import { ConnectionService } from '@core/services/connection.service';
@Injectable()
export class DeviceService {
  constructor(private connection: ConnectionService) { }
  delete(deviceId: string | null) {
    return this.connection.delete(`devices/${deviceId}`)
  }
  addDevice(gatewayId: string | null, deviceInfo: Device) {
    return this.connection.post(`gateways/${gatewayId}/devices`, deviceInfo)
  }
  updateDevice(device_id: string | null, deviceInfo: Device) {
    return this.connection.put(`devices/${device_id}`, deviceInfo)
  }
}

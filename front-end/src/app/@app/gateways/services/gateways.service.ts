import { Injectable } from '@angular/core';
import { Gateway } from '@core/interfaces/gateway';
import { ConnectionService } from '@core/services/connection.service';
@Injectable()
export class GatewaysService {
  constructor(private connection: ConnectionService) { }
  getAll() {
    return this.connection.get("gateways")
  }
  getById(id: string | null) {
    return this.connection.get(`gateways/${id}`)
  }
  getDevices(gatewayId: string | null) {
    return this.connection.get(`gateways/${gatewayId}/devices`)
  }
  delete(gatewayId: string | null) {
    return this.connection.delete(`gateways/${gatewayId}`)
  }
  add(gateway: Gateway) {
    return this.connection.post(`gateways`, gateway)
  }
  update(gatewayId: string | null, gateway: Gateway) {
    return this.connection.put(`gateways/${gatewayId}`, gateway)
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeviceService } from '@app/gateways/services/device.service';
import { GatewaysService } from '@app/gateways/services/gateways.service';
import { Device } from '@core/interfaces/device';
import { Gateway } from '@core/interfaces/gateway';
import { UtilsService } from '@core/services/utils.service';
import { forkJoin, Subscription } from 'rxjs';
import { AddDeviceComponent } from '../add-device/add-device.component';
@Component({
  selector: 'app-view-gateway',
  templateUrl: './view-gateway.component.html',
  styleUrls: ['./view-gateway.component.scss']
})
export class ViewGatewayComponent implements OnInit, OnDestroy {
  $subs: Subscription[] = []
  gateWayInfo: Gateway = new Gateway()
  devices: Device[] = []
  displayedColumns: string[] = ["vendor", "uid", "status", "created_date", "actions"]
  constructor(
    private activatedRouter: ActivatedRoute,
    private gatewaysService: GatewaysService,
    private utils: UtilsService,
    private deviceService: DeviceService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.gateWayInfo._id = this.activatedRouter.snapshot.paramMap.get("id")
    this.getInitInfo()
  }
  getInitInfo() {
    const sub: Subscription = forkJoin({
      gateway: this.gatewaysService.getById(this.gateWayInfo._id),
      devices: this.gatewaysService.getDevices(this.gateWayInfo._id)
    })
      .subscribe(res => {
        this.gateWayInfo = res.gateway.result
        this.devices = res.devices.result
      })
    this.$subs.push(sub)
  }
  addDevice() {
    let device = new Device()
    device.gateway = this.gateWayInfo._id
    this.addOrEdit(device)
  }
  editDevice(device: Device) {
    this.addOrEdit(device)
  }
  addOrEdit(device: Device) {
    const sub = this.dialog.open(AddDeviceComponent, {
      minWidth: '40%',
      data: device
    }).afterClosed().subscribe(res => {
      if (res.confirm)
        this.getInitInfo()
    });
    this.$subs.push(sub)
  }
  deleteDevice(device: Device) {
    const sub: Subscription = this.utils.showDeletePopup({
      message: "Delete Device Confirm",
      title: `Are you sure you want to delete (${device.uid})`
    }).afterClosed().subscribe((res: any) => {
      if (res.confirm) {
        const deleteSub = this.deviceService.delete(device._id)
          .subscribe(res => {
            this.utils.showSuccess("Device", "Device is deleted successfully")
            this.getInitInfo()
          })
        this.$subs.push(deleteSub)
      }
    })
    this.$subs.push(sub)
  }
  ngOnDestroy(): void {
    this.$subs.forEach(sub => sub.unsubscribe())
  }
}

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceService } from '@app/gateways/services/device.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UtilsService } from '@core/services/utils.service';
import { Device } from '@core/interfaces/device';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit, OnDestroy {
  deviceForm!: FormGroup
  $subs: Subscription[] = []
  constructor(
    private fb: FormBuilder,
    private deviceService: DeviceService,
    private utils: UtilsService,
    private dialogRef: MatDialogRef<AddDeviceComponent>,
    @Inject(MAT_DIALOG_DATA) public device: Device
  ) { }
  ngOnInit() {
    this.deviceForm = this.fb.group({
      gateway: [this.device.gateway],
      uid: [this.device.uid, [Validators.required, Validators.minLength(3), Validators.pattern(/^[0-9]+$/)]],
      vendor: [this.device.vendor, [Validators.required, Validators.minLength(3)]],
      status: [this.device.status, [Validators.required]]
    })
  }
  addDevice() {
    const sub: Subscription = this.deviceService.addDevice(this.device.gateway, this.deviceForm.value)
      .subscribe(res => {
        this.utils.showSuccess("Device", "Device is added successfully")
        this.close(true)
      })
    this.$subs.push(sub)
  }
  editDevice() {
    const sub: Subscription = this.deviceService.updateDevice(this.device._id, this.deviceForm.value)
      .subscribe(res => {
        this.utils.showSuccess("Device", "Device is added successfully")
        this.close(true)
      })
    this.$subs.push(sub)
  }
  submit() {
    if (this.device._id) {
      this.editDevice()
    } else {
      this.addDevice()
    }
  }
  close(confirm: boolean = false) {
    this.dialogRef.close({
      confirm: confirm
    })
  }
  ngOnDestroy(): void {
    this.$subs.forEach(sub => sub.unsubscribe())
  }
}

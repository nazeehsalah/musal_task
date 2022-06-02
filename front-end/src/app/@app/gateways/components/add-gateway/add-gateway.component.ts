import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GatewaysService } from '@app/gateways/services/gateways.service';
import { Gateway } from '@core/interfaces/gateway';
import { UtilsService } from '@core/services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-gateway',
  templateUrl: './add-gateway.component.html',
  styleUrls: ['./add-gateway.component.scss']
})
export class AddGatewayComponent implements OnInit {
  gatewayForm!: FormGroup
  $subs: Subscription[] = []
  constructor(
    private fb: FormBuilder,
    private gatewayService: GatewaysService,
    private utils: UtilsService,
    private dialogRef: MatDialogRef<AddGatewayComponent>,
    @Inject(MAT_DIALOG_DATA) public gateway: Gateway
  ) { }
  ngOnInit() {
    this.gatewayForm = this.fb.group({
      name: [this.gateway.name, [Validators.required, Validators.minLength(3)]],
      serial_number: [this.gateway.serial_number, [Validators.required, Validators.minLength(3)]],
      ipV4: [this.gateway.ipV4, [Validators.required, Validators.pattern(/^(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)\.(25[0-5]|2[0-4][0-9]|[1]?[1-9][1-9]?)$/)]]
    })
  }
  addGateway() {
    const sub: Subscription = this.gatewayService.add(this.gatewayForm.value)
      .subscribe(res => {
        this.utils.showSuccess("Gateway", "Gateway is added successfully")
        this.close(true)
      })
    this.$subs.push(sub)
  }
  editGateway() {
    const sub: Subscription = this.gatewayService.update(this.gateway._id, this.gatewayForm.value)
      .subscribe(res => {
        this.utils.showSuccess("Device", "Device is added successfully")
        this.close(true)
      })
    this.$subs.push(sub)
  }
  submit() {
    if (this.gateway._id) {
      this.editGateway()
    } else {
      this.addGateway()
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

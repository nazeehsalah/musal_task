import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GatewaysService } from '@app/gateways/services/gateways.service';
import { Gateway } from '@core/interfaces/gateway';
import { UtilsService } from '@core/services/utils.service';
import { Subscription } from 'rxjs';
import { AddGatewayComponent } from '../add-gateway/add-gateway.component';

@Component({
  selector: 'app-gateway-list',
  templateUrl: './gateway-list.component.html',
  styleUrls: ['./gateway-list.component.scss']
})
export class GatewayListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["serial_number", "name", "ipV4", "actions"]
  gatewaysList: Gateway[] = []
  $subs: Subscription[] = []
  constructor(
    private gatewaysService: GatewaysService,
    private router: Router,
    private utils: UtilsService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.getGateways()
  }
  getGateways() {
    this.gatewaysService.getAll()
      .subscribe(res => {
        this.gatewaysList = res.result
      })
  }
  view(gateway: Gateway) {
    this.router.navigate([`view/${gateway._id}`], { relativeTo: this.activatedRoute })
  }
  deleteGateway(gateway: Gateway) {
    this.utils.showDeletePopup({
      title: "Delete Gateway?",
      message: `Are you sure you want to delete (${gateway.name})`
    }).afterClosed().subscribe((res: any) => {
      if (res.confirm) {
        const deleteSub = this.gatewaysService.delete(gateway._id)
          .subscribe(res => {
            this.utils.showSuccess("Gateway", "Gateway is deleted successfully")
            this.getGateways()
          })
        this.$subs.push(deleteSub)
      }
    })
  }
  addGateway() {
    let gateway = new Gateway()
    this.addOrEdit(gateway)
  }
  edit(gateway: Gateway) {
    this.addOrEdit(gateway)
  }
  addOrEdit(gateway: Gateway) {
    const sub = this.dialog.open(AddGatewayComponent, {
      minWidth: '40%',
      data: gateway
    }).afterClosed().subscribe(res => {
      if (res.confirm)
        this.getGateways()
    });
    this.$subs.push(sub)
  }
  ngOnDestroy(): void {
    this.$subs.forEach(sub => sub.unsubscribe())
  }

}

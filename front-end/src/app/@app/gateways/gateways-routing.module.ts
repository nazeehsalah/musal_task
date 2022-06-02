import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { AddGatewayComponent } from './components/add-gateway/add-gateway.component';
import { GatewayListComponent } from './components/gateway-list/gateway-list.component';
import { ViewGatewayComponent } from './components/view-gateway/view-gateway.component';
import { GatewaysComponent } from './gateways.component';
export const COMPONENTS = [
  GatewaysComponent,
  GatewayListComponent,
  ViewGatewayComponent,
  AddDeviceComponent,
  AddGatewayComponent
]
const routes: Routes = [
  {
    path: "",
    component: GatewaysComponent,
    children: [
      {
        path: '',
        component: GatewayListComponent,
        pathMatch: 'full',
      },
      {
        path: 'view/:id',
        component: ViewGatewayComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GatewaysRoutingModule { }

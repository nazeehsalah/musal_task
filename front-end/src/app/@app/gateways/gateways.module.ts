import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GatewaysRoutingModule, COMPONENTS } from './gateways-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatGridListModule } from '@angular/material/grid-list'
import { GatewaysService } from './services/gateways.service';
import { DeviceService } from './services/device.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    GatewaysRoutingModule,
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatGridListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  providers: [GatewaysService, DeviceService]
})
export class GatewaysModule { }

/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewGatewayComponent } from './view-gateway.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GatewaysService } from '@app/gateways/services/gateways.service';
import { UtilsService } from '@core/services/utils.service';
import { DeviceService } from '@app/gateways/services/device.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('ViewGatewayComponent', () => {
  let component: ViewGatewayComponent;
  let fixture: ComponentFixture<ViewGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGatewayComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule
      ],
      providers: [
        GatewaysService,
        UtilsService,
        DeviceService,
        MatDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

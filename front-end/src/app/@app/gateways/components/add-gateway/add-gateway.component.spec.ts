/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddGatewayComponent } from './add-gateway.component';
import { FormBuilder } from '@angular/forms';
import { GatewaysService } from '@app/gateways/services/gateways.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeviceService } from '@app/gateways/services/device.service';

describe('AddGatewayComponent', () => {
  let component: AddGatewayComponent;
  let fixture: ComponentFixture<AddGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddGatewayComponent],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule
      ],
      providers: [
        FormBuilder,
        GatewaysService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

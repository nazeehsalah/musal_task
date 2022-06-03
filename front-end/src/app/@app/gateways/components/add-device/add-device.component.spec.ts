/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddDeviceComponent } from './add-device.component';
import { FormBuilder } from '@angular/forms';
import { DeviceService } from '@app/gateways/services/device.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AddDeviceComponent', () => {
  let component: AddDeviceComponent;
  let fixture: ComponentFixture<AddDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddDeviceComponent],
      providers: [
        FormBuilder,
        DeviceService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
      ],
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule],
    })

      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

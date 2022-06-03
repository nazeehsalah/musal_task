/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GatewayListComponent } from './gateway-list.component';
import { GatewaysService } from '@app/gateways/services/gateways.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

describe('GatewayListComponent', () => {
  let component: GatewayListComponent;
  let fixture: ComponentFixture<GatewayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GatewayListComponent],
      providers: [GatewaysService],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        MatDialogModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GatewayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

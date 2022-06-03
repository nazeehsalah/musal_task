/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { ConnectionService } from '@core/services/connection.service';
import { DeviceService } from './device.service';

describe('Service: Device', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should ...', inject([DeviceService], (service: DeviceService) => {
    expect(service).toBeTruthy();
  }));
});

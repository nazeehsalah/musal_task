/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { Device } from '@core/interfaces/device';
import { DevicesList, gatewaysData } from '@core/mocks/gateways';
import { TestHelper } from '@core/mocks/test.helper';
import { ConnectionService } from '@core/services/connection.service';
import { DeviceService } from './device.service';
let spy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };
let deviceService: DeviceService;
let testHelper = new TestHelper
describe('Service: Device', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeviceService],
      imports: [HttpClientTestingModule],
    });
    spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    deviceService = new DeviceService(<any>spy);
  });

  it('should ...', inject([DeviceService], (service: DeviceService) => {
    expect(service).toBeTruthy();
  }));
  it('should execute a POST a Device', () => {
    spy.post.and.returnValue(testHelper.observeData(DevicesList[0], "success"));
    const gateway = { ...gatewaysData[0] };
    deviceService.addDevice(gateway._id, DevicesList[0]).subscribe(res => {
      expect(DevicesList[0]).toEqual(res.result)
      expect(res.result.gateway).toEqual(gateway._id)
      expect(res.status).toEqual("success")
    }, fail)

    expect(spy.post.calls.count()).toBe(1, 'one call');
  });

});

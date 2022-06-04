/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { Device } from '@core/interfaces/device';
import { Gateway } from '@core/interfaces/gateway';
import { DevicesList, gatewaysData } from '@core/mocks/gateways';
import { TestHelper } from '@core/mocks/test.helper';
import { ConnectionService } from '@core/services/connection.service';
import { GatewaysService } from './gateways.service';
let spy: { get: jasmine.Spy, post: jasmine.Spy, put: jasmine.Spy };
let gatewaysService: GatewaysService;
let testHelper = new TestHelper
let testData = gatewaysData
describe('Service: Gateways', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GatewaysService, ConnectionService],
      imports: [HttpClientTestingModule]
    });
    spy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    gatewaysService = new GatewaysService(<any>spy);
  });

  it('should ...', inject([GatewaysService], (service: GatewaysService) => {
    expect(service).toBeTruthy();
  }));
  it('should return a GET All Gateways', () => {
    const expectedGateways: Gateway[] = testData;
    spy.get.and.returnValue(testHelper.observeData(expectedGateways, "success"));
    gatewaysService.getAll().subscribe(
      gateways => {
        expect(gateways.result).toEqual(expectedGateways)
        expect(gateways.status).toEqual("success")
      },
      fail
    );
    expect(spy.get.calls.count()).toBe(1, 'one call');
  });
  it('should return a GET one Gateway', () => {
    const expectedGateway: Gateway = testData[0];
    spy.get.and.returnValue(testHelper.observeData(expectedGateway, "success"));
    gatewaysService.getById(expectedGateway._id).subscribe(
      gateways => {
        expect(gateways.result).toEqual(expectedGateway)
        expect(gateways.status).toEqual("success")
      },
      fail
    );
    expect(spy.get.calls.count()).toBe(1, 'one call');
  });
  it('should execute a POST a Gateway', () => {
    spy.post.and.returnValue(testHelper.observeData(gatewaysData[0], "success"));
    const newGateway = { ...gatewaysData[0] };
    gatewaysService.add(newGateway).subscribe(res => {
      expect(res.result).toEqual(newGateway)
      expect(res.status).toEqual("success")
    }, fail)

    expect(spy.post.calls.count()).toBe(1, 'one call');
  });
  it('should execute not  POST a Gateway with existing serial number', () => {
    spy.post.and.returnValue(testHelper.observeError("Gateway serial must be unique.", "Error"));
    const newGateway = { ...gatewaysData[0] };
    gatewaysService.add(newGateway).subscribe(res => {
      expect(res.message).toContain("Gateway serial must be unique.")
      expect(res.status).toEqual("Error")
    },
    )
  });
  it('should execute not  POST a Gateway with invalid ip', () => {
    spy.post.and.returnValue(testHelper.observeError("invalid ip V4 format.", "Error"));
    const newGateway = { ...gatewaysData[0] };
    gatewaysService.add(newGateway).subscribe(res => {
      expect(res.message).toContain("invalid ip V4 format.")
      expect(res.status).toEqual("Error")
    },
    )
  });
  it('should execute return  all devices for Gateway', () => {
    spy.get.and.returnValue(testHelper.observeData(DevicesList, "success"));
    const gateway = { ...gatewaysData[0] };
    gatewaysService.getDevices(gateway._id).subscribe(res => {
      expect(res.result).toEqual(DevicesList)
      expect(res.status).toEqual("success")
      res.result.forEach((device: Device) => {
        expect(device.gateway).toEqual(gateway._id)
      });
    },
    )
  });
});

/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { ConnectionService } from '@core/services/connection.service';
import { GatewaysService } from './gateways.service';

describe('Service: Gateways', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GatewaysService,ConnectionService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([GatewaysService], (service: GatewaysService) => {
    expect(service).toBeTruthy();
  }));
});

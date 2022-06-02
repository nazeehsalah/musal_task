/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GatewaysService } from './gateways.service';

describe('Service: Gateways', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GatewaysService]
    });
  });

  it('should ...', inject([GatewaysService], (service: GatewaysService) => {
    expect(service).toBeTruthy();
  }));
});

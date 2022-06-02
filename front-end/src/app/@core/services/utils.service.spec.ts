/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UtilsService } from './utils.service';

describe('Service: Global', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService]
    });
  });

  it('should ...', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
  }));
});

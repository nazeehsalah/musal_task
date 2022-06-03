/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConnectionService } from './connection.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Service: Connection', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConnectionService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([ConnectionService], (service: ConnectionService) => {
    expect(service).toBeTruthy();
  }));
});

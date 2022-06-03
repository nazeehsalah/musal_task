/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UtilsService } from './utils.service';

describe('Service: Utils', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService,ToastrService],
      imports: [ToastrModule.forRoot(), MatDialogModule]
    });
  });

  it('should ...', inject([UtilsService], (service: UtilsService) => {
    expect(service).toBeTruthy();
  }));
});

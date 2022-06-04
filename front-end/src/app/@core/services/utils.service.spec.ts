/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UtilsService } from './utils.service';
let toastrService: jasmine.SpyObj<ToastrService>
let utilsService: UtilsService
describe('Service: Utils', () => {
  beforeEach(() => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    TestBed.configureTestingModule({
      providers: [UtilsService, { provide: ToastrService, useValue: toastrService }],
      imports: [ToastrModule.forRoot(), MatDialogModule]
    });
    utilsService = TestBed.inject(UtilsService);
  });

  it('should ...', () => {
    expect(utilsService).toBeTruthy();
  });
  it('it show show spinner', () => {
    utilsService.showSpinner()
    expect(utilsService.spinner.getValue()).toBeTruthy();
  });
  it('it show hide spinner', () => {
    utilsService.hideSpinner()
    expect(utilsService.spinner.getValue()).toBeFalsy();
  });
  it('it show show Success toaster', () => {
    utilsService.showSuccess("Test", "Test message")
    expect(toastrService.success).toHaveBeenCalled();
  });
  it('it show show Error toaster', () => {
    utilsService.showError("Test", "Test message")
    expect(toastrService.error).toHaveBeenCalled();
  });
  it('it show open mat dialog for delete confirm', () => {
    const openDialogSpy = spyOn(utilsService.dialog, 'open')
    utilsService.showDeletePopup({ message: "Delete popup", title: "Delete Title" })
    expect(openDialogSpy).toHaveBeenCalled()
  });
});

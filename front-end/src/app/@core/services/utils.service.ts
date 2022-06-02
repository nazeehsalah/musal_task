import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '@shared/delete-confirm/delete-confirm.component';
import { DeletePopup } from '@core/interfaces/deletePopup';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  spinner: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  constructor(
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {

  }
  showSpinner() {
    this.spinner.next(true)
  }
  hideSpinner() {
    this.spinner.next(false)
  }
  showSuccess(title: string, msg: string) {
    this.toastr.success(msg, title, {
      timeOut: 3000
    });
  }
  showError(title: string, msg: string) {
    this.toastr.error(msg, title, {
      timeOut: 3000
    });
  }
  showDeletePopup(data: DeletePopup) {
    return this.dialog.open(DeleteConfirmComponent, {
      minWidth: '40%',
      data: data,
      position: {
        top: "15%"
      }
    });
  }
}

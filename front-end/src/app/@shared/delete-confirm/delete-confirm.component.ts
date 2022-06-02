import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeletePopup } from '@core/interfaces/deletePopup';
@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeletePopup
  ) { }
  ngOnInit() { }
  closeOrConfirm(confirm: boolean) {
    this.dialogRef.close({
      confirm: confirm
    }
    )
  }
}

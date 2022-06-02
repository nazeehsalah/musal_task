import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button/add-button.component';
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { ActionButtonComponent } from './action-button/action-button.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
const COMPONENTS = [AddButtonComponent, ActionButtonComponent, DeleteConfirmComponent]
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class SharedModule { }

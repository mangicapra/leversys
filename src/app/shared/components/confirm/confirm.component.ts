import { Component } from '@angular/core';
import { DialogContentBase, DialogRef } from '@progress/kendo-angular-dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent extends DialogContentBase {
  constructor(public dialog: DialogRef) {
    super(dialog);
  }

  public onCancelAction(): void {
    this.dialog.close();
  }

  public onConfirmAction(): void {
    this.dialog.close({ text: 'yes' });
  }
}

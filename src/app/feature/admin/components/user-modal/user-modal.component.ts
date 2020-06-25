import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent extends DialogContentBase implements OnDestroy {
  public submited: boolean;

  private addUserSubscription = new Subscription();
  private editUserSubscription = new Subscription();

  private _lastName: string;
  private _name: string;
  private _email: string;
  private _password: string;
  private _id: number;
  public _isNew = true;

  @Input() public set name(value: string) {
    this.formGroup.controls.name.setValue(value);
    this._name = value;
  }
  @Input() public set lastName(value: string) {
    this.formGroup.controls.lastName.setValue(value);
    this._lastName = value;
  }
  @Input() public set email(value: string) {
    this.formGroup.controls.email.setValue(value);
    this._email = value;
  }
  @Input() public set password(value: string) {
    this.formGroup.controls.password.setValue(value);
    this._password = value;
  }
  @Input() public set isNew(value: boolean) {
    this._isNew = value;
  }

  @Input() public set id(value: number) {
    this._id = value;
  }

  constructor(public dialog: DialogRef, private userService: UserService) {
    super(dialog);
  }

  ngOnDestroy() {
    this.addUserSubscription.unsubscribe();
    this.editUserSubscription.unsubscribe();
  }

  public formGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    password: new FormControl('', Validators.required),
    role: new FormControl(2),
  });

  get controls() {
    return this.formGroup.controls;
  }

  public onCancelAction(): void {
    this.dialog.close();
  }

  public onConfirmAction(): void {
    this.submited = true;
    if (this.formGroup.valid) {
      this._isNew ? this.createUser() : this.updateUser();
    }
  }

  private createUser(): void {
    this.addUserSubscription.add(
      this.userService.addUser(this.formGroup.value).subscribe(
        (res) => this.dialog.close({ text: 'yes' }),
        (err) =>
          /password/i.test(err.error)
            ? this.formGroup
                .get('password')
                .setErrors({ backendErrors: err.error })
            : this.formGroup
                .get('email')
                .setErrors({ backendErrors: err.error })
      )
    );
  }

  private updateUser(): void {
    delete this.formGroup.value.password;
    this.editUserSubscription.add(
      this.userService.editUser(this._id, this.formGroup.value).subscribe(
        (res) => this.dialog.close({ text: 'yes' }),
        (err) =>
          /password/i.test(err.error)
            ? this.formGroup
                .get('password')
                .setErrors({ backendErrors: err.error })
            : this.formGroup
                .get('email')
                .setErrors({ backendErrors: err.error })
      )
    );
  }
}

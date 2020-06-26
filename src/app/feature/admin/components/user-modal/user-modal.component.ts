import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { UserBook } from '@models/user';

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
  public _books: UserBook[];
  private _id: number;
  public _isNew = true;

  @Input() public set books(value: UserBook[]) {
    this._books = value;
  }

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

  private get addBooks(): UserBook[] {
    return [
      {
        id: 1,
        title: 'Database Design - 2nd Edition',
        ammount: 0,
      },
      {
        id: 2,
        title: 'Docker Cookbook - Second Edition',
        ammount: 0,
      },
      {
        id: 3,
        title: 'Clever Algorithms',
        ammount: 0,
      },
      {
        id: 4,
        title: 'Producing Open Source Software',
        ammount: 0,
      },
      {
        id: 5,
        title: 'The Future of the Internet',
        ammount: 0,
      },
      {
        id: 6,
        title: 'A short introduction to operating systems',
        ammount: 0,
      },
      {
        id: 7,
        title: 'Professional Software Development For Students',
        ammount: 0,
      },
      {
        id: 8,
        title:
          'Architectural Styles and the Design of Network-based Software Architectures',
        ammount: 0,
      },
      {
        id: 9,
        title: 'Test Driven Development, Extensive Tutorial',
        ammount: 0,
      },
      {
        id: 10,
        title: 'Designing for Performance',
        ammount: 0,
      },
      {
        id: 11,
        title: 'ASP.NET Core 2 Succinctly',
        ammount: 0,
      },
      {
        id: 12,
        title: 'Daily Design Patterns',
        ammount: 0,
      },
      {
        id: 13,
        title: 'HTML5 For Web Designers',
        ammount: 0,
      },
      {
        id: 14,
        title: "Crockford's JavaScript",
        ammount: 0,
      },
      {
        id: 15,
        title: 'JavaScript Spessore',
        ammount: 0,
      },
      {
        id: 16,
        title: 'TypeScript Accelerated',
        ammount: 0,
      },
    ];
  }

  private createUser(): void {
    this.formGroup.value.books = this.addBooks;

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

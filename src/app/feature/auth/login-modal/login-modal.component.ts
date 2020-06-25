import { Component, OnDestroy } from '@angular/core';
import { DialogRef, DialogContentBase } from '@progress/kendo-angular-dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent extends DialogContentBase
  implements OnDestroy {
  private loginSubscription = new Subscription();
  public submited = false;
  public formGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    public dialog: DialogRef,
    private authService: AuthService,
    private router: Router
  ) {
    super(dialog);
  }

  ngOnDestroy() {
    this.loginSubscription.unsubscribe();
  }

  get controls() {
    return this.formGroup.controls;
  }

  public onCancelAction(): void {
    this.dialog.close();
  }

  public onConfirmAction(): void {
    this.submited = true;
    if (this.formGroup.valid) {
      this.loginSubscription.add(
        this.authService.login(this.formGroup.value).subscribe(
          () => {
            this.dialog.close();
            this.router.navigate([`/${this.authService.getRole}`]);
          },
          (err) => {
            /password/.test(err.error)
              ? this.formGroup
                  .get('password')
                  .setErrors({ backendErrors: err.error })
              : this.formGroup
                  .get('email')
                  .setErrors({ backendErrors: err.error });
          }
        )
      );
    }
  }
}

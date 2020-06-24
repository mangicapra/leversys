import { Component, OnInit, Input } from '@angular/core';
import { DialogService } from '@progress/kendo-angular-dialog';
import { LoginModalComponent } from 'src/app/feature/auth/login-modal/login-modal.component';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private dialogService: DialogService,
    public authService: AuthService
  ) {}

  ngOnInit() {}

  public openLoginModal(): void {
    this.dialogService.open({
      content: LoginModalComponent,
    });
  }
}

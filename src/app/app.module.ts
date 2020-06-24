import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { LoginModalComponent } from './feature/auth/login-modal/login-modal.component';
import { SharedModule } from '@shared/shared.module';
import { ConfirmComponent } from '@shared/components/confirm/confirm.component';

@NgModule({
  declarations: [AppComponent, LoginModalComponent, ConfirmComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule],
  bootstrap: [AppComponent],
  entryComponents: [LoginModalComponent, ConfirmComponent],
})
export class AppModule {}

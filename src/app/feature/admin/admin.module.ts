import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [AdminComponent, UserModalComponent],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  entryComponents: [UserModalComponent],
})
export class AdminModule {}

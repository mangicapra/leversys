import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { SharedModule } from '@shared/shared.module';
import { BookComponent } from './components/book/book.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [StoreComponent, BookComponent, DetailsComponent],
  imports: [CommonModule, StoreRoutingModule, SharedModule],
})
export class StoreModule {}

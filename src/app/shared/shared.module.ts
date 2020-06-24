import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TooltipModule } from '@progress/kendo-angular-tooltip';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    TooltipModule,
    GridModule,
  ],
  exports: [
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    TooltipModule,
    GridModule,
  ],
})
export class SharedModule {}

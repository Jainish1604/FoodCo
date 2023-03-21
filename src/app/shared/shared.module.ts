import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from '../shared/dialog.service';
import { AddEditComponent } from './add-edit/add-edit.component';

@NgModule({
  declarations: [DialogComponent, AddEditComponent],
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,],
  exports:[DialogComponent,AddEditComponent],
  providers: [DialogService,AddEditComponent]
})
export class SharedModule { }

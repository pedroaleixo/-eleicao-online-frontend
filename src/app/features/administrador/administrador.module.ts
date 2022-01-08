import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorListComponent } from './components/administrador-list/administrador-list.component';
import { AdministradorFormComponent } from './components/administrador-form/administrador-form.component';
import { MaterialModule } from 'src/app/material.module';
import { DeleteDialogModule } from 'src/app/shared/delete-dialog/delete-dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [
    AdministradorListComponent,
    AdministradorFormComponent
  ],
  imports: [
    SharedModule
  ]
})
export class AdministradorModule { }

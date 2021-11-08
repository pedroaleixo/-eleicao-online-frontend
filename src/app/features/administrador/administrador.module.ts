import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorListComponent } from './components/administrador-list/administrador-list.component';
import { AdministradorFormComponent } from './components/administrador-form/administrador-form.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    AdministradorListComponent,
    AdministradorFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class AdministradorModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorListComponent } from './components/administrador-list/administrador-list.component';
import { AdministradorFormComponent } from './components/administrador-form/administrador-form.component';



@NgModule({
  declarations: [
    AdministradorListComponent,
    AdministradorFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdministradorModule { }

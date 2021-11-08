import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatoListComponent } from './components/candidato-list/candidato-list.component';
import { CandidatoFormComponent } from './components/candidato-form/candidato-form.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    CandidatoListComponent,
    CandidatoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class CandidatoModule { }

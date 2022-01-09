import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandidatoListComponent } from './components/candidato-list/candidato-list.component';
import { CandidatoFormComponent } from './components/candidato-form/candidato-form.component';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [
    CandidatoListComponent,
    CandidatoFormComponent
  ],
  imports: [
    SharedModule
  ]
})
export class CandidatoModule { }

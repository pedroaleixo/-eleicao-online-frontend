import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EleicaoListComponent } from './components/eleicao-list/eleicao-list.component';
import { EleicaoFormComponent } from './components/eleicao-form/eleicao-form.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    EleicaoListComponent,
    EleicaoFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EleicaoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EleicaoListComponent } from './components/eleicao-list/eleicao-list.component';
import { EleicaoFormComponent } from './components/eleicao-form/eleicao-form.component';



@NgModule({
  declarations: [
    EleicaoListComponent,
    EleicaoFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EleicaoModule { }

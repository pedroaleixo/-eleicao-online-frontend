import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotacaoListComponent } from './components/votacao-list/votacao-list.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    VotacaoListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class VotacaoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotacaoListComponent } from './components/votacao-list/votacao-list.component';
import { VotacaoSummaryComponent } from './components/votacao-summary/votacao-summary.component';



@NgModule({
  declarations: [
    VotacaoListComponent,
    VotacaoSummaryComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VotacaoModule { }

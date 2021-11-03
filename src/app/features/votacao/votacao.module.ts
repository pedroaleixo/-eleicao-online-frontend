import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotacaoListComponent } from './components/votacao-list/votacao-list.component';
import { VotacaoResumeComponent } from './components/votacao-resume/votacao-resume.component';



@NgModule({
  declarations: [
    VotacaoListComponent,
    VotacaoResumeComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VotacaoModule { }

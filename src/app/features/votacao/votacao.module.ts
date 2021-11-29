import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VotacaoListComponent } from './components/votacao-list/votacao-list.component';
import { MaterialModule } from 'src/app/material.module';
import { CancelamentoDialogComponent } from './components/cancelamento-dialog/cancelamento-dialog.component';



@NgModule({
  declarations: [
    VotacaoListComponent,
    CancelamentoDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class VotacaoModule { }

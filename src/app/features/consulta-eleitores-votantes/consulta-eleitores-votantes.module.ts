import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaEleitoresVotantesComponent } from './components/consulta-eleitores-votantes/consulta-eleitores-votantes.component';



@NgModule({
  declarations: [
    ConsultaEleitoresVotantesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ConsultaEleitoresVotantesModule { }

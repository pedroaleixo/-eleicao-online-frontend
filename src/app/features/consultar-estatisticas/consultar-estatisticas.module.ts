import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultarEstatisticasComponent } from './components/consultar-estatisticas/consultar-estatisticas.component';



@NgModule({
  declarations: [
    ConsultarEstatisticasComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ConsultarEstatisticasModule { }

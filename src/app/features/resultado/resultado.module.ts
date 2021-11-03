import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoListComponent } from './components/resultado-list/resultado-list.component';
import { ResultadoDetailComponent } from './components/resultado-detail/resultado-detail.component';



@NgModule({
  declarations: [
    ResultadoListComponent,
    ResultadoDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ResultadoModule { }

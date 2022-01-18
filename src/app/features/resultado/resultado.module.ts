import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { ResultadoListComponent } from './components/resultado-list/resultado-list.component';
import { ResultadoDetailComponent } from './components/resultado-detail/resultado-detail.component';



@NgModule({
  declarations: [
    ResultadoListComponent,
    ResultadoDetailComponent
  ],
  imports: [
    SharedModule
  ]
})
export class ResultadoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadoListComponent } from './components/resultado-list/resultado-list.component';
import { ResultadoDetailComponent } from './components/resultado-detail/resultado-detail.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    ResultadoListComponent,
    ResultadoDetailComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class ResultadoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { MaterialModule } from 'src/app/material.module';




@NgModule({
  declarations: [
    PessoaListComponent,
    PessoaFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class PessoaModule { }

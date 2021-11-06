import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';




@NgModule({
  declarations: [
    PessoaListComponent,
    PessoaFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PessoaModule { }

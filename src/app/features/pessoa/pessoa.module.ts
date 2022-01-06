import { DeleteDialogModule } from './../../shared/delete-dialog/delete-dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaFormComponent } from './components/pessoa-form/pessoa-form.component';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';




@NgModule({
  declarations: [
    PessoaListComponent,
    PessoaFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DeleteDialogModule,
    ReactiveFormsModule,
    TextMaskModule,
    HttpClientModule,  ]
})
export class PessoaModule { }

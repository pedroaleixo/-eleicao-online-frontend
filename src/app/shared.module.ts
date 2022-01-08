import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { CpfPipe } from './core/pipes/cpf.pipe';
import { MaterialModule } from './material.module';
import { DeleteDialogModule } from './shared/delete-dialog/delete-dialog.module';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [ CpfPipe ],
 exports:      [
   CommonModule,
  MaterialModule,
  DeleteDialogModule,
  ReactiveFormsModule,
  TextMaskModule,
  HttpClientModule,
  CpfPipe ]
})
export class SharedModule { }

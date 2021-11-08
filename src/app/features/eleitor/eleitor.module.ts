import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EleitorListComponent } from './components/eleitor-list/eleitor-list.component';
import { EleitorFormComponent } from './components/eleitor-form/eleitor-form.component';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [
    EleitorListComponent,
    EleitorFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class EleitorModule { }

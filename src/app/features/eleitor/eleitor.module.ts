import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EleitorListComponent } from './components/eleitor-list/eleitor-list.component';
import { EleitorFormComponent } from './components/eleitor-form/eleitor-form.component';



@NgModule({
  declarations: [
    EleitorListComponent,
    EleitorFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EleitorModule { }

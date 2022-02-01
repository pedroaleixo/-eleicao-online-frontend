import { NgModule } from '@angular/core';
import { IconSnackbarComponent } from './icon-snackbar.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [IconSnackbarComponent],
  exports: [IconSnackbarComponent],
  imports: [CommonModule, MaterialModule]
})
export class IconSnackbarModule { }

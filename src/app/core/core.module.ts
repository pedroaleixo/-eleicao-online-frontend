import { IconSnackbarModule } from './../shared/icon-snackbar/icon-snackbar.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../shared/loading/loading.module';

@NgModule({
  declarations: [

  ],
  imports: [CommonModule, RouterModule, LoadingModule, IconSnackbarModule],
  providers: [],
})
export class CoreModule {}

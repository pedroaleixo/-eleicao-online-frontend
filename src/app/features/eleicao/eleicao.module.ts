import { ComissaoDialogComponent } from './components/comissao-dialog/comissao-dialog.component';
import { CargoDialogComponent } from './components/cargo-dialog/cargo-dialog.component';
import { NgModule } from '@angular/core';
import { EleicaoListComponent } from './components/eleicao-list/eleicao-list.component';
import { EleicaoFormComponent } from './components/eleicao-form/eleicao-form.component';
import { SharedModule } from 'src/app/shared.module';



@NgModule({
  declarations: [
    EleicaoListComponent,
    EleicaoFormComponent,
    CargoDialogComponent,
    ComissaoDialogComponent
  ],
  imports: [
    SharedModule
  ]
})
export class EleicaoModule { }

import { EleicaoAtivaDialogComponent } from './admin-page/eleicao-ativa-dialog/eleicao-ativa-dialog.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginAdminPageComponent } from './login-admin-page/login-admin-page.component';
import { VotacaoPageComponent } from './votacao-page/votacao-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { LoginVotacaoPageComponent } from './login-votacao-page/login-votacao-page.component';

@NgModule({
  declarations: [
    LoginAdminPageComponent,
    LoginVotacaoPageComponent,
    AdminPageComponent,
    EleicaoAtivaDialogComponent,
    VotacaoPageComponent,
    ErrorPageComponent
  ],
  imports: [CommonModule, MaterialModule],
})
export class PagesModule {}

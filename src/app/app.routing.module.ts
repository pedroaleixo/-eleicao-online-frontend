import { EleicaoAtivaGuard } from './core/guards/eleicao-ativa.guard';
import { VotacaoListComponent } from './features/votacao/components/votacao-list/votacao-list.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { CandidatoListComponent } from './features/candidato/components/candidato-list/candidato-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './core/guards/auth-admin.guard';
import { AuthVotacaoGuard } from './core/guards/auth-votacao.guard';
import { AdministradorListComponent } from './features/administrador/components/administrador-list/administrador-list.component';
import { EleitorListComponent } from './features/eleitor/components/eleitor-list/eleitor-list.component';
import { EleicaoListComponent } from './features/eleicao/components/eleicao-list/eleicao-list.component';
import { LoginVotacaoPageComponent } from './pages/login-votacao-page/login-votacao-page.component';
import { LoginAdminPageComponent } from './pages/login-admin-page/login-admin-page.component';
import { RedirectPageComponent } from './pages/redirect-page/redirect-page.component';
import { VotacaoPageComponent } from './pages/votacao-page/votacao-page.component';
import { PessoaFormComponent } from './features/pessoa/components/pessoa-form/pessoa-form.component';
import { PessoaListComponent } from './features/pessoa/components/pessoa-list/pessoa-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'votacao',
  },
  {
    path: 'redirect',
    component: RedirectPageComponent
  },
  {
    path: 'login-admin',
    component: LoginAdminPageComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'administrador',
    component: AdministradorListComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'public/pessoa/form',
    component: PessoaFormComponent
  },
  {
    path: 'pessoa',
    component: PessoaListComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'pessoa/form',
    component: PessoaListComponent,
    canActivate: [AuthAdminGuard]
  },
  {
    path: 'eleicao',
    component: EleicaoListComponent,
    canActivate: [AuthAdminGuard],
  },
  {
    path: 'candidato',
    component: CandidatoListComponent,
    canActivate: [AuthAdminGuard, EleicaoAtivaGuard],
  },
  {
    path: 'eleitor',
    component: EleitorListComponent,
    canActivate: [AuthAdminGuard, EleicaoAtivaGuard],
  },
  {
    path: 'login-votacao',
    component: LoginVotacaoPageComponent
  },
  {
    path: 'votacao',
    component: VotacaoPageComponent,
    canActivate: [AuthVotacaoGuard],
  },
  {
    path: 'votacao/list/:eleicao',
    component: VotacaoListComponent,
    canActivate: [AuthVotacaoGuard],
  },
  {
    path: 'error/:ticket',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

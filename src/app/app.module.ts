import { PessoaModule } from './features/pessoa/pessoa.module';
import { VotacaoModule } from './features/votacao/votacao.module';
import { ResultadoModule } from './features/resultado/resultado.module';
import { EleitorModule } from './features/eleitor/eleitor.module';
import { CandidatoModule } from './features/candidato/candidato.module';
import { EleicaoModule } from './features/eleicao/eleicao.module';
import { AdministradorModule } from './features/administrador/administrador.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AdministradorModule,
    EleicaoModule,
    PessoaModule,
    CandidatoModule,
    EleitorModule,
    ResultadoModule,
    VotacaoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

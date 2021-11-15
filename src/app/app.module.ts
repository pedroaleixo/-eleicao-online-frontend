import { LoadingModule } from './shared/loading/loading.module';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { PagesModule } from './pages/pages.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './core/interceptors/request.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
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
    VotacaoModule,
    BrowserAnimationsModule,
    PagesModule,
    MaterialModule,
    ReactiveFormsModule,
    LoadingModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { UserService } from './../../../core/services/user.service';
import { Estatistica } from './../interfaces/estatistica';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Candidato } from '../../candidato/interfaces/candidato';
import { Eleitor } from '../../eleitor/interfaces/eleitor';
import { FiltroEleicao } from '../../pessoa/interfaces/filtro-eleicao';
import { Cargo } from '../interfaces/cargo';
import { Configuracao } from '../interfaces/configuracao';
import { Eleicao } from '../interfaces/eleicao';

const API_URL = environment.apiUrl+'/api';

@Injectable({
  providedIn: 'root'
})
export class EleicaoService {

  eleicoes$: Subject<Eleicao[]> = new Subject<Eleicao[]>();

  constructor(private http: HttpClient, private userService:UserService) { }

  public listarEleicoes(): Observable<Eleicao[]>{
    return this.http.get<Eleicao[]>(`${API_URL}/eleicao`);
	}

  public listarEleicoesPorFiltro(filtro: FiltroEleicao, page?:number, size?:number): Observable<any>{
    if(page >= 0 && size){
		  return this.http.post<any>(`${API_URL}/eleicao/filtrar?page=${page}&size=${size}`, filtro);
    }
    return this.http.post<any>(`${API_URL}/eleicao/filtrar`, filtro);
	}

  public listarCandidatosEleicao(idEleicao:number): Observable<Candidato[]>{
    return this.http.get<Candidato[]>(`${API_URL}/eleicao/${idEleicao}/candidatos`);
	}

  public listarEleitoresEleicao(idEleicao:number): Observable<Eleitor[]>{
    return this.http.get<Candidato[]>(`${API_URL}/eleicao/${idEleicao}/eleitores`);
	}

  public listarCargosEleicao(idEleicao:number): Observable<Cargo[]>{
    return this.http.get<Cargo[]>(`${API_URL}/eleicao/${idEleicao}/cargos`);
	}

  public listarEleicoesPorPessoaEleitor(idPessoa:number, page?:number, size?:number): Observable<any>{
    if(page && size){
		  return this.http.get<any>(`${API_URL}/eleicao/eleitor/${idPessoa}?page=${page}&size=${size}`);
    }
    return this.http.get<any>(`${API_URL}/eleicao/eleitor/${idPessoa}`);
	}

  public listarEleicoesPorPessoaMembroComissao(idPessoa:number): Observable<Eleicao[]>{
    return this.http.get<Eleicao[]>(`${API_URL}/eleicao/membro-comissao/${idPessoa}`);
  }

  public buscarEleicaoPorId(idEleicao: number) : Observable<Eleicao>{
    return this.http.get<Eleicao>(`${API_URL}/eleicao/${idEleicao}`);
  }

  public buscarConfiguracaoEleicao(idEleicao: number) : Observable<Configuracao> {
    return this.http.get<Configuracao>(`${API_URL}/eleicao/configuracao/${idEleicao}`);
  }

  public buscarEstatisticaEleicao(idEleicao: number, tipoEstatistica: number) : Observable<Estatistica>{
    return this.http.get<Estatistica>(`${API_URL}/eleicao/estatistica/${idEleicao}/${tipoEstatistica}`);
  }

  public cadastrar(eleicao: Eleicao): Observable<Eleicao> {
    return this.http.post<Eleicao>(`${API_URL}/eleicao`, eleicao, {responseType : 'text' as 'json'});
  }

  public atualizar(eleicao: Eleicao): Observable<Eleicao> {
    return this.http.put<Eleicao>(`${API_URL}/eleicao`, eleicao, {responseType : 'text' as 'json'});
  }

  public remover(idEleicao: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/eleicao/${idEleicao}`, {responseType : 'text' as 'json'});
  }

  public atualizarConfiguracao(configuracao: Configuracao): Observable<Configuracao> {
    return this.http.post<Configuracao>(`${API_URL}/eleicao/configuracao`, configuracao, {responseType : 'text' as 'json'});
  }

  public getEleicoesHeader(): Subject<Eleicao[]>{
    return this.eleicoes$;
  }

  public atualizarEleicoesHeader(){
    this.userService.getUser().subscribe((r) => {
      if(this.userService.isAdmin()){
        this.listarEleicoes().subscribe(eles => {
          this.eleicoes$.next(eles);
        });
      } else if (this.userService.isComissao()){
        this.listarEleicoesPorPessoaMembroComissao(r.pessoa).subscribe(eles => {
          this.eleicoes$.next(eles);
         });
      }
    });
  }
}



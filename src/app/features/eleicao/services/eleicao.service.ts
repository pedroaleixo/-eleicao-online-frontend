import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Candidato } from '../../candidato/interfaces/candidato';
import { Eleicao } from '../interfaces/eleicao';

const API_URL = environment.apiUrl+'/api';

@Injectable({
  providedIn: 'root'
})
export class EleicaoService {


  constructor(private http: HttpClient) { }

  public listarEleicoes(): Observable<Eleicao[]>{
    return this.http.get<Eleicao[]>(`${API_URL}/eleicao`);
	}

  public listarEleicoesPorPessoaEleitor(idPessoa:number, page?:number, size?:number): Observable<any>{
    if(page && size){
		  return this.http.get<any>(`${API_URL}/eleicao/eleitor/${idPessoa}?page=${page}&size=${size}`);
    }
    return this.http.get<any>(`${API_URL}/eleicao/eleitor/${idPessoa}`);
	}


  public buscarEleicaoPorId(idEleicao: number) : Observable<Eleicao>{
    return this.http.get<Eleicao>(`${API_URL}/eleicao/${idEleicao}`);
  }

  public listarCandidatosEleicao(idEleicao:number): Observable<Candidato[]>{
    return this.http.get<Candidato[]>(`${API_URL}/eleicao/${idEleicao}/candidatos`);
	}

  public listarEleicoesPorPessoaMembroComissao(idPessoa:number): Observable<Eleicao[]>{
    return this.http.get<Eleicao[]>(`${API_URL}/eleicao/membro-comissao/${idPessoa}`);
  }

}

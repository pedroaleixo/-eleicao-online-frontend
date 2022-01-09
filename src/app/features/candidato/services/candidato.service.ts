import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { FiltroPessoa } from '../../pessoa/interfaces/filtro-pessoa';
import { Candidato } from '../interfaces/candidato';

const API_URL = environment.apiUrl+'/api';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient) { }

  public buscarCandidatoPorId(idCandidato: number) : Observable<Candidato>{
    return this.http.get<Candidato>(`${API_URL}/candidato/${idCandidato}`);
  }

  public buscarCandidatoPeloIdPessoa(idPessoa:number, idEleicao:number) : Observable<Candidato>{
    return this.http.get<Candidato>(`${API_URL}/candidato/pessoa/${idPessoa}/${idEleicao}`);
  }

  public listarCandidatosPorFiltro(filtro: FiltroPessoa, page?:number, size?:number): Observable<any>{
    if(page >= 0 && size){
		  return this.http.post<any>(`${API_URL}/candidato/filtrar?page=${page}&size=${size}`, filtro);
    }
    return this.http.post<any>(`${API_URL}/candidato/filtrar`, filtro);
	}


  public cadastrar(candidato: Candidato): Observable<Candidato> {
    return this.http.post<Candidato>(`${API_URL}/candidato`, candidato, {responseType : 'text' as 'json'});
  }

  public atualizar(candidato: Candidato): Observable<Candidato> {
    return this.http.put<Candidato>(`${API_URL}/candidato`, candidato, {responseType : 'text' as 'json'});
  }

  public remover(idCandidato: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/candidato/${idCandidato}`, {responseType : 'text' as 'json'});
  }
}



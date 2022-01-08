import { FiltroPessoa } from './../interfaces/filtro-pessoa';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from '../interfaces/pessoa';

const API_URL = environment.apiUrl+'/api';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {


  constructor(private http: HttpClient) {}

  public buscarPessoaPorId(idPessoa: number) : Observable<Pessoa>{
    return this.http.get<Pessoa>(`${API_URL}/pessoa/${idPessoa}`);
  }

  public buscarPessoaPeloCpf(cpf: number) : Observable<Pessoa>{
    return this.http.get<Pessoa>(`${API_URL}/pessoa/cpf/${cpf}`);
  }

  public listarPessoasPorFiltro(filtro: FiltroPessoa, page?:number, size?:number): Observable<any>{
    if(page >= 0 && size){
		  return this.http.post<any>(`${API_URL}/pessoa/filtrar?page=${page}&size=${size}`, filtro);
    }
    return this.http.post<any>(`${API_URL}/pessoa/filtrar`, filtro);
	}

  public cadastrarPublico(pessoa: Pessoa): Observable<string> {
    return this.http.post<string>(`${API_URL}/pessoa/publico`, pessoa, {responseType : 'text' as 'json'});
  }

  public cadastrar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${API_URL}/pessoa`, pessoa, {responseType : 'text' as 'json'});
  }

  public atualizar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${API_URL}/pessoa`, pessoa, {responseType : 'text' as 'json'});
  }

  public remover(idPessoa: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/pessoa/${idPessoa}`, {responseType : 'text' as 'json'});
  }

}

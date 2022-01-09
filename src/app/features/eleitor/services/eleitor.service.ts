import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { FiltroPessoa } from '../../pessoa/interfaces/filtro-pessoa';
import { Eleitor } from '../interfaces/eleitor';

const API_URL = environment.apiUrl+'/api';

@Injectable({
  providedIn: 'root'
})
export class EleitorService {

  constructor(private http: HttpClient) { }

  public buscarEleitorPorId(idEleitor: number) : Observable<Eleitor>{
    return this.http.get<Eleitor>(`${API_URL}/eleitor/${idEleitor}`);
  }

  public buscarEleitorPeloIdPessoa(idPessoa:number, idEleicao:number) : Observable<Eleitor>{
    return this.http.get<Eleitor>(`${API_URL}/eleitor/pessoa/${idPessoa}/${idEleicao}`);
  }

  public listarEleitoresPorFiltro(filtro: FiltroPessoa, page?:number, size?:number): Observable<any>{
    if(page >= 0 && size){
		  return this.http.post<any>(`${API_URL}/eleitor/filtrar?page=${page}&size=${size}`, filtro);
    }
    return this.http.post<any>(`${API_URL}/eleitor/filtrar`, filtro);
	}


  public cadastrar(eleitor: Eleitor): Observable<Eleitor> {
    return this.http.post<Eleitor>(`${API_URL}/eleitor`, eleitor, {responseType : 'text' as 'json'});
  }

  public atualizar(eleitor: Eleitor): Observable<Eleitor> {
    return this.http.put<Eleitor>(`${API_URL}/eleitor`, eleitor, {responseType : 'text' as 'json'});
  }

  public remover(idEleitor: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/eleitor/${idEleitor}`, {responseType : 'text' as 'json'});
  }
}



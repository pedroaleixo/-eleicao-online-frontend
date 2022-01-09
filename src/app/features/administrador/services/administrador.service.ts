import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { Administrador } from '../interfaces/administrador';
import { FiltroPessoa } from '../../pessoa/interfaces/filtro-pessoa';

const API_URL = environment.apiUrl+'/api';

@Injectable({
  providedIn: 'root',
})
export class AdministradorService {

  constructor(private http: HttpClient) { }

  public buscarAdministradorPorId(idAdministrador: number) : Observable<Administrador>{
    return this.http.get<Administrador>(`${API_URL}/administrador/${idAdministrador}`);
  }

  public listarAdministradoresPorFiltro(filtro: FiltroPessoa, page?:number, size?:number): Observable<any>{
    if(page >= 0 && size){
		  return this.http.post<any>(`${API_URL}/administrador/filtrar?page=${page}&size=${size}`, filtro);
    }
    return this.http.post<any>(`${API_URL}/administrador/filtrar`, filtro);
	}


  public cadastrar(administrador: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(`${API_URL}/administrador`, administrador, {responseType : 'text' as 'json'});
  }

  public atualizar(administrador: Administrador): Observable<Administrador> {
    return this.http.put<Administrador>(`${API_URL}/administrador`, administrador, {responseType : 'text' as 'json'});
  }

  public remover(idAdministrador: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/administrador/${idAdministrador}`, {responseType : 'text' as 'json'});
  }
}

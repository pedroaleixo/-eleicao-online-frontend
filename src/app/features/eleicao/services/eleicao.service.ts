import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Eleicao } from '../interfaces/eleicao';

const API_URL = environment.apiUrl+'/api';

@Injectable({
  providedIn: 'root'
})
export class EleicaoService {

  constructor(private http: HttpClient) { }

  public listarEleicoesPorPessoaEleitor(idPessoa:number, page:number, size:number): Observable<any>{
		return this.http.get<any>(`${API_URL}/eleicao/eleitor/${idPessoa}?page=${page}&size=${size}`);
	}
}

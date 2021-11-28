import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Voto } from '../../eleicao/interfaces/voto';

const API_URL = environment.apiUrl+'/api';

@Injectable({
  providedIn: 'root',
})
export class VotacaoService {
  constructor(private http: HttpClient) {}

  public cadastrarVoto(voto: Voto): Observable<any> {
    return this.http.post<string>(`${API_URL}/voto`, voto);
  }

  public obterChavePublica():  Observable<string> {
    return this.http.get(`${API_URL}/voto/chave-publica`, { responseType: 'text' });
  }
}

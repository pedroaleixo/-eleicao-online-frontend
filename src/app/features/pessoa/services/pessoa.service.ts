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

  public cadastrarPublico(pessoa: Pessoa): Observable<string> {
    return this.http.post<string>(`${API_URL}/pessoa/publico`, pessoa, {responseType : 'text' as 'json'});
  }

  public cadastrar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${API_URL}/pessoa`, pessoa);
  }

}

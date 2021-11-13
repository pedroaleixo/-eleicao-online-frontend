import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Pessoa } from '../interfaces/Pessoa';
import { environment } from 'src/app/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class PessoaService {


  constructor(private http: HttpClient) {}

  public cadastrar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${API_URL}/pessoa`, pessoa);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { Eleitor } from '../interfaces/eleitor';

const API_URL = environment.apiUrl+'/api';

@Injectable({
  providedIn: 'root'
})
export class EleitorService {

  constructor(private http: HttpClient) { }

  public buscarEleitorPeloIdPessoa(idPessoa:number, idEleicao:number) : Observable<Eleitor>{
    return this.http.get<Eleitor>(`${API_URL}/eleitor/pessoa/${idPessoa}/${idEleicao}`);
  }
}

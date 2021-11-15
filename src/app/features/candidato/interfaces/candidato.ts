import { Cargo } from '../../eleicao/interfaces/cargo';
import { Eleicao } from '../../eleicao/interfaces/eleicao';
import { Pessoa } from '../../pessoa/interfaces/pessoa';


export interface Candidato {
  id:number;
  numero:number;
  votos:number;
  pessoa:Pessoa;
  eleicao:Eleicao;
  cargo:Cargo;
  acoes:any;
}

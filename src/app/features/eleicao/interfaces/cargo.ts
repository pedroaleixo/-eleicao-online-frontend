import { Eleicao } from './eleicao';

export interface Cargo {
  id:number;
  nome?:string;
  eleicao?:Eleicao;
	votosBrancos?:number;
  escolhas?:number;
}

import { Eleicao } from './eleicao';

export interface Voto {
  id: number;
  idEleitor: number;
  votoCriptografado: string;
  eleicao: Eleicao;
}

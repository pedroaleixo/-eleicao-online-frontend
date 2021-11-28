import { Eleicao } from './eleicao';

export interface Voto {
  id: number | null;
  idPessoa: number;
  votoCriptografado: string | null;
  eleicao: Eleicao;
}

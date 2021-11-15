import { Eleicao } from '../../eleicao/interfaces/eleicao';
import { Pessoa } from '../../pessoa/interfaces/pessoa';

export interface Eleitor {
	id:number;
	dataHoraVotou:Date;
  pessoa:Pessoa;
	eleicao:Eleicao;
}

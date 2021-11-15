import { Pessoa } from '../../pessoa/interfaces/pessoa';
import { Cargo } from './cargo';
import { Eleicao } from './eleicao';

export interface ComissaoEleitoral {

	id:number;
  membros: Pessoa[];
}

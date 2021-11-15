import { Candidato } from '../../candidato/interfaces/candidato';
import { Eleitor } from '../../eleitor/interfaces/eleitor';
import { Cargo } from './cargo';
import { ComissaoEleitoral } from './comissao-eleitoral';
import { Configuracao } from './configuracao';

export interface Eleicao {
  id:number;
  nome:string;
	instituicao:string;
  dataHoraInicio:Date;
	dataHoraFim:Date;
  situacao:number;
	cargos: Cargo[];
	comissaoEleitoral:ComissaoEleitoral;
	configuracao:Configuracao;
	candidatos: Candidato[];
	eleitores: Eleitor[];
}

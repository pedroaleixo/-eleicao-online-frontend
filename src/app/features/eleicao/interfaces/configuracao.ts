import { Cargo } from './cargo';
import { ComissaoEleitoral } from './comissao-eleitoral';
import { Eleicao } from './eleicao';

export interface Configuracao {
	id:number;
	exibirNumerosCandidatos:boolean;
	exibirConsultaEleitoresVotantes:boolean;
	ordenarPorNumeros:boolean;
	existiraTempoSessao:boolean;
	tempoSessao:number;
  eleicao:Eleicao;
}

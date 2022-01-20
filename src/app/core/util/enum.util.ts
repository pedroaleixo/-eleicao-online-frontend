import { TipoEstatistica } from './../../features/consultar-estatisticas/enums/tipo-estatistica';
import { SituacaoEleicao } from 'src/app/features/eleicao/enums/situacao-eleicao';

export function getValoresSituacaoEleicao(): any[] {
  return [
    {value: SituacaoEleicao.CADASTRADA.valueOf(), label: 'Cadastrada'},
    {value: SituacaoEleicao.INICIADA.valueOf(), label: 'Iniciada'},
    {value: SituacaoEleicao.FINALIZADA.valueOf(), label: 'Finalizada'},
    {value: SituacaoEleicao.EM_PROCESSAMENTO.valueOf(), label: 'Em processamento'},
    {value: SituacaoEleicao.FALHA_PROCESSAMENTO.valueOf(), label: 'Falha de processamento'},
    {value: SituacaoEleicao.PROCESSADA.valueOf(), label: 'Processada'}
  ]
}


export function getValorSituacaoEleicao(label:string): any[] {
  return getValoresSituacaoEleicao().find(situacao => situacao.label === label).value;
}


export function getValoresTiposEstatisticas(): any[] {
  return [
    {value: TipoEstatistica.ELEITORADO_POR_SEXO.valueOf(), label: 'Eleitorado por sexo'},
    {value: TipoEstatistica.ELEITORADO_POR_FAIXA_ETARIA.valueOf(), label: 'Eleitorado por faixa etária'},
    {value: TipoEstatistica.CANDIDATO_POR_SEXO.valueOf(), label: 'Candidato por sexo'},
    {value: TipoEstatistica.CANDIDATO_POR_FAIXA_ETARIA.valueOf(), label: 'Candidato por faixa etária'},
    {value: TipoEstatistica.DISTRIBUICAO_VOTANTES_DIA.valueOf(), label: 'Distribuição de votantes por dia'}
  ]
}

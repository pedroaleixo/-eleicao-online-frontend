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

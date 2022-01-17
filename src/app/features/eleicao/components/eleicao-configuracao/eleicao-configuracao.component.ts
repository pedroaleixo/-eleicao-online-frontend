import { Configuracao } from './../../interfaces/configuracao';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Eleicao } from '../../interfaces/eleicao';
import { EleicaoService } from '../../services/eleicao.service';

@Component({
  selector: 'app-eleicao-configuracao',
  templateUrl: './eleicao-configuracao.component.html',
  styleUrls: ['./eleicao-configuracao.component.css']
})
export class EleicaoConfiguracaoComponent implements OnInit {

  exibirNumerosCandidatos:boolean = false;
  ordenarPorNumeros:boolean = false;
  exibirConsultaEleitoresVotantes:boolean = false;
  existiraTempoSessao:boolean = false;
  configuracao:Configuracao;
  eleicao:Eleicao;

  constructor(private eleicaoService: EleicaoService,
    private snackbarService: SnackbarService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    if(id){
      this.eleicaoService.buscarEleicaoPorId(id).subscribe(e => {
        this.eleicao = e;

        this.eleicaoService.buscarConfiguracaoEleicao(id).subscribe(c => {
          if(c){
            this.configuracao = c;
            this.exibirNumerosCandidatos = c.exibirNumerosCandidatos;
            this.exibirConsultaEleitoresVotantes = c.exibirConsultaEleitoresVotantes;
            this.ordenarPorNumeros = c.ordenarPorNumeros;
            this.existiraTempoSessao = c.existiraTempoSessao;
          }
        });
      });
    }
  }

  salvar(){
    const dto = {
      id: this.configuracao ? this.configuracao.id : null,
	    exibirNumerosCandidatos: this.exibirNumerosCandidatos,
	    exibirConsultaEleitoresVotantes: this.exibirConsultaEleitoresVotantes,
	    ordenarPorNumeros: this.ordenarPorNumeros,
	    existiraTempoSessao: this.existiraTempoSessao,
      eleicao:this.configuracao ? this.configuracao.eleicao : this.eleicao
    }
    this.eleicaoService.atualizarConfiguracao(dto).subscribe(resp => {
      this.router.navigate(['/eleicao']);
      this.snackbarService.success('Eleicao configurada com sucesso');
    });
  }

  valueChange(name:string, checked:boolean){
    console.log(name, checked)
    if(name === 'exibirNumerosCandidatos'){
      this.exibirNumerosCandidatos = checked;
    } else if(name === 'ordenarPorNumeros'){
      this.ordenarPorNumeros = checked;
    } else if(name === 'exibirConsultaEleitoresVotantes'){
      this.exibirConsultaEleitoresVotantes = checked;
    } else if(name === 'existiraTempoSessao'){
      this.existiraTempoSessao = checked;
    }
  }

  voltar(){
    this.router.navigate(['/eleicao']);
  }

}

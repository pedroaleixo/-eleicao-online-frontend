import { ComissaoEleitoral } from './../../interfaces/comissao-eleitoral';
import { SnackbarService } from './../../../../core/services/snackbar.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Eleicao } from '../../interfaces/eleicao';
import { EleicaoService } from '../../services/eleicao.service';
import { Cargo } from '../../interfaces/cargo';
import { getValoresSituacaoEleicao } from 'src/app/core/util/enum.util';
import { addTimeToDate } from 'src/app/core/util/date.util';

@Component({
  selector: 'app-eleicao-form',
  templateUrl: './eleicao-form.component.html',
  styleUrls: ['./eleicao-form.component.css'],
})
export class EleicaoFormComponent implements OnInit {

  eleicao:Eleicao;
  cargos: Cargo[] = [];
  comissaoEleitoral: ComissaoEleitoral;
  eleicaoForm!: FormGroup;
  logged: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private eleicaoService: EleicaoService, private snackbarService: SnackbarService,
    private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {

    const id = this.route.snapshot.params.id;

    this.eleicaoForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      instituicao: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: ['', [Validators.required]],
      horaInicio: ['', []],
      horaFim: ['', []],
      situacao: ['', []],
      cargos: ['', []],
      comissaoEleitoral: ['',[]]
    });

    if(id){
      this.eleicaoService.buscarEleicaoPorId(id).subscribe(e => {
        this.eleicao = e;
        this.eleicaoForm.get('nome').setValue(e.nome);
        this.eleicaoForm.get('instituicao').setValue(e.instituicao);
        this.eleicaoForm.get('dataInicio').setValue(e.dataHoraInicio);
        this.eleicaoForm.get('dataFim').setValue(e.dataHoraFim);
        this.eleicaoForm.get('horaInicio').setValue(e.dataHoraInicio);
        this.eleicaoForm.get('horaFim').setValue(e.dataHoraFim);
        this.eleicaoForm.get('situacao').setValue(this.getSituacaoLabel(Number(e.situacao)));
        this.eleicaoForm.get('cargos').setValue(e.cargos);
        this.eleicaoForm.get('comissaoEleitoral').setValue(e.comissaoEleitoral);
      });
    }


    this.userService.getUser().subscribe(r => {
      if(r && r.perfis && r.perfis.length > 0) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }

  salvar() {
    if (!this.eleicaoForm.valid) {
      return;
    }
    let eleicaoDTO = {...this.eleicaoForm.value,
      dataHoraInicio: addTimeToDate(this.eleicaoForm.get('dataInicio').value),
      dataHoraFim: addTimeToDate(this.eleicaoForm.get('dataFim').value),
      cargos: this.cargos,
      comissaoEleitoral: this.comissaoEleitoral};

    if(this.eleicao){
      eleicaoDTO.id = this.eleicao.id;
      this.eleicaoService.atualizar(eleicaoDTO).subscribe(resp =>{
        this.router.navigate(['/eleicao']);
        this.snackbarService.success('Eleicao atualizada com sucesso');
      });
    } else {
      this.eleicaoService.cadastrar(eleicaoDTO).subscribe(resp =>{
        this.router.navigate(['/eleicao']);
        this.snackbarService.success('Eleicao cadastrada com sucesso');
      });
    }

  }

  getSituacaoLabel(value:number){
    const elEncontrado = getValoresSituacaoEleicao()?.find(e => e.value == value);
    return elEncontrado ? elEncontrado.label : "";
  }

  voltar(){
    this.router.navigate(['/eleicao']);
  }
}

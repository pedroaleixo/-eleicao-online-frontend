import { ComissaoEleitoral } from './../../interfaces/comissao-eleitoral';
import { SnackbarService } from './../../../../core/services/snackbar.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Eleicao } from '../../interfaces/eleicao';
import { EleicaoService } from '../../services/eleicao.service';
import { Cargo } from '../../interfaces/cargo';
import { getValoresSituacaoEleicao, getValorSituacaoEleicao } from 'src/app/core/util/enum.util';
import { addTimeToDate } from 'src/app/core/util/date.util';
import { MatDialog } from '@angular/material/dialog';
import { CargoDialogComponent } from '../cargo-dialog/cargo-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-eleicao-form',
  templateUrl: './eleicao-form.component.html',
  styleUrls: ['./eleicao-form.component.css'],
})
export class EleicaoFormComponent implements OnInit {

  eleicao:Eleicao;
  comissaoEleitoral: ComissaoEleitoral;
  eleicaoForm!: FormGroup;
  logged: boolean = false;
  displayedColumnsCargo: string[] = ['nome','escolhas','acoes'];
  dataSourceCargo = new MatTableDataSource<Cargo>();

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private eleicaoService: EleicaoService, private snackbarService: SnackbarService,
    public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {}

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
        const dataHoraInicio = new Date(e.dataHoraInicio);
        const dataHoraFim = new Date(e.dataHoraFim);
        this.eleicaoForm.get('nome').setValue(e.nome);
        this.eleicaoForm.get('instituicao').setValue(e.instituicao);
        this.eleicaoForm.get('dataInicio').setValue(e.dataHoraInicio);
        this.eleicaoForm.get('dataFim').setValue(e.dataHoraFim);
        this.eleicaoForm.get('horaInicio').setValue(dataHoraInicio.getHours()+":"+dataHoraInicio.getMinutes());
        this.eleicaoForm.get('horaFim').setValue(dataHoraFim.getHours()+":"+dataHoraFim.getMinutes());
        this.eleicaoForm.get('situacao').setValue(this.getSituacaoLabel(Number(e.situacao)));
        this.eleicaoForm.get('comissaoEleitoral').setValue(e.comissaoEleitoral);

        this.dataSourceCargo.data = e.cargos;
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
      dataHoraInicio: addTimeToDate(this.eleicaoForm.get('dataInicio').value, this.eleicaoForm.get('horaInicio').value),
      dataHoraFim: addTimeToDate(this.eleicaoForm.get('dataFim').value, this.eleicaoForm.get('horaFim').value),
      cargos: this.dataSourceCargo.data,
      comissaoEleitoral: this.comissaoEleitoral};

    if(this.eleicao){
      eleicaoDTO.id = this.eleicao.id;
      eleicaoDTO.situacao = getValorSituacaoEleicao(this.eleicaoForm.get('situacao').value);
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

  abrirModalCargos(event){
    event.preventDefault();
    const dialogRef = this.dialog.open(CargoDialogComponent, {
      data: {cargos: this.dataSourceCargo.data}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataSourceCargo.data = result.data;
      }
    });
  }

  redirecionarParaEdicaoCargo(event, nomeCargo:string){
    event.preventDefault();
    const dialogRef = this.dialog.open(CargoDialogComponent, {
      data: {
        cargos: this.dataSourceCargo.data,
        cargoEditado: this.dataSourceCargo.data.find(c => c.nome === nomeCargo) }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataSourceCargo.data = result.data;
      }
    });
  }

  removerCargo(event, nomeCargo:string){
    event.preventDefault();
    this.dataSourceCargo.data = this.dataSourceCargo.data.filter(c => c.nome != nomeCargo);
  }

  abrirModalComissao(event){
    event.preventDefault();
  }

  getSituacaoLabel(value:number){
    const elEncontrado = getValoresSituacaoEleicao()?.find(e => e.value == value);
    return elEncontrado ? elEncontrado.label : "";
  }

  voltar(){
    this.router.navigate(['/eleicao']);
  }
}

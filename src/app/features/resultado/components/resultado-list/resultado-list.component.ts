import { SituacaoEleicao } from './../../../eleicao/enums/situacao-eleicao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { addTimeToDate } from 'src/app/core/util/date.util';
import { Eleicao } from 'src/app/features/eleicao/interfaces/eleicao';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';
import { FiltroEleicao } from 'src/app/features/pessoa/interfaces/filtro-eleicao';

@Component({
  selector: 'app-resultado-list',
  templateUrl: './resultado-list.component.html',
  styleUrls: ['./resultado-list.component.css']
})
export class ResultadoListComponent implements OnInit {

  filtro:FiltroEleicao = {};
  displayedColumns: string[] = ['nome', 'instituicao', 'dataHoraInicio', 'dataHoraFim', 'acoes'];
  dataSource = new MatTableDataSource<Eleicao>();
  filtroForm!: FormGroup;
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize:number = 5;
  length!:number;

  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private eleicaoService: EleicaoService,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.filtroForm = this.formBuilder.group({
      nome: [''],
      instituicao: [''],
      dataInicio: [''],
      dataFim: [''],
      horaInicio: [''],
      horaFim: ['']
    });

    this.filtrar();
  }

  filtrar(){
    const nome = this.filtroForm.get('nome').value ? this.filtroForm.get('nome').value : null;
    const instituicao = this.filtroForm.get('instituicao').value ? this.filtroForm.get('instituicao').value : null;
    const dataHoraInicio = this.filtroForm.get('dataInicio').value ? addTimeToDate(this.filtroForm.get('dataInicio').value, this.filtroForm.get('horaInicio').value) : null;
    const dataHoraFim = this.filtroForm.get('dataFim').value ? addTimeToDate(this.filtroForm.get('dataFim').value, this.filtroForm.get('horaFim').value) : null;
    const situacao = SituacaoEleicao.FINALIZADA;
    this.filtro = {nome, instituicao, dataHoraInicio, dataHoraFim, situacao};

    this.eleicaoService.listarEleicoesPorFiltro(this.filtro, this.pageIndex, this.pageSize)
    .subscribe(page => {
      this.dataSource.data = page.content;
      this.pageIndex = (page.pageable ? page.pageable.pageNumber : 0);
      this.pageSize = (page.pageable ? page.pageable.pageSize : 5);
      this.length = page.totalElements;
    });
  }

  limpar(){
    this.filtroForm.reset();
    this.pageIndex = 0;
    this.filtrar();
  }

  buscarEleicoes(event:PageEvent){
    this.eleicaoService.listarEleicoesPorFiltro(this.filtro, event.pageIndex,
      event.pageSize)
    .subscribe(page => {
      this.dataSource.data = page.content;
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.length = page.totalElements;
    });
    return event;
  }

  redirecionarParaDetalhe(id:number){
    this.router.navigate([`/resultado/detail/${id}`]);
  }


}

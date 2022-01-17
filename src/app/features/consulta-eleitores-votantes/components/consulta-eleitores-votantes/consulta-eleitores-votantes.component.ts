import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ELEICAO_ATIVA } from 'src/app/core/util/constants';
import { addTimeToDate } from 'src/app/core/util/date.util';
import { Eleitor } from 'src/app/features/eleitor/interfaces/eleitor';
import { EleitorService } from 'src/app/features/eleitor/services/eleitor.service';
import { FiltroVotantes } from '../../interfaces/filtro-votantes';

@Component({
  selector: 'app-consulta-eleitores-votantes',
  templateUrl: './consulta-eleitores-votantes.component.html',
  styleUrls: ['./consulta-eleitores-votantes.component.css']
})
export class ConsultaEleitoresVotantesComponent implements OnInit {

  idEleicaoAtiva:number;
  filtro:FiltroVotantes = {};
  displayedColumns: string[] = ['nome', 'cpf', 'votou'];
  dataSource = new MatTableDataSource<Eleitor>();
  filtroForm!: FormGroup;
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize:number = 5;
  length!:number;

  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private eleitorService: EleitorService,
    private snackbarService: SnackbarService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit(): void {

    this.idEleicaoAtiva = Number(this.storageService.getItem(ELEICAO_ATIVA));

    this.filtroForm = this.formBuilder.group({
      dataInicio: [''],
      dataFim: [''],
      horaInicio: [''],
      horaFim: [''],
      votou: ['']
    });

    this.filtrar();
  }

  filtrar(){
    const dataHoraInicio = this.filtroForm.get('dataInicio').value ? addTimeToDate(this.filtroForm.get('dataInicio').value, this.filtroForm.get('horaInicio').value) : null;
    const dataHoraFim = this.filtroForm.get('dataFim').value ? addTimeToDate(this.filtroForm.get('dataFim').value, this.filtroForm.get('horaFim').value) : null;
    const votou = this.filtroForm.get('votou').value != null ? this.filtroForm.get('votou').value : null;
    this.filtro = {dataHoraInicio, dataHoraFim, votou, idEleicao: this.idEleicaoAtiva};

    this.eleitorService.listarEleitoresVotantes(this.filtro, this.pageIndex, this.pageSize)
    .subscribe(page => {
      this.dataSource.data = page.content;
      this.pageIndex = (page.pageable ? page.pageable.pageNumber : 0);
      this.pageSize = (page.pageable ? page.pageable.pageSize : 5);
      this.length = page.totalElements;
    });
  }

  buscarEleitores(event:PageEvent){
    this.eleitorService.listarEleitoresVotantes(this.filtro, event.pageIndex,
      event.pageSize)
    .subscribe(page => {
      this.dataSource.data = page.content;
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
      this.length = page.totalElements;
    });
    return event;
  }

  limpar(){
    this.filtroForm.reset();
    this.pageIndex = 0;
    this.filtrar();
  }

  voltar(){
    this.router.navigate(['/admin']);
  }

}

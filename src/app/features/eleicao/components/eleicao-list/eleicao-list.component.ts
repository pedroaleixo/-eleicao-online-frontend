import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Eleicao } from '../../interfaces/eleicao';
import { EleicaoService } from '../../services/eleicao.service';
import { FiltroEleicao } from 'src/app/features/pessoa/interfaces/filtro-eleicao';
import { getValoresSituacaoEleicao } from 'src/app/core/util/enum.util';
import { addTimeToDate } from 'src/app/core/util/date.util';

@Component({
  selector: 'app-eleicao-list',
  templateUrl: './eleicao-list.component.html',
  styleUrls: ['./eleicao-list.component.css']
})
export class EleicaoListComponent implements OnInit {

  filtro:FiltroEleicao = {};
  displayedColumns: string[] = ['nome', 'instituicao', 'dataHoraInicio', 'dataHoraFim', 'situacao', 'acoes'];
  dataSource = new MatTableDataSource<Eleicao>();
  filtroForm!: FormGroup;
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize:number = 5;
  length!:number;
  situacoes = [];

  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private eleicaoService: EleicaoService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private router: Router) { }


  ngOnInit() {

    this.situacoes = getValoresSituacaoEleicao();

    this.filtroForm = this.formBuilder.group({
      nome: [''],
      instituicao: [''],
      dataInicio: [''],
      dataFim: [''],
      horaInicio: [''],
      horaFim: [''],
      situacao: ['']
    });

    this.filtrar();
  }

  filtrar(){
    const nome = this.filtroForm.get('nome').value ? this.filtroForm.get('nome').value : null;
    const instituicao = this.filtroForm.get('instituicao').value ? this.filtroForm.get('instituicao').value : null;
    const dataHoraInicio = this.filtroForm.get('dataInicio').value ? addTimeToDate(this.filtroForm.get('dataInicio').value, this.filtroForm.get('horaInicio').value) : null;
    const dataHoraFim = this.filtroForm.get('dataFim').value ? addTimeToDate(this.filtroForm.get('dataFim').value, this.filtroForm.get('horaFim').value) : null;
    const situacao = this.filtroForm.get('situacao').value != null ? this.filtroForm.get('situacao').value : null;
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
    this.userService.getUser().subscribe(user => {
      if(user?.pessoa) {
        this.eleicaoService.listarEleicoesPorFiltro(this.filtro, event.pageIndex,
          event.pageSize)
        .subscribe(page => {
          this.dataSource.data = page.content;
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
          this.length = page.totalElements;
        });
      }
    });

    return event;
  }


  redirecionarParaCadastro(){
    this.router.navigate(['/eleicao/form']);
  }

  redirecionarParaEdicao(id:number){
    this.router.navigate([`/eleicao/form/${id}`]);
  }

  redirecionarParaCofiguracao(id:number){
    this.router.navigate([`/eleicao/configuracao/${id}`]);
  }

  confirmarRemocao(id:number){
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.eleicaoService.remover(id).subscribe(resp => {
          window.scroll(0,0);
          this.snackbarService.success('Eleição removida com sucesso');
          this.limpar();
        });
      }
    });
  }


  voltar(){
    this.router.navigate(['/admin']);
  }

  getSituacaoLabel(value:number){
    const elEncontrado = this.situacoes?.find(e => e.value == value);
    return elEncontrado ? elEncontrado.label : "";
  }
}

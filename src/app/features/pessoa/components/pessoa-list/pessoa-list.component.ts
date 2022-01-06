import { FiltroPessoa } from './../../interfaces/filtro-pessoa';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Pessoa } from '../../interfaces/pessoa';
import { PessoaService } from '../../services/pessoa.service';
import { CPF_MASK } from 'src/app/core/util/masks';
import { FormBuilder, FormGroup } from '@angular/forms';
import { somenteNumeros } from 'src/app/core/util/string.util';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent implements OnInit {

  cpfMask = CPF_MASK;
  filtro:FiltroPessoa = {};
  displayedColumns: string[] = ['nome', 'cpf', 'acoes'];
  dataSource = new MatTableDataSource<Pessoa>();
  filtroForm!: FormGroup;
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize:number = 5;
  length!:number;

  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private pessoaService: PessoaService,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private router: Router) { }



  ngOnInit() {

    this.filtroForm = this.formBuilder.group({
      nome: [''],
      cpf: ['']
    });

    this.filtrar();
  }

  filtrar(){
    const cpf = this.filtroForm.get('cpf').value ? somenteNumeros(this.filtroForm.get('cpf').value) : null;
    const nome = this.filtroForm.get('nome').value ? this.filtroForm.get('nome').value : null;
    this.filtro = {cpf, nome};

    this.pessoaService.listarPessoasPorFiltro(this.filtro, this.pageIndex, this.pageSize)
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

  buscarPessoas(event:PageEvent){
    this.userService.getUser().subscribe(user => {
      if(user?.pessoa) {
        this.pessoaService.listarPessoasPorFiltro(this.filtro, event.pageIndex,
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
    this.router.navigate(['/pessoa/form']);
  }

  redirecionarParaEdicao(id:number){
    this.router.navigate([`/pessoa/form/${id}`]);
  }

  confirmarRemocao(id:number){
    const dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.pessoaService.remover(id).subscribe(resp => {
          window.scroll(0,0);
          this.snackbarService.success('Pessoa removida com sucesso');
          this.limpar();
        });
      }
    });
  }


}

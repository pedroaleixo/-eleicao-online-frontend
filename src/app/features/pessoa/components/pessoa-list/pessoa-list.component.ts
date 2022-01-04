import { FiltroPessoa } from './../../interfaces/filtro-pessoa';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { Pessoa } from '../../interfaces/pessoa';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent implements AfterViewInit, OnInit {

  filtro:FiltroPessoa = {nome:"", cpf:0};
  displayedColumns: string[] = ['nome', 'cpf', 'actions'];
  dataSource = new MatTableDataSource<Pessoa>();
  pageEvent!: PageEvent;
  pageIndex!: number;
  pageSize!:number;
  length!:number;

  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private userService: UserService,
    private pessoaService: PessoaService,
    private router: Router) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.pessoaService.listarPessoasPorFiltro(this.filtro, 0, 5)
    .subscribe(page => {
      console.log(page.content)
      this.dataSource.data = page.content;
      this.pageIndex = (page.pageable ? page.pageable.pageNumber : 0);
      this.pageSize = (page.pageable ? page.pageable.pageSize : 5);
      this.length = page.totalElements;
    });
  }


  public buscarPessoas(event:PageEvent){
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

}

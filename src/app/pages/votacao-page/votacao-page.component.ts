import { SituacaoEleicao } from './../../features/eleicao/enums/situacao-eleicao';
import { TokenService } from '../../core/services/token.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Eleicao } from 'src/app/features/eleicao/interfaces/eleicao';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votacao-page',
  templateUrl: './votacao-page.component.html',
  styleUrls: ['./votacao-page.component.css']
})
export class VotacaoPageComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['nome', 'dataHoraInicio', 'dataHoraFim', 'acoes'];
  dataSource = new MatTableDataSource<Eleicao>();
  pageEvent!: PageEvent;
  pageIndex!: number;
  pageSize!:number;
  length!:number;

  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private userService: UserService,
    private eleicaoService: EleicaoService, private router: Router) { }


  ngOnInit(): void {


  }

  ngAfterViewInit() {
    this.userService.getUser().subscribe(user => {
      if(user?.pessoa) {
        this.eleicaoService.listarEleicoesPorPessoaEleitor(user.pessoa, 0, 5)
        .subscribe(page => {
          this.dataSource.data = page.content;
          this.pageIndex = page.pageable.pageNumber;
          this.pageSize = page.pageable.pageSize;
          this.length = page.totalElements;
        });
      }
    });
  }

  public buscarEleicoes(event:PageEvent){
    this.userService.getUser().subscribe(user => {
      if(user?.pessoa) {
        this.eleicaoService.listarEleicoesPorPessoaEleitor(user.pessoa, event.pageIndex,
          event.pageSize)
        .subscribe(page => {
          console.log(page.totalElements)
          this.dataSource.data = page.content;
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
          this.length = page.totalElements;
        });
      }
    });

    return event;
  }

  isIniciada(eleicao:Eleicao){
    if(eleicao && eleicao.situacao == SituacaoEleicao.INICIADA.valueOf()){
      return true;
    }
    return false;
  }

  votarEleicao(eleicao:Eleicao){
    this.router.navigate(['votacao/list/'+eleicao.id]);
  }



}

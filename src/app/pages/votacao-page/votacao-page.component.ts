import { SituacaoEleicao } from './../../features/eleicao/enums/situacao-eleicao';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Eleicao } from 'src/app/features/eleicao/interfaces/eleicao';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import { EleitorService } from 'src/app/features/eleitor/services/eleitor.service';
import { Observable } from 'rxjs';
import { Eleitor } from 'src/app/features/eleitor/interfaces/eleitor';
import { take } from 'rxjs/operators';

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
  pessoa!:number;
  mapEleitorNaoVotou: Map<number, boolean> = new Map();

  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private userService: UserService,
    private eleicaoService: EleicaoService,
    private eleitorService: EleitorService,
    private router: Router) { }


  ngOnInit(): void {


  }

  ngAfterViewInit() {
    this.userService.getUser().subscribe(user => {
      if(user?.pessoa) {
        this.pessoa = user.pessoa;
        this.eleicaoService.listarEleicoesPorPessoaEleitor(user.pessoa, 0, 5)
        .subscribe(page => {
          this.dataSource.data = page.content;
          this.pageIndex = page.pageable.pageNumber;
          this.pageSize = page.pageable.pageSize;
          this.length = page.totalElements;

          this.dataSource.data.forEach(eleicao => {
            this.eleitorService.buscarEleitorPeloIdPessoa(this.pessoa, eleicao.id).subscribe(eleitor => {
               this.mapEleitorNaoVotou.set(eleicao.id, eleitor.dataHoraVotou == null);
            })
          });
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
          this.dataSource.data = page.content;
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
          this.length = page.totalElements;
        });
      }
    });

    return event;
  }


  podeVotar(eleicao:Eleicao){
    if(eleicao && eleicao.situacao == SituacaoEleicao.INICIADA.valueOf() && this.mapEleitorNaoVotou.get(eleicao.id)){
      return true;
    }
    return false;
  }



  votarEleicao(eleicao:Eleicao){
    this.router.navigate(['votacao/list/'+eleicao.id]);
  }



}

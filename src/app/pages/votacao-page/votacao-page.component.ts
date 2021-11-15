import { TokenService } from '../../core/services/token.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Eleicao } from 'src/app/features/eleicao/interfaces/eleicao';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-votacao-page',
  templateUrl: './votacao-page.component.html',
  styleUrls: ['./votacao-page.component.css']
})
export class VotacaoPageComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['nome', 'dataHoraInicio', 'dataHoraFim', 'acoes'];
  dataSource = new MatTableDataSource<Eleicao>();

  @ViewChild(MatPaginator)paginator!: MatPaginator;

  constructor(private userService: UserService, private eleicaoService: EleicaoService) { }


  ngOnInit(): void {


  }

  ngAfterViewInit() {
    this.userService.getUser().subscribe(user => {
      if(user?.pessoa) {
        this.eleicaoService.listarEleicoesPorPessoaEleitor(user.pessoa)
        .subscribe(eleicoes => {
          this.dataSource.data = eleicoes;
          this.dataSource.paginator = this.paginator;
        });
      }
    });
  }

  votarEleicao(row:any){
    console.log(row)
  }

}

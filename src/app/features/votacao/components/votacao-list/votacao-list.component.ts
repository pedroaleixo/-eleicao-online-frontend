import { SnackbarService } from './../../../../core/services/snackbar.service';
import { SituacaoEleicao } from './../../../eleicao/enums/situacao-eleicao';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';
import { UserService } from 'src/app/core/services/user.service';
import { Eleicao } from 'src/app/features/eleicao/interfaces/eleicao';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';

@Component({
  selector: 'app-votacao-list',
  templateUrl: './votacao-list.component.html',
  styleUrls: ['./votacao-list.component.css'],
})
export class VotacaoListComponent implements OnInit {
  eleicao!: Eleicao;
  user!: User;
  map = new Map();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private eleicaoService: EleicaoService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eleicaoService
      .buscarEleicaoPorId(this.route.snapshot.params.eleicao)
      .subscribe((eleicao) => {
        this.eleicao = eleicao;
        this.verificarPermissoes();
        this.carregarCandidatos()
      });
  }

  verificarPermissoes() {
    this.userService.getUser().subscribe((user) => {
      if (user) {

        //Esse usuário está associado à esta eleição?
        if (user.pessoa) {
          this.eleicaoService
            .listarEleicoesPorPessoaEleitor(user.pessoa)
            .subscribe((page) => {
              const isEleitor = page.content.find((elem: Eleicao) => {
                return this.eleicao.id === elem.id;
              });

              if (!isEleitor) {
                this.router.navigate(['/votacao']);
                this.snackbarService.error('Usuário não é eleitor da eleição acessada');
              }
            });
        }

        //A situação dessa eleição é iniciada?
        if (this.eleicao.situacao.valueOf() != SituacaoEleicao.INICIADA) {
          this.router.navigate(['/votacao']);
          this.snackbarService.error('Eleição não iniciada');
        }
      }
    });
  }

  carregarCandidatos() {
    this.eleicaoService.listarCandidatosEleicao(this.eleicao.id)
    .subscribe(candidatos => {
      candidatos.forEach(candidato => {
        const key = candidato.cargo.id;
        if(!this.map.has(key)){
          this.map.set(key, [candidato]);
        } else {
          this.map.get(key).push(candidato);
        }
      });
      console.log(this.map);
    })
  }

}

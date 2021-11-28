import { EncryptionService } from './../../../../core/services/encryption.service';
import { Voto } from './../../../eleicao/interfaces/voto';
import { CargoCandidato } from './../../../eleicao/interfaces/cargo-candidato';
import { SnackbarService } from './../../../../core/services/snackbar.service';
import { SituacaoEleicao } from './../../../eleicao/enums/situacao-eleicao';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';
import { UserService } from 'src/app/core/services/user.service';
import { Eleicao } from 'src/app/features/eleicao/interfaces/eleicao';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';
import { Candidato } from 'src/app/features/candidato/interfaces/candidato';
import { MatTableDataSource } from '@angular/material/table';
import { Cargo } from 'src/app/features/eleicao/interfaces/cargo';
import { VotacaoService } from '../../services/votacao.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-votacao-list',
  templateUrl: './votacao-list.component.html',
  styleUrls: ['./votacao-list.component.css'],
})
export class VotacaoListComponent implements OnInit {
  eleicao!: Eleicao;
  user!: User;
  map = new Map();
  displayedColumns: string[] = ['nome', 'numero'];
  dataSource = new MatTableDataSource<Candidato>();
  selecao: number = 1;
  idsCargos: number[] = [];
  indiceCargo: number = 0;
  cargo!: Cargo;
  candidato!: Candidato | null;
  escolhas: CargoCandidato[] = [];
  mostrarSummary = false;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private eleicaoService: EleicaoService,
    private votacaoService: VotacaoService,
    private snackbarService: SnackbarService,
    private encryptionService:EncryptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eleicaoService
      .buscarEleicaoPorId(this.route.snapshot.params.eleicao)
      .subscribe((eleicao) => {
        this.eleicao = eleicao;
        this.verificarPermissoes();
        this.carregarCandidatos();
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
                this.snackbarService.error(
                  'Usuário não é eleitor da eleição acessada'
                );
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
    this.eleicaoService
      .listarCandidatosEleicao(this.eleicao.id)
      .subscribe((candidatos) => {
        candidatos.forEach((candidato) => {
          const key = candidato.cargo.id;
          if (!this.map.has(key)) {
            this.map.set(key, {
              cargo: { ...candidato.cargo },
              candidatos: [candidato],
            });
          } else {
            this.map.get(key).candidatos.push(candidato);
          }
        });
        this.configurarDadosCargo();
      });
  }

  configurarDadosCargo() {
    this.idsCargos = Array.from(this.map.keys());
    const objAtual = this.map.get(this.idsCargos[this.indiceCargo]);
    this.cargo = objAtual.cargo;
    this.dataSource.data = objAtual.candidatos;
  }

  selecionar(element: Candidato) {
    this.candidato = element;
  }

  branco(){
    let cargoCandidato = this.escolhas.find(e => e.cargo.id === this.cargo.id);
    if(!cargoCandidato){
      cargoCandidato = {cargo: this.cargo, candidatos: []}
      this.escolhas.push(cargoCandidato);
    }
    cargoCandidato.candidatos.push({
      id: 0,
      numero: 0,
      votos: 0,
      pessoa: null,
      eleicao: this.eleicao,
      cargo: this.cargo,
      acoes: null,
    });


    this.ajustarNavegacao();
  }


  confirmar() {
    if (this.candidato) {
      let cargoCandidato = this.escolhas.find(e => e.cargo.id === this.candidato?.cargo.id);
      if(!cargoCandidato){
        cargoCandidato = {cargo: this.candidato?.cargo, candidatos: []}
        this.escolhas.push(cargoCandidato);
      }
      cargoCandidato.candidatos.push({...this.candidato});
      this.dataSource.data = this.dataSource.data.filter(c => c.id != this.candidato?.id);

      this.ajustarNavegacao();
      this.candidato = null;
    }
  }

  votar(){
    console.log(this.escolhas);


    let idsCandidatos: number[] = [];
    this.escolhas.forEach(e => {
      idsCandidatos = idsCandidatos.concat(e.candidatos.map(c => c.id));
    });

    this.votacaoService.obterChavePublica()
    .pipe(take(1))
    .subscribe(chavePublica => {
      const escolhaEncriptada = "";///this.encryptionService.encryptVoto(chavePublica, idsCandidatos);

      this.userService.getUser()
      .pipe(take(1))
      .subscribe(user => {
        if(user) {
        const voto:Voto = {
          id: null,
          idPessoa: user.pessoa,
          votoCriptografado: escolhaEncriptada,
          eleicao: this.eleicao
        };

        this.votacaoService.cadastrarVoto(voto)
        .pipe(take(1))
        .subscribe(resp => {
          this.snackbarService.success("Voto registrado com sucesso")
          this.router.navigate(['votacao']);
        });
      }
    });


    });


  }

  cancelar(){
    this.mostrarSummary = false;
    this.escolhas = [];
    this.configurarDadosCargo();
  }

  private ajustarNavegacao() {
    this.candidato = null;
    if (this.selecao < this.cargo?.escolhas) {
      this.selecao += 1;
    } else if (this.indiceCargo >= this.idsCargos.length - 1) {
      this.mostrarSummary = true;
      this.selecao = 1;
      this.indiceCargo = 0;
    } else {
      this.selecao = 1;
      this.indiceCargo++;
      this.configurarDadosCargo();
    }
  }

}

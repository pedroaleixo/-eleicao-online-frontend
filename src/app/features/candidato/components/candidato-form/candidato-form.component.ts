import { SnackbarService } from './../../../../core/services/snackbar.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { somenteNumeros } from 'src/app/core/util/string.util';
import { CPF_MASK } from 'src/app/core/util/masks';
import { PessoaService } from 'src/app/features/pessoa/services/pessoa.service';
import { Pessoa } from 'src/app/features/pessoa/interfaces/pessoa';
import { ELEICAO_ATIVA } from 'src/app/core/util/constants';
import { StorageService } from 'src/app/core/services/storage.service';
import { Candidato } from '../../interfaces/candidato';
import { CandidatoService } from '../../services/candidato.service';
import { Cargo } from 'src/app/features/eleicao/interfaces/cargo';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';

@Component({
  selector: 'app-candidato-form',
  templateUrl: './candidato-form.component.html',
  styleUrls: ['./candidato-form.component.css'],
})
export class CandidatoFormComponent implements OnInit {

  candidato:Candidato;
  pessoa:Pessoa;
  idEleicaoAtiva:number;
  cargos:Cargo[];
  candidatoForm!: FormGroup;
  logged: boolean = false;
  cpfMask = CPF_MASK;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private pessoaService: PessoaService, private candidatoService: CandidatoService,
    private eleicaoService: EleicaoService, private snackbarService: SnackbarService,
    private router: Router, private storageService:StorageService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

    const id = this.route.snapshot.params.id;
    this.idEleicaoAtiva = Number(this.storageService.getItem(ELEICAO_ATIVA));

    this.eleicaoService.listarCargosEleicao(this.idEleicaoAtiva).subscribe(resp => {
      this.cargos = resp;
    });

    this.candidatoForm = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', []],
      endereco: ['', []],
      email: ['', [Validators.required]],
      telefone: ['', []],
      numero: ['', []],
      cargo: ['', [Validators.required]]
    });

    if(id){
      this.candidatoService.buscarCandidatoPorId(id).subscribe(a => {
        this.candidato = a;
        this.pessoa = a.pessoa;
        this.candidatoForm.get('cpf').setValue(a.pessoa.cpf+"");
        this.candidatoForm.get('nome').setValue(a.pessoa.nome);
        this.candidatoForm.get('dataNascimento').setValue(a.pessoa.dataNascimento);
        this.candidatoForm.get('genero').setValue(a.pessoa.genero);
        this.candidatoForm.get('endereco').setValue(a.pessoa.endereco);
        this.candidatoForm.get('email').setValue(a.pessoa.email);
        this.candidatoForm.get('telefone').setValue(a.pessoa.telefone);
        this.candidatoForm.get('cargo').setValue(a.cargo.id);
        this.candidatoForm.get('numero').setValue(a.numero);
      });
    }


    this.userService.getUser().subscribe(r => {
      if(r && r.perfis && r.perfis.length > 0) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }

  salvar() {
    if (!this.candidatoForm.valid) {
      return;
    }
    let candidatoDTO = {
      id: null,
      pessoa: {...this.candidatoForm.value},
      eleicao:{id: this.idEleicaoAtiva},
      cargo: {id: this.candidatoForm.get('cargo').value},
      numero: this.candidatoForm.get('numero').value,
      votos: 0
    };
    if(this.pessoa){
      candidatoDTO.pessoa.id = this.pessoa.id;
    }
    candidatoDTO.pessoa.cpf = somenteNumeros(candidatoDTO.pessoa.cpf);


    if(this.candidato){
      candidatoDTO.id = this.candidato.id;
      this.candidatoService.atualizar(candidatoDTO).subscribe(resp =>{
        this.router.navigate(['/candidato']);
        this.snackbarService.success('Candidato atualizado com sucesso');
      });
    } else {
      this.candidatoService.cadastrar(candidatoDTO).subscribe(resp =>{
        this.router.navigate(['/candidato']);
        this.snackbarService.success('Candidato cadastrado com sucesso');
      });
    }

  }

  pesquisar(event){
    event.preventDefault();
    this.pessoaService.buscarPessoaPeloCpf(
      somenteNumeros(this.candidatoForm.get('cpf').value))
      .subscribe(p => {
        if(p){
        this.pessoa = p;
        this.candidatoForm.get('nome').setValue(p.nome);
        this.candidatoForm.get('dataNascimento').setValue(p.dataNascimento);
        this.candidatoForm.get('genero').setValue(p.genero);
        this.candidatoForm.get('endereco').setValue(p.endereco);
        this.candidatoForm.get('email').setValue(p.email);
        this.candidatoForm.get('telefone').setValue(p.telefone);
        } else {
          this.pessoa = null;
        }
      });
  }

  voltar(){
    this.router.navigate(['/candidato']);
  }
}

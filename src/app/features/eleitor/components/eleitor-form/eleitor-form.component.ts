import { SnackbarService } from './../../../../core/services/snackbar.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { somenteNumeros } from 'src/app/core/util/string.util';
import { CPF_MASK } from 'src/app/core/util/masks';
import { PessoaService } from 'src/app/features/pessoa/services/pessoa.service';
import { Pessoa } from 'src/app/features/pessoa/interfaces/pessoa';
import { Eleitor } from '../../interfaces/eleitor';
import { EleitorService } from '../../services/eleitor.service';
import { ELEICAO_ATIVA } from 'src/app/core/util/constants';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-eleitor-form',
  templateUrl: './eleitor-form.component.html',
  styleUrls: ['./eleitor-form.component.css'],
})
export class EleitorFormComponent implements OnInit {

  eleitor:Eleitor;
  pessoa:Pessoa;
  idEleicaoAtiva:number;
  eleitorForm!: FormGroup;
  logged: boolean = false;
  cpfMask = CPF_MASK;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private pessoaService: PessoaService, private eleitorService: EleitorService,
    private snackbarService: SnackbarService, private router: Router,
    private storageService:StorageService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    const id = this.route.snapshot.params.id;
    this.idEleicaoAtiva = Number(this.storageService.getItem(ELEICAO_ATIVA));

    this.eleitorForm = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', []],
      endereco: ['', []],
      email: ['', [Validators.required]],
      telefone: ['', []]
    });

    if(id){
      this.eleitorService.buscarEleitorPorId(id).subscribe(a => {
        this.eleitor = a;
        this.pessoa = a.pessoa;
        this.eleitorForm.get('cpf').setValue(a.pessoa.cpf+"");
        this.eleitorForm.get('nome').setValue(a.pessoa.nome);
        this.eleitorForm.get('dataNascimento').setValue(a.pessoa.dataNascimento);
        this.eleitorForm.get('genero').setValue(a.pessoa.genero);
        this.eleitorForm.get('endereco').setValue(a.pessoa.endereco);
        this.eleitorForm.get('email').setValue(a.pessoa.email);
        this.eleitorForm.get('telefone').setValue(a.pessoa.telefone);
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
    if (!this.eleitorForm.valid) {
      return;
    }
    let eleitorDTO = {id: null, pessoa: {...this.eleitorForm.value}, eleicao:{id: this.idEleicaoAtiva}};
    if(this.pessoa){
      eleitorDTO.pessoa.id = this.pessoa.id;
    }
    eleitorDTO.pessoa.cpf = somenteNumeros(eleitorDTO.pessoa.cpf);


    if(this.eleitor){
      eleitorDTO.id = this.eleitor.id;
      this.eleitorService.atualizar(eleitorDTO).subscribe(resp =>{
        this.router.navigate(['/eleitor']);
        this.snackbarService.success('Eleitor atualizado com sucesso');
      });
    } else {
      this.eleitorService.cadastrar(eleitorDTO).subscribe(resp =>{
        this.router.navigate(['/eleitor']);
        this.snackbarService.success('Eleitor cadastrado com sucesso');
      });
    }

  }

  pesquisar(event){
    event.preventDefault();
    this.pessoaService.buscarPessoaPeloCpf(
      somenteNumeros(this.eleitorForm.get('cpf').value))
      .subscribe(p => {
        if(p){
        this.pessoa = p;
        this.eleitorForm.get('nome').setValue(p.nome);
        this.eleitorForm.get('dataNascimento').setValue(p.dataNascimento);
        this.eleitorForm.get('genero').setValue(p.genero);
        this.eleitorForm.get('endereco').setValue(p.endereco);
        this.eleitorForm.get('email').setValue(p.email);
        this.eleitorForm.get('telefone').setValue(p.telefone);
        } else {
          this.pessoa = null;
        }
      });
  }

  voltar(){
    this.router.navigate(['/eleitor']);
  }
}

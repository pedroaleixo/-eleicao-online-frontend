import { SnackbarService } from './../../../../core/services/snackbar.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { PessoaService } from '../../services/pessoa.service';
import { somenteNumeros } from 'src/app/core/util/string.util';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
})
export class PessoaFormComponent implements OnInit {

  pessoaForm!: FormGroup;

  logged: boolean = false;

  public cpfMask = [ /\d/ , /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '-', /\d/, /\d/,];

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private pessoaService: PessoaService, private snackbarService: SnackbarService,
    private router: Router) {}

  ngOnInit(): void {
    this.pessoaForm = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', []],
      endereco: ['', []],
      email: ['', [Validators.required]],
      telefone: ['', []]
    });

    this.userService.getUser().subscribe(r => {
      if(r && r.perfis && r.perfis.length > 0) {
        this.logged = true;
      } else {
        this.logged = false;
      }
    });
  }

  salvar() {
    if (!this.pessoaForm.valid) {
      return;
    }
    let pessoaDTO = {...this.pessoaForm.value};
    pessoaDTO.cpf = somenteNumeros(pessoaDTO.cpf);


    if(!this.logged){
      this.pessoaService.cadastrarPublico(pessoaDTO).subscribe(pes => {
        this.pessoaService.gerarTokenPessoa(pes.id).subscribe(token => {
          this.userService.setToken(token)
          this.router.navigate(['/votacao']);
          this.snackbarService.success('Pessoa cadastrada com sucesso');
      });
      });
    } else {
      this.pessoaService.cadastrar(pessoaDTO).subscribe(resp =>{
        this.snackbarService.success('Pessoa cadastrada com sucesso');
      });
    }

  }

  voltarAdmin(){
    this.router.navigate(['/admin']);
  }
}

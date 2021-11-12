
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
})
export class PessoaFormComponent implements OnInit {

  pessoaForm!: FormGroup;

  showBotaoVoltar: boolean = false;

  public cpfMask = [ /\d/ , /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '-', /\d/, /\d/,];

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private pessoaService: PessoaService, private router: Router) {}

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
        this.showBotaoVoltar = true;
      } else {
        this.showBotaoVoltar = false;
      }
    });
  }

  salvar() {
    if (!this.pessoaForm.valid) {
      return;
    }
    this.pessoaService
    console.log(this.pessoaForm.value);
  }

  voltarAdmin(){
    this.router.navigate(['/admin']);
  }
}

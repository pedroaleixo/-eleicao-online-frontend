import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css'],
})
export class PessoaFormComponent implements OnInit {

  pessoaForm!: FormGroup;


  public cpfMask = [ /\d/ , /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/ , /\d/, /\d/, '-', /\d/, /\d/,];

  constructor(private formBuilder: FormBuilder) {}

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
  }

  salvar() {
    if (!this.pessoaForm.valid) {
      return;
    }
    console.log(this.pessoaForm.value);
  }
}

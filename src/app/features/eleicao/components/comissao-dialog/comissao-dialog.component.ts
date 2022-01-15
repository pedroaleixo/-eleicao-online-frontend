import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CPF_MASK } from 'src/app/core/util/masks';
import { somenteNumeros } from 'src/app/core/util/string.util';
import { Pessoa } from 'src/app/features/pessoa/interfaces/pessoa';
import { PessoaService } from 'src/app/features/pessoa/services/pessoa.service';

@Component({
  selector: 'app-comissao-dialog',
  templateUrl: './comissao-dialog.component.html',
  styleUrls: ['./comissao-dialog.component.css']
})
export class ComissaoDialogComponent implements OnInit {

  comissaoDialogForm!: FormGroup;
  membros:Pessoa[] = [];
  membroEditado:Pessoa;
  pessoa:Pessoa;
  cpfMask = CPF_MASK;

  constructor(private pessoaService: PessoaService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ComissaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {
      this.membros = data.membros;
      this.membroEditado = data.membroEditado;
  }

  ngOnInit(): void {
    this.comissaoDialogForm = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', []],
      endereco: ['', []],
      email: ['', [Validators.required]],
      telefone: ['', []]
    });

    if(this.membroEditado){
      this.comissaoDialogForm.get('cpf').setValue(this.membroEditado.cpf+"");
      this.comissaoDialogForm.get('nome').setValue(this.membroEditado.nome);
      this.comissaoDialogForm.get('dataNascimento').setValue(this.membroEditado.dataNascimento);
      this.comissaoDialogForm.get('genero').setValue(this.membroEditado.genero);
      this.comissaoDialogForm.get('endereco').setValue(this.membroEditado.endereco);
      this.comissaoDialogForm.get('email').setValue(this.membroEditado.email);
      this.comissaoDialogForm.get('telefone').setValue(this.membroEditado.telefone);
    }
  }

  adicionar(){
    if (!this.comissaoDialogForm.valid) {
      return;
    }

    if(this.membroEditado){
      this.membros.forEach(c => {
        if((this.membroEditado.id && c.id === this.membroEditado.id)
        || (!this.membroEditado.id && c.cpf === this.membroEditado.cpf)){
          c.id = this.pessoa ? this.pessoa.id : null;
          c.cpf = somenteNumeros(this.comissaoDialogForm.get('cpf').value);
          c.nome = this.comissaoDialogForm.get('nome').value;
          c.dataNascimento = this.comissaoDialogForm.get('dataNascimento').value;
          c.genero = this.comissaoDialogForm.get('genero').value;
          c.endereco = this.comissaoDialogForm.get('endereco').value;
          c.email = this.comissaoDialogForm.get('email').value;
          c.telefone = this.comissaoDialogForm.get('telefone').value;
        }
      })
    } else {
      this.membros.push({...this.comissaoDialogForm.value,
        id: this.pessoa ? this.pessoa.id : null,
        cpf: somenteNumeros(this.comissaoDialogForm.get('cpf').value)});
    }

    this.dialogRef.close({data: this.membros});
  }

  pesquisar(event){
    event.preventDefault();
    this.pessoaService.buscarPessoaPeloCpf(
      somenteNumeros(this.comissaoDialogForm.get('cpf').value))
      .subscribe(p => {
        if(p){
        this.pessoa = p;
        this.comissaoDialogForm.get('nome').setValue(p.nome);
        this.comissaoDialogForm.get('dataNascimento').setValue(p.dataNascimento);
        this.comissaoDialogForm.get('genero').setValue(p.genero);
        this.comissaoDialogForm.get('endereco').setValue(p.endereco);
        this.comissaoDialogForm.get('email').setValue(p.email);
        this.comissaoDialogForm.get('telefone').setValue(p.telefone);
        }
      });
  }
}

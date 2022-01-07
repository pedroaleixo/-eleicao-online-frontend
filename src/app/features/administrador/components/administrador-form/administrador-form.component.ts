import { SnackbarService } from './../../../../core/services/snackbar.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { somenteNumeros } from 'src/app/core/util/string.util';
import { StorageService } from 'src/app/core/services/storage.service';
import { CPF_MASK } from 'src/app/core/util/masks';
import { Administrador } from '../../interfaces/administrador';
import { AdministradorService } from '../../services/administrador.service';

@Component({
  selector: 'app-administrador-form',
  templateUrl: './administrador-form.component.html',
  styleUrls: ['./administrador-form.component.css'],
})
export class AdministradorFormComponent implements OnInit {

  administrador:Administrador;
  administradorForm!: FormGroup;
  logged: boolean = false;
  cpfMask = CPF_MASK;

  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private storageService: StorageService, private administradorService: AdministradorService,
    private snackbarService: SnackbarService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {

    const id = this.route.snapshot.params.id;

    this.administradorForm = this.formBuilder.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      genero: ['', []],
      endereco: ['', []],
      email: ['', [Validators.required]],
      telefone: ['', []]
    });

    if(id){
      this.administradorService.buscarAdministradorPorId(id).subscribe(a => {
        this.administrador = a;
        this.administradorForm.get('cpf').setValue(a.pessoa.cpf+"");
        this.administradorForm.get('nome').setValue(a.pessoa.nome);
        this.administradorForm.get('dataNascimento').setValue(a.pessoa.dataNascimento);
        this.administradorForm.get('genero').setValue(a.pessoa.genero);
        this.administradorForm.get('endereco').setValue(a.pessoa.endereco);
        this.administradorForm.get('email').setValue(a.pessoa.email);
        this.administradorForm.get('telefone').setValue(a.pessoa.telefone);
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
    if (!this.administradorForm.valid) {
      return;
    }
    let administradorDTO = {...this.administradorForm.value};
    administradorDTO.cpf = somenteNumeros(administradorDTO.cpf);


    if(this.administrador){
      administradorDTO.id = this.administrador.id;
      this.administradorService.atualizar(administradorDTO).subscribe(resp =>{
        this.router.navigate(['/administrador']);
        this.snackbarService.success('Administrador atualizado com sucesso');
      });
    } else {
      this.administradorService.cadastrar(administradorDTO).subscribe(resp =>{
        this.router.navigate(['/administrador']);
        this.snackbarService.success('Administrador cadastrado com sucesso');
      });
    }

  }

  voltar(){
    this.router.navigate(['/administrador']);
  }
}

import { EleicaoService } from './../../../features/eleicao/services/eleicao.service';
import { Component, OnInit } from '@angular/core';
import { Eleicao } from 'src/app/features/eleicao/interfaces/eleicao';
import { UserService } from 'src/app/core/services/user.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ELEICAO_ATIVA } from 'src/app/core/util/constants';

@Component({
  selector: 'app-eleicao-ativa-dialog',
  templateUrl: './eleicao-ativa-dialog.component.html',
  styleUrls: ['./eleicao-ativa-dialog.component.css']
})
export class EleicaoAtivaDialogComponent implements OnInit {

  eleicoes: Eleicao[] = [];
  eleicaoSelecionada!:number;

  constructor(private eleicaoService: EleicaoService, private userService:UserService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      if(user && user.pessoa){
        this.eleicaoService.listarEleicoesPorPessoaMembroComissao(user.pessoa)
        .subscribe(els => {
          this.eleicoes = els;
        });
      }
    });

  }

  selecionarEleicao(evento:any){
    this.eleicaoSelecionada = evento.value;
  }

  confirmar(){
    if(this.eleicaoSelecionada){
      this.storageService.setItem(ELEICAO_ATIVA, this.eleicaoSelecionada.toString());
    }
  }

}

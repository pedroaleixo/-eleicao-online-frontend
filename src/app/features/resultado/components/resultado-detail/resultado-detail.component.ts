import { CandidatoService } from './../../../candidato/services/candidato.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Candidato } from 'src/app/features/candidato/interfaces/candidato';
import { Eleicao } from 'src/app/features/eleicao/interfaces/eleicao';
import { ActivatedRoute, Router } from '@angular/router';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';
import { Cargo } from 'src/app/features/eleicao/interfaces/cargo';
import { exportarElementoParaPDF } from 'src/app/core/util/pdf.util';

@Component({
  selector: 'app-resultado-detail',
  templateUrl: './resultado-detail.component.html',
  styleUrls: ['./resultado-detail.component.css']
})
export class ResultadoDetailComponent implements OnInit {

  eleicao:Eleicao;
  candidatos: Candidato[];
  displayedColumns: string[] = ['nome','votos'];
  dataSource = new MatTableDataSource<Candidato>();
  pageEvent!: PageEvent;
  pageIndex: number = 0;
  pageSize:number = 5;
  length!:number;

  constructor(private eleicaoService:EleicaoService, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;

    this.eleicaoService.buscarEleicaoPorId(id).subscribe(eleicao => {
      this.eleicao = eleicao;

      this.eleicaoService.listarCandidatosEleicao(id).subscribe(candidatos => {
        this.candidatos = candidatos;
      });
    });
  }

  getBlocos(){
    const blocos = new Map<String, Candidato[]>();

    this.candidatos = this.candidatos.filter(c => !c.branco).concat(this.candidatos.filter(c => c.branco))

    this.candidatos?.forEach(c => {
      if(blocos.has(c.cargo.nome)){
        blocos.get(c.cargo.nome).push(c);
      } else {
        blocos.set(c.cargo.nome, [c]);
      }
   });

   return blocos.entries();
  }

  exportar() {
    exportarElementoParaPDF('resultado','resultado-eleicao-'+this.eleicao.nome);
  }

  voltar(){
    this.router.navigate(['/resultado']);
  }

}

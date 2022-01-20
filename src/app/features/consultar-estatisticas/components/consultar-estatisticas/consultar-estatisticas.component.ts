import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ELEICAO_ATIVA } from 'src/app/core/util/constants';
import { getValoresTiposEstatisticas } from 'src/app/core/util/enum.util';
import { exportarElementoParaPDF } from 'src/app/core/util/pdf.util';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';

@Component({
  selector: 'app-consultar-estatisticas',
  templateUrl: './consultar-estatisticas.component.html',
  styleUrls: ['./consultar-estatisticas.component.css'],
})
export class ConsultarEstatisticasComponent implements OnInit {
  idEleicaoAtiva: number;
  exibirForm!: FormGroup;
  tipos = [];
  pieData: any;
  basicOptions: any;

  constructor(
    private formBuilder: FormBuilder,
    private eleicaoService: EleicaoService,
    private snackbarService: SnackbarService,
    private storageService: StorageService,
    private router: Router
  ) {}


  ngOnInit(): void {

    this.idEleicaoAtiva = Number(this.storageService.getItem(ELEICAO_ATIVA));

    this.tipos = getValoresTiposEstatisticas();

    this.exibirForm = this.formBuilder.group({
      tipo: ['', Validators.required],
    });

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      }
    };
  }

  exibir() {
    this.eleicaoService
      .buscarEstatisticaEleicao(
        this.idEleicaoAtiva,
        this.exibirForm.get('tipo').value
      )
      .subscribe((e) => {
        const labels = [];
        const data = [];
        e.registros.forEach(r => {
          labels.push(r.label);
          data.push(r.percentual);
        });

        this.pieData = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: [
                "#d0cece",
                "#5b9bd5",
                "#70ad47",
                "#f4fc03",
                "#f52702"
              ]
            }
          ]
        };
      });
  }

  exportar() {
    exportarElementoParaPDF('estatistica','estatisticas');
  }

  voltar() {
    this.router.navigate(['/admin']);
  }
}

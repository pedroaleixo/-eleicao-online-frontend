import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-votacao-list',
  templateUrl: './votacao-list.component.html',
  styleUrls: ['./votacao-list.component.css']
})
export class VotacaoListComponent implements OnInit {

  eleicao!:number;

  constructor(private route: ActivatedRoute) {
    this.eleicao = this.route.snapshot.params.eleicao;
  }

  ngOnInit(): void {
  }

}

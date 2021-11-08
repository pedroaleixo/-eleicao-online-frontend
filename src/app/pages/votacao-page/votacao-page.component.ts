import { TokenService } from '../../core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-votacao-page',
  templateUrl: './votacao-page.component.html',
  styleUrls: ['./votacao-page.component.css']
})
export class VotacaoPageComponent implements OnInit {

  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.tokenService.removeToken();
  }

}

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login-votacao-page',
  templateUrl: './login-votacao-page.component.html',
  styleUrls: ['./login-votacao-page.component.css']
})
export class LoginVotacaoPageComponent implements OnInit {

  constructor(private storageService:StorageService) { }

  ngOnInit(): void {
  }

  loginGoogle(): void {
    this.storageService.setItem("ambiente", "votacao");
    window.location.href="https://localhost:8443/oauth2/authorization/google";
  }

  loginFacebook(): void {
    this.storageService.setItem("ambiente", "votacao");
    window.location.href="https://localhost:8443/oauth2/authorization/facebook";
  }

}

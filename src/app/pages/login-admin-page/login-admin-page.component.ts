import { TokenService } from './../../core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login-admin-page',
  templateUrl: './login-admin-page.component.html',
  styleUrls: ['./login-admin-page.component.css']
})
export class LoginAdminPageComponent implements OnInit {

  constructor(private storageService:StorageService) { }

  ngOnInit(): void {
  }

  loginGoogle(): void {
    this.storageService.setItem("ambiente", "admin");
    window.location.href="https://localhost:8443/oauth2/authorization/google";
  }

  loginFacebook(): void {
    this.storageService.setItem("ambiente", "admin");
    window.location.href="https://localhost:8443/oauth2/authorization/facebook";
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { UserService } from 'src/app/core/services/user.service';
import { AMBIENTE } from 'src/app/core/util/constants';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-login-votacao-page',
  templateUrl: './login-votacao-page.component.html',
  styleUrls: ['./login-votacao-page.component.css']
})
export class LoginVotacaoPageComponent implements OnInit {

  constructor(private storageService:StorageService,
    private userService:UserService, private router: Router) { }

  ngOnInit(): void {
    if(this.userService.isLogged()){
      this.router.navigate(['/votacao']);
    }
  }

  loginGoogle(): void {
    this.storageService.setItem(AMBIENTE, "votacao");
    window.location.href=`${environment.apiUrl}/oauth2/authorization/google`;
  }

  loginFacebook(): void {
    this.storageService.setItem(AMBIENTE, "votacao");
    window.location.href=`${environment.apiUrl}/oauth2/authorization/facebook`;
  }

}

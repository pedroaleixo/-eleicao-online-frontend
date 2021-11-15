import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthVotacaoGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.userService.isLogged() || this.tokenService.isExpired()){
      this.router.navigate(['login-votacao']);
      return false;
    } else if(!this.userService.getRoles() || this.userService.getRoles()?.length === 0){
      this.router.navigate(['/public/pessoa/form']);
      this.snackbarService.warning('Usuário não se encontra cadastro no sistema, por favor realize o cadastro antes de acessar');
      return false;
    }
    return true;
  }
}

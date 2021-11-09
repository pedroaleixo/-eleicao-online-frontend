import { SnackbarService } from './../services/snackbar.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthAdminGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.userService.isLogged() || this.tokenService.isExpired()) {
      this.router.navigate(['login-admin']);
      return false;
    } else if(!(this.userService.isAdmin() || this.userService.isComissao())){
      this.router.navigate(['login-admin']);
      this.snackbarService.warning('Usuário não tem permissão para acessar o módulo de administração');
      return false;
    }
    return true;
  }
}

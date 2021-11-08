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
export class AuthVotacaoGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private route: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if(!this.userService.isLogged() || this.tokenService.isExpired()){
      this.route.navigate(['login-votacao']);
      return false;
    } else if(!this.userService.getRoles()){
      this.route.navigate(['pessoa']);
      return false;
    }
    return true;
  }
}

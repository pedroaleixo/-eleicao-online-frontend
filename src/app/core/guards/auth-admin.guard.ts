import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';


@Injectable({ providedIn: 'root'})
export class AuthAdminGuard implements CanActivate {

    constructor(private userService: UserService, private route: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
       if(!this.userService.isLogged()){
            this.route.navigate(['login-admin']);
            return false;
       }
        return true;
    }


}

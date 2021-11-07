import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { TokenService } from './token.service';
import jwtDecode from 'jwt-decode';
import { Roles } from '../enums/roles';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private username: string | undefined;
  private roles: string[] | undefined;
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(private tokenService: TokenService) {
    this.tokenService.hasToken() && this.decodeAndNotify();
  }

  setToken(token: string | null): void {
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  logout(): void {
    this.tokenService.removeToken();
    this.userSubject.next(null);
  }

  isLogged(): boolean {
    return this.tokenService.hasToken();
  }

  getUsername(): string | undefined {
    return this.username;
  }

  getRoles(): string[] | undefined {
    return this.roles;
  }

  hasRoles(...rolesParam: string[]): boolean {
    for (const r of rolesParam) {
      if (this.roles && this.roles.includes(r)) {
        return true;
      }
    }
    return false;
  }

  isAdmin(): boolean {
    if (this.roles && this.roles.includes(Roles.ADMINISTRADOR)) {
      return true;
    }
    return false;
  }

  isComissao(): boolean {
    if (this.roles && this.roles.includes(Roles.COMISSAO)) {
      return true;
    }
    return false;
  }

  isEleitor(): boolean {
    if (this.roles && this.roles.includes(Roles.ELEITOR)) {
      return true;
    }
    return false;
  }

  private decodeAndNotify() {
    const token = this.tokenService.getToken();
    if (token) {
      const user = jwtDecode(token) as User;
      this.username = user.sub;
      this.roles = user.perfis;
      this.userSubject.next(user);
    }
  }
}

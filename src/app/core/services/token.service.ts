import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { AMBIENTE } from '../util/constants';

const KEY = 'token';

@Injectable({ providedIn: 'root' })
export class TokenService {
  hasToken(): boolean {
    return !!window.localStorage.getItem(KEY);
  }

  setToken(token: string | null) {
    window.localStorage.setItem(KEY, token as string);
  }

  getToken(): string | null {
    return window.localStorage.getItem(KEY);
  }

  removeToken(): void {
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(AMBIENTE);
  }

  isExpired(): boolean {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp < new Date().getTime() / 1000) {
        return true;
      }
    }
    return false;
  }
}

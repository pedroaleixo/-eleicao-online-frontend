import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({providedIn: 'root'})
export class TokenService {

    hasToken() : boolean {
        return !!window.localStorage.getItem(KEY);
    }

    setToken(token: string | null) {
        window.localStorage.setItem(KEY, token as string);
    }

    getToken(): string | null {
        return window.localStorage.getItem(KEY);
    }

    removeToken() : void {
        window.localStorage.removeItem(KEY);
    }

}

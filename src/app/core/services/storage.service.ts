import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  setItem(key: string | null, value: string | null) {
    window.localStorage.setItem(key as string, value as string);
  }

  getItem(key: string | null): string | null {
    return window.localStorage.getItem(key as string);
  }

  removeItem(key: string | null): void {
    window.localStorage.removeItem(key as string);
  }
}

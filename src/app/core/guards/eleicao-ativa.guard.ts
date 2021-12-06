import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { StorageService } from '../services/storage.service';
import { ELEICAO_ATIVA } from '../util/constants';

@Injectable({ providedIn: 'root' })
export class EleicaoAtivaGuard implements CanActivate {
  constructor(
    private storageService: StorageService,
    private snackbarService: SnackbarService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if(!this.storageService.getItem(ELEICAO_ATIVA)){
      this.snackbarService.warning("Selecione uma eleição ativa para acessar essa seção");
      return false;
    }
    return true;
  }
}

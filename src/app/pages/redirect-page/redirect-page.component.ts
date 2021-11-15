import { StorageService } from './../../core/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { SnackbarService } from 'src/app/core/services/snackbar.service';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
})
export class RedirectPageComponent implements OnInit {
  constructor(
    private storageService: StorageService,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const ambiente = this.storageService.getItem('ambiente');

      if (params.token) {
        this.userService.setToken(params.token);

        if (ambiente === 'admin') {
          this.router.navigate(['/admin']);
        } else if (ambiente === 'votacao') {
          this.router.navigate(['/votacao']);
        }
      } else {
        if (ambiente === 'admin') {
          this.router.navigate(['/login-admin']);
        } else if (ambiente === 'votacao') {
          this.router.navigate(['/public/pessoa/form']);
          this.snackbarService.warning('Usuário não se encontra cadastro no sistema, por favor realize o cadastro antes de acessar');
        }
      }
    });
  }
}

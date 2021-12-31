import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { StorageService } from 'src/app/core/services/storage.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';
import { ELEICAO_ATIVA } from 'src/app/core/util/constants';
import { Eleicao } from 'src/app/features/eleicao/interfaces/eleicao';
import { EleicaoService } from 'src/app/features/eleicao/services/eleicao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  showLogout: boolean = false;
  showMenu: boolean = false;
  isMenuOpen: boolean = false;
  eleicoes:Eleicao[] = [];

  constructor(
    private storageService: StorageService,
    private tokenService: TokenService,
    private userService: UserService,
    private eleicaoService: EleicaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((r) => {
      if (r && r.perfis && r.perfis.length > 0) {
        if (!this.tokenService.isExpired()) {
          this.showLogout = true;
          const ambiente = this.storageService.getItem('ambiente');
          if (this.userService.isAdmin() && ambiente === 'admin') {
            this.showMenu = true;
            this.eleicaoService.listarEleicoes().pipe(take(1))
              .subscribe(eles => this.eleicoes = eles);
          } else if (this.userService.isComissao() && ambiente === 'admin'){
            this.showMenu = true;
            this.eleicaoService.listarEleicoesPorPessoaMembroComissao(r.pessoa).pipe(take(1))
              .subscribe(eles => this.eleicoes = eles);
          } else {
            this.showMenu = false;
          }
        }
      } else {
        this.showLogout = false;
      }
    });
  }

  logout() {
    this.userService.logout();
    location.reload();
  }

  toogleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  goToHome() {
    this.router.navigate(['/redirect']);
  }

  selecionarEleicao(event:any){
    if(event && event.value){
      this.storageService.setItem(ELEICAO_ATIVA, event.value);
    } else {
      this.storageService.removeItem(ELEICAO_ATIVA);
    }
  }
}

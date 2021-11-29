import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showLogout: boolean = false;
  showMenu: boolean = false;
  isMenuOpen: boolean = false;

  constructor(
    private storageService: StorageService,
    private tokenService: TokenService,
    private userService: UserService,
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
}

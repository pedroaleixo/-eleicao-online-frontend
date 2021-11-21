import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showLogout: boolean = false;

  constructor(private tokenService: TokenService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(r => {
      if(r && r.perfis && r.perfis.length > 0) {
        if(!this.tokenService.isExpired()){
          this.showLogout = true;
        }
      } else {
        this.showLogout = false;
      }
    });
  }

  logout(){
    this.userService.logout();
    location.reload();
  }
}

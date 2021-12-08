import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private userService:UserService, private router: Router) { }

  ngOnInit(): void {
  }

  irPara(page:string){
    this.router.navigate([page]);
  }

  isComissao(): boolean{
    return this.userService.isComissao();
  }

}

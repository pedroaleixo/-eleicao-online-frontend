import { ELEICAO_ATIVA } from './../../core/util/constants';
import { TokenService } from './../../core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { EleicaoAtivaDialogComponent } from './eleicao-ativa-dialog/eleicao-ativa-dialog.component';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private userService:UserService, private storageService:StorageService,
    public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => {
      if(this.userService.isComissao() && !this.storageService.getItem(ELEICAO_ATIVA)){
        const dialogRef = this.dialog.open(EleicaoAtivaDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
          if(result){
          }
        });
      }
    });
  }

  irPara(page:string){
    this.router.navigate([page]);
  }

}

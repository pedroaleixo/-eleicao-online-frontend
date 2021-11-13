import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  ticket:string = "";

  constructor(private route: ActivatedRoute) {
    this.ticket = this.route.snapshot.params.ticket;
  }

  ngOnInit() : void{

  }

}

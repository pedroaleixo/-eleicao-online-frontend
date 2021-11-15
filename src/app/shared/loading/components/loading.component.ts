import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoadingType } from '../enums/loading-type';
import { LoadingService } from '../services/loading.service';


@Component({
    selector: 'ap-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    loading: string = LoadingType.STOPPED.valueOf();

    constructor(private loadingService: LoadingService){}

    ngOnInit(): void {
        this.loadingService
        .getLoading().subscribe(loadingType => {
          this.loading = loadingType.valueOf();
        });
    }

}

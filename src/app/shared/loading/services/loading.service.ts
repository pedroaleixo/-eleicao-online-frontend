import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { LoadingType } from '../enums/loading-type';


@Injectable({providedIn: 'root'})
export class LoadingService {

    loading = new Subject<LoadingType>();

    getLoading(){
        return this.loading
        .asObservable()
        .pipe(startWith(LoadingType.STOPPED));
    }

    start(){
        this.loading.next(LoadingType.LOADING);
    }

    stop(){
        this.loading.next(LoadingType.STOPPED);
    }

}

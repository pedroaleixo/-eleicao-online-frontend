import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from 'src/app/shared/loading/services/loading.service';
import { TokenService } from '../services/token.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenService, private loadingService: LoadingService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.tokenService.hasToken()){
            const token = this.tokenService.getToken();
            if(token){
              req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` }  });
            }
        }
        return next.handle(req)
        .pipe(tap(event => {
          if(event instanceof HttpResponse){
              this.loadingService.stop();
          } else {
              this.loadingService.start();
          }
      }));
    }

}

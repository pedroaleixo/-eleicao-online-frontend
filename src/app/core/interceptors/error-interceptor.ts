import { SnackbarService } from './../services/snackbar.service';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private snackbarService: SnackbarService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {

        switch (error.status) {
          case 403:
            this.snackbarService.error("Acesso negado ao serviço");
            break;
          case 409:
            this.snackbarService.error(JSON.parse(error?.error).mensagem);
            break;
          case 422:
            const violations = [...error?.error?.violations];
            const messages = violations.map(v => {
              return v.fieldName +": "+ v.message;
            });
            this.snackbarService.error(messages.join(', '));
            break;
          case 500:
            this.router.navigate(['/error', error?.error?.ticket]);
            break;
          default:
        }

        return throwError(error.error.message);
      })
    );

  }
}

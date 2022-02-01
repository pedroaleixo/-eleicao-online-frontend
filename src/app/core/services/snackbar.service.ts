import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IconSnackbarComponent } from 'src/app/shared/icon-snackbar/icon-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}

  show(message: string, type: string): void {
    this.zone.run(() => {
      let icon;
      if(type === 'warning'){
        icon = 'warning';
      } else if(type === 'success'){
        icon = 'check_circle';
      } else if(type === 'error'){
        icon = 'error';
      }

      this.snackbar.openFromComponent(IconSnackbarComponent, {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 4000,
        panelClass: ['snackbar-container', type],
        data: {
          message: message,
          icon: icon
        }
      });

      /*this.snackbar.open(message, 'x', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 4000,
        panelClass: ['snackbar-container', type],
      });*/
    });
  }

  warning(message: string): void {
    this.show(message, 'warning');
  }

  error(message: string): void {
    this.show(message, 'error');
  }

  success(message: string): void {
    this.show(message, 'success');
  }
}

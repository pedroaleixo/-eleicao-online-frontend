import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar, private zone: NgZone) {}

  show(message: string, type: string): void {
    this.zone.run(() => {
      this.snackbar.open(message, 'x', {
        verticalPosition: 'top',
        horizontalPosition: 'right',
        duration: 4000,
        panelClass: ['snackbar-container', type],
      });
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

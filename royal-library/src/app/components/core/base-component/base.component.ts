import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-component',
  standalone: true,
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {

  constructor(
    protected router: Router,
    protected snackBar: MatSnackBar
  ) { }

  openPage(routename: string) {
    this.router.navigateByUrl(`/${routename}`);
  }

  showSnackBar(
    message: string,
    position: MatSnackBarVerticalPosition = 'bottom',
    selectedDuration: number = 3000) {
    this.snackBar.open(message, null, {
      duration: selectedDuration,
      verticalPosition: position
    });
  }
}

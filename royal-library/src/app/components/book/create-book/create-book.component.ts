import { Component, Input } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Book } from '../../../model/book';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BookService } from '../../../services/book/book.service';
import { SharedFormService } from '../../../services/shared-form.service';
import { BaseFormBookComponent } from '../base-book-form/base-book-form.component';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseFormBookComponent
  ],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})

export class CreateBookComponent {

  isFormValid: Boolean = false

  constructor(
    private _snackBar: MatSnackBar,
    private _bookService: BookService,
    private _sharedFormService: SharedFormService
  ) {
    this._sharedFormService.onFormValidation.subscribe(isValid => {
      this.isFormValid = isValid
    })
  }

  book: Book = {
    id: 0,
    title: '',
    firstName: '',
    lastName: '',
    category: 'Fiction',
    isbn: '',
    totalCopies: 0,
    type: 'Paperback',
    authorId: 1,
    publisherId: 1
  }

  addBookErrorMessage = "Unfortunately, can't add the new book";

  getCurrentBook(currentBook: Book) {
    this.onSubmit(currentBook)
  }

  private onSubmit(selectedBook: Book) {
    let isValid = this.isFormValid
    if(!isValid) {
      this._snackBar.open('Please fill the form.', null, {
        duration: 3000
      });
      return
    }

    this._bookService.create(selectedBook)
      .subscribe({
        next: (response) =>
        {
          if(response.status == 200) {
            this.showSnackBar('The book was added successfully.', 'top')
            this._sharedFormService.emitOnClearForm(true)
          }
          else {
            this.showSnackBar(this.addBookErrorMessage, 'top')
          }
        },
        error: (e) => {
          this.showSnackBar(e.error, 'bottom')
        },
        complete: () => {}
      });
  }

  private showSnackBar(message: string, position: MatSnackBarVerticalPosition = 'bottom') {
    this._snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: position
    });
  }
}

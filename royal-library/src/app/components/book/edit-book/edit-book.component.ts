import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../model/book';
import { SharedFormService } from '../../../services/shared-form.service';
import { BaseFormBookComponent } from '../base-book-form/base-book-form.component';
import { BookService } from '../../../services/book/book.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [BaseFormBookComponent],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.css'
})
export class EditBookComponent {

  isFormValid: Boolean = false

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

  constructor(
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private _bookService: BookService,
    private _sharedFormService: SharedFormService
  ) {
      this._sharedFormService.onFormValidation.subscribe(isValid => {
        this.isFormValid = isValid
      })
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'))

    if(id) {
      this._bookService.getById(id)
        .subscribe({
          next: (response) =>
            {
              if(response.status == 200) {
                this.book = response.body as Book
              }
            },
            error: (e) => {
              this.showSnackBar(e.error, 'bottom')
            },
            complete: () => {}
        })
    }
  }

  getCurrentBook(currentBook: Book) {
    this.onSubmit(currentBook)
  }

  private addBookErrorMessage: string = "Unfortunately, can't update the book";

  private onSubmit(selectedBook: Book) {
    let isValid = this.isFormValid
    if(!isValid) {
      this._snackBar.open('Please fill the form.', null, {
        duration: 3000
      });
      return
    }

    this._bookService.edit(selectedBook)
      .subscribe({
        next: (response) =>
        {
          if(response.status == 200) {
            this.showSnackBar('The book was updated successfully.', 'top')
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

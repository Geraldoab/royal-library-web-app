import { Author } from './../../../model/author';
import { Component, Input } from '@angular/core';
import { SelectAuthorComponent } from '../../author/select-author/select-author.component';
import { SelectPublisherComponent } from '../../publisher/select-publisher/select-publisher.component';
import { MatCard } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCardActions } from '@angular/material/card';
import { MatCardImage } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatCardSubtitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Book } from '../../../model/book';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, Validators, ReactiveFormsModule, FormControl, Form } from '@angular/forms';
import { SelectBookCategoryComponent } from '../select-book-category/select-book-category.component';
import { SelectBookTypeComponent } from '../select-book-type/select-book-type.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../../../services/book/book.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [
    SelectAuthorComponent,
    SelectPublisherComponent,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardTitle,
    MatCardImage,
    MatButton,
    MatCardFooter,
    MatCardSubtitle,
    MatCardContent,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatLabel,
    MatFormField,
    CommonModule,
    MatInputModule,
    FormsModule,
    SelectBookCategoryComponent,
    SelectBookTypeComponent,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})

export class CreateBookComponent {

  titleFormControl = new FormControl('', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  ISBNFormControl = new FormControl('', [Validators.required]);
  addBookErrorMessage = "Unfortunately, can't add the new book."

  errorMessage = '';

  constructor(private _snackBar: MatSnackBar, private _bookService: BookService) {
    merge(this.titleFormControl.statusChanges, this.titleFormControl.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateTitleErrorMessage());

    merge(this.firstNameFormControl.statusChanges, this.firstNameFormControl.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateFirstNameErrorMessage());

    merge(this.lastNameFormControl.statusChanges, this.lastNameFormControl.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateLastNameErrorMessage());

    merge(this.ISBNFormControl.statusChanges, this.ISBNFormControl.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateISBNErrorMessage());
  }

  updateTitleErrorMessage() {
    if (this.titleFormControl.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    }
    else {
      this.errorMessage = '';
    }
  }

  updateFirstNameErrorMessage() {
    if (this.firstNameFormControl.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    }
    else {
      this.errorMessage = '';
    }
  }

  updateLastNameErrorMessage() {
    if (this.lastNameFormControl.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    }
    else {
      this.errorMessage = '';
    }
  }

  updateISBNErrorMessage() {
    if (this.ISBNFormControl.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    }
    else {
      this.errorMessage = '';
    }
  }

  book: Book = {
    id: 0,
    title: '',
    firstName: '',
    lastName: '',
    category: 'Fiction',
    ISBN: '',
    totalCopies: 0,
    type: 'Paperback',
    authorId: 1,
    publisherId: 1
  }

  getSelectedAuthorId(value: string) {
    this.book.authorId = Number.parseInt(value)
    console.log("Received author: " + this.book.authorId)
  }

  getSelectedPublisherId(value: string) {
    this.book.publisherId = Number.parseInt(value)
    console.log("Received publisher: " + this.book.publisherId)
  }

  getSelectedCategory(value: string) {
    this.book.category = value
    console.log("Received category: " + this.book.category)
  }

  getSelectedType(value: string) {
    this.book.type = value
    console.log("Received type: " + this.book.type)
  }

  onSubmit() {
    let isValid = this.isFormValid()
    if(!isValid) {
      this._snackBar.open('Please fill the form.', null, {
        duration: 3000
      });
      return
    }

    this.book.title = this.titleFormControl.value
    this.book.firstName = this.firstNameFormControl.value
    this.book.lastName = this.lastNameFormControl.value
    this.book.ISBN = this.ISBNFormControl.value

    this._bookService.create(this.book)
      .subscribe({
        next: (response) =>
        {
          if(response.status == 200) {
            this._snackBar.open('The book was created successfully.', null, {
              duration: 3000,
              verticalPosition: 'top'
            });

            this.cleanForm()
          }
          else {
            this._snackBar.open(this.addBookErrorMessage, null, {
              duration: 3000,
              verticalPosition: 'top'
            });
          }
        },
        error: (e) => {
          this._snackBar.open(this.addBookErrorMessage, null, {
            duration: 3000,
            verticalPosition: 'top'
          });
        },
        complete: () => {}
      });
  }

  private cleanForm() {
    this.titleFormControl.reset()
    this.ISBNFormControl.reset();
    this.firstNameFormControl.reset();
    this.lastNameFormControl.reset();
    this.book.totalCopies = 0;
    this.book.category = 'Fiction';
    this.book.type = 'Paperback';
    this.book.authorId = 1;
    this.book.publisherId = 1;
  }

  private isFormValid() : boolean {
    let isValid: boolean = true;

    if(!this.titleFormControl.valid || !this.firstNameFormControl ||
      !this.lastNameFormControl.valid || !this.ISBNFormControl.valid) {
      isValid = false;
    }

    return isValid;
  }
}

import { Book } from '../../../model/book';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
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
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, Validators, ReactiveFormsModule, FormControl, Form } from '@angular/forms';
import { SelectBookCategoryComponent } from '../select-book-category/select-book-category.component';
import { SelectBookTypeComponent } from '../select-book-type/select-book-type.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedFormService } from '../../../services/shared-form.service';

@Component({
  selector: 'app-base-form-book',
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
  templateUrl: './base-book-form.component.html',
  styleUrl: './base-book-form.component.css'
})
export class BaseFormBookComponent {

  @Input()
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

  errorMessage = '';

  titleFormControl = new FormControl('', [Validators.required]);
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  ISBNFormControl = new FormControl('', [Validators.required]);

  constructor(
    private _sharedFormService: SharedFormService
  ) {
    this._sharedFormService.onClearForm.subscribe((shouldClear)=> {
      if(shouldClear) {
        this.cleanForm()
      }
    })

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

  ngOnChanges(changes: SimpleChanges) {
    this.titleFormControl.setValue(this.book.title);
    this.firstNameFormControl.setValue(this.book.firstName);
    this.lastNameFormControl.setValue(this.book.lastName);
    this.ISBNFormControl.setValue(this.book.isbn);
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

  getSelectedAuthorId(value: string) {
    this.book.authorId = Number.parseInt(value)
  }

  getSelectedPublisherId(value: string) {
    this.book.publisherId = Number.parseInt(value)
  }

  getSelectedCategory(value: string) {
    this.book.category = value
  }

  getSelectedType(value: string) {
    this.book.type = value
  }

  @Output() newBookEvent = new EventEmitter<Book>()

  onSubmit() {
    this._sharedFormService.emitOnFormValidation(this.isFormValid());

    this.book.title = this.titleFormControl.value
    this.book.firstName = this.firstNameFormControl.value
    this.book.lastName = this.lastNameFormControl.value
    this.book.isbn = this.ISBNFormControl.value

    this.newBookEvent.emit(this.book);
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

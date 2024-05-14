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
import { FormsModule } from '@angular/forms';
import { SelectBookCategoryComponent } from '../select-book-category/select-book-category.component';
import { SelectBookTypeComponent } from '../select-book-type/select-book-type.component';

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
    SelectBookTypeComponent
  ],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})

export class CreateBookComponent {

  book: Book = {
    title: '',
    firstName: '',
    lastName: '',
    category: 'Fiction',
    ISBN: '',
    totalCopies: 0,
    type: 'Paperback',
    authorId: 2,
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
    alert("method not implemented yet ;)")
  }
}

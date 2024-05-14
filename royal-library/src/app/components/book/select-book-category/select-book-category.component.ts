import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BookCategory } from '../../../model/book-category';

@Component({
  selector: 'app-select-book-category',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-book-category.component.html',
  styleUrl: './select-book-category.component.css'
})
export class SelectBookCategoryComponent {

  categories: BookCategory[] = [
    {
      id: 1,
      name: 'Fiction'
    },
    {
      id: 2,
      name: 'Non-Fiction'
    }
  ]

  @Input()
  selectedBookCategory: string = 'Fiction'

  @Output() newSelectedBookCategoryEvent = new EventEmitter<string>();

  onChange() {
    this.newSelectedBookCategoryEvent.emit(this.selectedBookCategory)
  }
}

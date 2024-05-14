import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BookType } from '../../../model/book-type';

@Component({
  selector: 'app-select-book-type',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-book-type.component.html',
  styleUrl: './select-book-type.component.css'
})
export class SelectBookTypeComponent {

  types: BookType[] = [
    {
      id: 1,
      name: 'Hardcover'
    },
    {
      id: 2,
      name: 'Paperback'
    }
  ]

  @Input()
  selectedBookType: string = 'Paperback'

  @Output() newSelectedBookTypeEvent = new EventEmitter<string>();

  onChange() {
    this.newSelectedBookTypeEvent.emit(this.selectedBookType)
  }
}

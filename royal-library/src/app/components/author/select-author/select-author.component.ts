import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../../../model/author';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-author',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-author.component.html',
  styleUrl: './select-author.component.css'
})

export class SelectAuthorComponent implements OnInit {
  authors: Author[]

  ngOnInit(): void {
    this.authors = [
      {
        id: 1,
        name: 'Author 1'
      },
      {
        id: 2,
        name: 'Author 2'
      },
    ]
  }

  @Input()
  selectedAuthorId: string = '0'

  @Output() newSelectedAuthorIdEvent = new EventEmitter<string>();

  onChange() {
    this.newSelectedAuthorIdEvent.emit(this.selectedAuthorId)
  }
}

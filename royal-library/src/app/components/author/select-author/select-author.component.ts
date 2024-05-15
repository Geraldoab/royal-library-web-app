import { Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Author } from '../../../model/author';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorService } from '../../../services/author/author.service';

@Component({
  selector: 'app-select-author',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-author.component.html',
  styleUrl: './select-author.component.css'
})

export class SelectAuthorComponent implements OnInit {

  constructor(private authorService: AuthorService) {}

  authors: Author[]

  ngOnInit(): void {
    this.getAllAuthors()
  }

  @Input()
  selectedAuthorId: string = '0'

  @Output() newSelectedAuthorIdEvent = new EventEmitter<string>();

  onChange() {
    this.newSelectedAuthorIdEvent.emit(this.selectedAuthorId)
  }

  getAllAuthors() {
    this.authorService.getAll().subscribe((authorsResponse) => {
      this.authors = authorsResponse
    })
  }
}

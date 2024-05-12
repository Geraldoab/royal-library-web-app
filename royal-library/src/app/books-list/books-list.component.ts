import { BookDataTransferObject } from './../model/book-data-transfer-object';
import { SearchByEnum } from './../model/enum/SearchByEnum';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../services/book/book.service';
import { BookFilter } from '../model/book-filter';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements AfterViewInit {

  displayedColumns: string[] = ['bookTitle', 'publisher', 'authors', 'type', 'isbn', 'category', 'availableCopies'];
  dataSource: MatTableDataSource<BookDataTransferObject>
  booksList: BookDataTransferObject[] = []

  constructor(private bookService: BookService) {}

  @ViewChild('paginator') paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<BookDataTransferObject>(this.booksList)
  }

  searchBy = SearchByEnum
  isLoading: Boolean = false

  filter: BookFilter = {
    searchBy: this.searchBy.All,
    searchValue: ''
  }

  search() {
    this.isLoading = true

    setTimeout(() => {
      this.bookService.getBooks(this.filter).subscribe((books) => {
        this.dataSource = new MatTableDataSource<BookDataTransferObject>(books)
        this.dataSource.paginator = this.paginator;
        this.isLoading = false
      })
    }, 1250)
  }
}

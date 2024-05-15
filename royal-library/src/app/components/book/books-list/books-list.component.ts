import { BookDataTransferObject } from './../../../model/book-data-transfer-object';
import { SearchByEnum } from '../../../model/enum/SearchByEnum';
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
import { BookService } from '../../../services/book/book.service';
import { BookFilter } from '../../../model/book-filter';
import { RouterOutlet, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectBookBottomSheetComponent } from '../select-book-bottom-sheet/select-book-bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SharedActionService } from '../../../services/shared-action.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionEnum } from '../../../model/enum/actionEnum';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

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
    MatCardModule,
    RouterOutlet,
    RouterModule,
    MatSort,
    MatSortModule,
    SelectBookBottomSheetComponent
  ],
  templateUrl: './books-list.component.html',
  styleUrl: './books-list.component.css'
})
export class BooksListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'bookTitle', 'publisher', 'authors', 'type', 'isbn', 'category', 'availableCopies'];
  dataSource: MatTableDataSource<BookDataTransferObject>
  booksList: BookDataTransferObject[] = []

  constructor(private bookService: BookService,
    private _liveAnnouncer: LiveAnnouncer,
    private _bottomSheet: MatBottomSheet,
    private sharedActionService: SharedActionService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.sharedActionService.change.subscribe(selectedAction => {
      if(selectedAction) {
        if(selectedAction === ActionEnum.Add) {
          this.router.navigate(['/books']);
        }
        else if (selectedAction === ActionEnum.Edit) {
          this.router.navigate([`/books/${this.selectedBook.id}`]);
        }
        else if (selectedAction === ActionEnum.Delete) {
          this.delete(this.selectedBook.id)
        }
        _bottomSheet.dismiss();
      }
    })
  }

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<BookDataTransferObject>(this.booksList)
    this.search()
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
      this.bookService.getAll(this.filter).subscribe((books) => {
        this.dataSource = new MatTableDataSource<BookDataTransferObject>(books)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false
      })
    }, 1250)
  }

  private deleteBookErrorMessage = "Unfortunately, can't add the book."

  delete(bookId: number) {
    this.isLoading = true

    setTimeout(() => {
      this.bookService.delete(bookId).subscribe({
        next: (response) =>
        {
          if(response.status == 200) {
            this.showSnackBar('The book was deleted successfully.', 'top')
            this.search()
          }
          else {
            this.showSnackBar(this.deleteBookErrorMessage)
          }
        },
        error: (e) => {
          this.showSnackBar(this.deleteBookErrorMessage)
        },
        complete: () => {
          this.isLoading = false;
        }
      });

    }, 1250)
  }

  selectedBook: BookDataTransferObject

  onSelectRow(row: BookDataTransferObject) {
    this.selectedBook = row
    this.openBottomSheet()
  }

  private showSnackBar(message: string, position: MatSnackBarVerticalPosition = 'bottom') {
    this._snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: position
    });
  }

  private openBottomSheet(): void {
    this._bottomSheet.open(SelectBookBottomSheetComponent, {
      data: this.selectedBook,
    });
  }
}

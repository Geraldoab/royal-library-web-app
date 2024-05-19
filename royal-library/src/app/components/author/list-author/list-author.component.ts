import { AuthorService } from './../../../services/author/author.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { Author } from '../../../model/author';
import { BaseComponentComponent } from '../../core/base-component/base.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActionEnum } from '../../../model/enum/actionEnum';
import { SharedActionService } from '../../../services/shared-action.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SelectAuthorBottomSheetComponent } from '../select-author-bottom-sheet/select-author-bottom-sheet.component';

@Component({
  selector: 'app-list-author',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    RouterOutlet,
    RouterModule,
    MatSort,
    MatSortModule,
    SelectAuthorBottomSheetComponent
  ],
  templateUrl: './list-author.component.html',
  styleUrl: './list-author.component.css'
})
export class ListAuthorComponent extends BaseComponentComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name'];
  dataSource: MatTableDataSource<Author>
  authorList: Author[] = []
  isLoading: Boolean = false
  selectedAuthor: Author
  private deleteAuthorErrorMessage = "Unfortunately, can't delete the author."

  constructor(private authorService: AuthorService,
    private _liveAnnouncer: LiveAnnouncer,
    private _bottomSheet: MatBottomSheet,
    private sharedActionService: SharedActionService,
    private route: ActivatedRoute,
    protected override router: Router,
    protected _snackBar: MatSnackBar
  ) {
    super(router, _snackBar)

    this.sharedActionService.change.subscribe(selectedAction => {
      if(selectedAction) {
        if(selectedAction === ActionEnum.Add) {
          this.router.navigate(['/authors']);
        }
        else if (selectedAction === ActionEnum.Edit) {
          this.router.navigate([`/authors/${this.selectedAuthor.id}`]);
        }
        else if (selectedAction === ActionEnum.Delete) {
          this.delete(this.selectedAuthor.id)
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
    this.dataSource = new MatTableDataSource<Author>(this.authorList)
    this.search()
  }

  search() {
    this.isLoading = true

    setTimeout(() => {
      this.authorService.getAll().subscribe((authors) => {
        this.dataSource = new MatTableDataSource<Author>(authors)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false
      })
    }, 1250)
  }

  delete(authorId: number) {
    if(this.isLoading) {
      return
    }

    this.isLoading = true

    setTimeout(() => {
      this.authorService.delete(authorId).subscribe({
        next: (response) =>
        {
          if(response.status == 200) {
            this.showSnackBar('The author was deleted successfully.', 'top')
            this.search()
          }
          else {
            this.showSnackBar(this.deleteAuthorErrorMessage)
          }
        },
        error: (e) => {
          this.showSnackBar(this.deleteAuthorErrorMessage)
        },
        complete: () => {
          this.isLoading = false;
          this.sharedActionService.emitButtonDisableEvent(false);
        }
      });
    }, 1250)
  }

  onSelectRow(row: Author) {
    this.selectedAuthor = row
    this.openBottomSheet()
  }

  private openBottomSheet(): void {
    this._bottomSheet.open(SelectAuthorBottomSheetComponent, {
      data: this.selectedAuthor,
    });
  }
}

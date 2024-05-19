import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Publisher } from '../../../model/publisher';
import { PublisherService } from '../../../services/publisher/publisher.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet, RouterModule, ActivatedRoute, Router } from '@angular/router';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActionEnum } from '../../../model/enum/actionEnum';
import { SharedActionService } from '../../../services/shared-action.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseComponentComponent } from '../../core/base-component/base.component';

@Component({
  selector: 'app-list-publisher',
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
    MatSortModule,],
  templateUrl: './list-publisher.component.html',
  styleUrl: './list-publisher.component.css'
})
export class ListPublisherComponent extends BaseComponentComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name']
  dataSource: MatTableDataSource<Publisher>
  publisherList: Publisher[] = []
  isLoading: Boolean = false
  selectedPublisher: Publisher
  private deletePublisherErrorMessage = "Unfortunately, can't delete the publisher"

  constructor(
    private publisherSevice: PublisherService,
    private _liveAnnouncer: LiveAnnouncer,
    private _bottomSheet: MatBottomSheet,
    private sharedActionService: SharedActionService,
    private route: ActivatedRoute,
    protected _router: Router,
    protected _snackBar: MatSnackBar
  ) {
    super(_router, _snackBar)

    this.sharedActionService.change.subscribe(selectedAction => {
      if(selectedAction) {
        if(selectedAction === ActionEnum.Add) {
          this.openPage('/publishers')
        }
        else if (selectedAction === ActionEnum.Edit) {
          this.openPage(`/publishers/${this.selectedPublisher.id}`)
        }
        else if (selectedAction === ActionEnum.Delete) {
          this.delete(this.selectedPublisher.id)
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
    this.dataSource = new MatTableDataSource<Publisher>(this.publisherList)
    this.search()
  }

  onSelectRow(row: Publisher) {
    this.selectedPublisher = row
    this.openBottomSheet()
  }

  search() {
    this.isLoading = true

    setTimeout(() => {
      this.publisherSevice.getAll().subscribe((publishers) => {
        this.dataSource = new MatTableDataSource<Publisher>(publishers)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false
      })
    }, 1250)
  }

  private delete(authorId: number) {

  }

  private openBottomSheet(): void {

  }
}

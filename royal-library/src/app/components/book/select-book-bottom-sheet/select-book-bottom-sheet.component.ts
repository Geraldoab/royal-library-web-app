import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatNavList } from '@angular/material/list';
import { BookDataTransferObject } from '../../../model/book-data-transfer-object';
import { ActionEnum } from '../../../model/enum/actionEnum';
import { SharedActionService } from '../../../services/shared-action.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-select-book-bottom-sheet',
  standalone: true,
  imports: [MatListModule, MatBottomSheetModule, MatButtonModule, MatIconModule],
  templateUrl: './select-book-bottom-sheet.component.html',
  styleUrl: './select-book-bottom-sheet.component.css'
})
export class SelectBookBottomSheetComponent {

  selectedBook: BookDataTransferObject
  bookAction: ActionEnum

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: BookDataTransferObject,
    private sharedActionService: SharedActionService
  ) {
    this.selectedBook = data
  }

  onSelectAction(action: ActionEnum) {
    this.sharedActionService.emitValue(action)
  }
}

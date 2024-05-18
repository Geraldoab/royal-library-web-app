import { Component, Inject } from '@angular/core';
import { Author } from '../../../model/author';
import { ActionEnum } from '../../../model/enum/actionEnum';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SharedActionService } from '../../../services/shared-action.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-select-author-bottom-sheet',
  standalone: true,
  imports: [MatListModule, MatBottomSheetModule, MatButtonModule, MatIconModule],
  templateUrl: './select-author-bottom-sheet.component.html',
  styleUrl: './select-author-bottom-sheet.component.css'
})
export class SelectAuthorBottomSheetComponent {
  selectedAuthor: Author
  bookAction: ActionEnum
  isDisabled: Boolean = false

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Author,
    private sharedActionService: SharedActionService
  ) {
    this.selectedAuthor = data

    sharedActionService.onButtonDisableEvent.subscribe(isDisabled => {
      this.isDisabled = isDisabled
    })
  }

  onSelectAction(action: ActionEnum) {
    this.sharedActionService.emitValue(action)
    if(action == ActionEnum.Delete) {
      this.isDisabled = true
    }
  }
}

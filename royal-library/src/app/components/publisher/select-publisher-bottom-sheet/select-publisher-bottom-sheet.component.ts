import { Component, Inject } from '@angular/core';
import { ActionEnum } from '../../../model/enum/actionEnum';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { SharedActionService } from '../../../services/shared-action.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Publisher } from '../../../model/publisher';

@Component({
  selector: 'app-select-publisher-bottom-sheet',
  standalone: true,
  imports: [MatListModule, MatBottomSheetModule, MatButtonModule, MatIconModule],
  templateUrl: './select-publisher-bottom-sheet.component.html',
  styleUrl: './select-publisher-bottom-sheet.component.css'
})
export class SelectPublisherBottomSheetComponent {
  selectedPublisher: Publisher
  bookAction: ActionEnum
  isDisabled: Boolean = false

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: Publisher,
    private sharedActionService: SharedActionService
  ) {
    this.selectedPublisher = data

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

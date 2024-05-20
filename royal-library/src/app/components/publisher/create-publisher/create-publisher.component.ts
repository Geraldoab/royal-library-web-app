import { Component } from '@angular/core';
import { SharedActionService } from '../../../services/shared-action.service';
import { SharedFormService } from '../../../services/shared-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../core/base-component/base.component';
import { Router } from '@angular/router';
import { Publisher } from '../../../model/publisher';
import { BasePublisherFormComponent } from '../base-publisher-form/base-publisher-form.component';
import { PublisherService } from '../../../services/publisher/publisher.service';

@Component({
  selector: 'app-create-publisher',
  standalone: true,
  imports: [
    BasePublisherFormComponent
  ],
  templateUrl: './create-publisher.component.html',
  styleUrl: './create-publisher.component.css'
})
export class CreatePublisherComponent extends BaseComponent {
  publisher: Publisher = {
    id: 0,
    name: ''
  }

  isFormValid: Boolean = false
  addPublisherErrorMessage = "Unfortunately, can't add the new publisher";

  constructor(
    protected override router: Router,
    protected override snackBar: MatSnackBar,
    private _sharedActionService: SharedActionService,
    private _sharedFormService: SharedFormService,
    private _publisherService: PublisherService
  ) {
    super(router, snackBar);
    this._sharedFormService.onFormValidation.subscribe(isFormValid => {
      this.isFormValid = isFormValid
    })
  }

  getCurrentPublisher(currentPublisher: Publisher) {
    this.onSubmit(currentPublisher);
  }

  private onSubmit(selectedPublisher: Publisher) {
    if(!this.isFormValid) {
      this.showSnackBar('Please fill the form.')
      return
    }

    this._sharedActionService.emitButtonDisableEvent(true);

    this._publisherService
    .create(selectedPublisher)
    .subscribe({
      next: (response) => {
        if(response.status == 200) {
          this.showSnackBar('The publisher was added successfully.', 'top')
          this._sharedFormService.emitOnClearForm(true)
        }
        else {
          this.showSnackBar(this.addPublisherErrorMessage, 'bottom')
        }
      },
      error: (e) => {
        this.showSnackBar(e.error, 'bottom')
      },
      complete: () => {
        this._sharedActionService.emitButtonDisableEvent(false);
      }
    })
  }
}

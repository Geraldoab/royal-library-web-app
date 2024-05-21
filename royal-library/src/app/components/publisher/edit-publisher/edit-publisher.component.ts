import { Publisher } from './../../../model/publisher';
import { Component } from '@angular/core';
import { BasePublisherFormComponent } from '../base-publisher-form/base-publisher-form.component';
import { SharedActionService } from '../../../services/shared-action.service';
import { SharedFormService } from '../../../services/shared-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../core/base-component/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PublisherService } from '../../../services/publisher/publisher.service';

@Component({
  selector: 'app-edit-publisher',
  standalone: true,
  imports: [BasePublisherFormComponent],
  templateUrl: './edit-publisher.component.html',
  styleUrl: './edit-publisher.component.css'
})
export class EditPublisherComponent extends BaseComponent {
  publisher: Publisher = {
    id: 0,
    name: ''
  }

  isFormValid: Boolean = false
  editPublisherErrorMessage = "Unfortunately, can't edit the publisher";

  constructor(
    private route: ActivatedRoute,
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

  ngOnInit() : void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'))

    if(id) {
      this._publisherService.getById(id)
      .subscribe({
        next: (response) => {
          if(response.status == 200) {
            this.publisher = response.body as Publisher
          }
        },
        error: (e) => {
          this.showSnackBar(e.console.error, 'bottom');
        },
        complete: () => {}
      })
    }
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
    .edit(selectedPublisher)
    .subscribe({
      next: (response) => {
        if(response.status == 200) {
          this.showSnackBar('The publisher was modified successfully.', 'top')
        }
        else {
          this.showSnackBar(this.editPublisherErrorMessage, 'bottom')
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

import { Component } from '@angular/core';
import { BaseAuthorFormComponent } from '../base-author-form/base-author-form.component';
import { Author } from '../../../model/author';
import { SharedActionService } from '../../../services/shared-action.service';
import { SharedFormService } from '../../../services/shared-form.service';
import { AuthorService } from '../../../services/author/author.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../core/base-component/base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [
    BaseAuthorFormComponent
  ],
  templateUrl: './create-author.component.html',
  styleUrl: './create-author.component.css'
})
export class CreateAuthorComponent extends BaseComponent {
  author: Author = {
    id: 0,
    name: ''
  }

  isFormValid: Boolean = false
  addAuthorErrorMessage = "Unfortunately, can't add the new author";

  constructor(
    protected override router: Router,
    protected override snackBar: MatSnackBar,
    private _sharedActionService: SharedActionService,
    private _sharedFormService: SharedFormService,
    private _authorService: AuthorService
  ) {
    super(router, snackBar);
    this._sharedFormService.onFormValidation.subscribe(isFormValid => {
      this.isFormValid = isFormValid
    })
  }

  getCurrentAuthor(currentAuthor: Author) {
    this.onSubmit(currentAuthor);
  }

  private onSubmit(selectedAuthor: Author) {
    if(!this.isFormValid) {
      this.showSnackBar('Please fill the form.')
      return
    }

    this._sharedActionService.emitButtonDisableEvent(true);

    this._authorService
    .create(selectedAuthor)
    .subscribe({
      next: (response) => {
        if(response.status == 200) {
          this.showSnackBar('The author was added successfully.', 'top')
          this._sharedFormService.emitOnClearForm(true)
        }
        else {
          this.showSnackBar(this.addAuthorErrorMessage, 'bottom')
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

import { Component } from '@angular/core';
import { BaseAuthorFormComponent } from '../base-author-form/base-author-form.component';
import { Author } from '../../../model/author';
import { SharedActionService } from '../../../services/shared-action.service';
import { SharedFormService } from '../../../services/shared-form.service';
import { AuthorService } from '../../../services/author/author.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [
    BaseAuthorFormComponent
  ],
  templateUrl: './create-author.component.html',
  styleUrl: './create-author.component.css'
})
export class CreateAuthorComponent {
  author: Author = {
    id: 0,
    name: ''
  }

  isFormValid: Boolean = false
  addBookErrorMessage = "Unfortunately, can't add the new author";

  constructor(
    private _snackBar: MatSnackBar,
    private _sharedActionService: SharedActionService,
    private _sharedFormService: SharedFormService,
    private _authorService: AuthorService
  ) {
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

    this._authorService.create(selectedAuthor)
      .subscribe({
        next: (response) => {
          if(response.status == 200) {
            this.showSnackBar('The author was added successfully.', 'top')
            this._sharedFormService.emitOnClearForm(true)
          }
          else {
            this.showSnackBar(this.addBookErrorMessage, 'bottom')
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

  private showSnackBar(message: string, position: MatSnackBarVerticalPosition = 'bottom') {
    this._snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: position
    });
  }
}

import { Component } from '@angular/core';
import { BaseAuthorFormComponent } from '../base-author-form/base-author-form.component';
import { Author } from '../../../model/author';
import { SharedActionService } from '../../../services/shared-action.service';
import { SharedFormService } from '../../../services/shared-form.service';
import { AuthorService } from '../../../services/author/author.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BaseComponent } from '../../core/base-component/base.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-author',
  standalone: true,
  imports: [BaseAuthorFormComponent],
  templateUrl: './edit-author.component.html',
  styleUrl: './edit-author.component.css'
})
export class EditAuthorComponent extends BaseComponent  {
  author: Author = {
    id: 0,
    name: ''
  }

  isFormValid: Boolean = false
  editAuthorErrorMessage = "Unfortunately, can't edit the author";

  constructor(
    private route: ActivatedRoute,
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

  ngOnInit() : void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'))

    if(id) {
      this._authorService.getById(id)
      .subscribe({
        next: (response) => {
          if(response.status == 200) {
            this.author = response.body as Author
          }
        },
        error: (e) => {
          this.showSnackBar(e.console.error, 'bottom');
        },
        complete: () => {}
      })
    }
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
    .edit(selectedAuthor)
    .subscribe({
      next: (response) => {
        if(response.status == 200) {
          this.showSnackBar('The author was modified successfully.', 'top')
        }
        else {
          this.showSnackBar(this.editAuthorErrorMessage, 'bottom')
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

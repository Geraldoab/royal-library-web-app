import { MatCard } from '@angular/material/card';
import { MatCardHeader } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatCardActions } from '@angular/material/card';
import { MatCardTitle } from '@angular/material/card';
import { MatCardFooter } from '@angular/material/card';
import { MatCardSubtitle } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { RouterModule, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, Validators, ReactiveFormsModule, FormControl, Form } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SharedFormService } from '../../../services/shared-form.service';
import { Author } from '../../../model/author';
import { SharedActionService } from '../../../services/shared-action.service';

@Component({
  selector: 'app-base-author-form',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatCardTitle,
    MatButton,
    MatCardFooter,
    MatCardSubtitle,
    MatCardContent,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatLabel,
    MatFormField,
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './base-author-form.component.html',
  styleUrl: './base-author-form.component.css'
})
export class BaseAuthorFormComponent {

  @Input()
  author: Author = {
    id: 0,
    name: ''
  }

  isDisabled: Boolean = false

  @Output() newAuthorEvent = new EventEmitter<Author>()

  errorMessage = '';

  nameFormControl = new FormControl('', [Validators.required]);

  constructor(
    private _sharedFormService: SharedFormService,
    private _sharedActionService: SharedActionService
  ){
    this._sharedFormService.onClearForm.subscribe((shouldClear)=> {
      if(shouldClear) {
        this.clearForm()
      }
    })

    this._sharedActionService.onButtonDisableEvent.subscribe(isDisabled => {
      this.isDisabled = isDisabled
    })

    merge(this.nameFormControl.statusChanges, this.nameFormControl.valueChanges)
    .pipe(takeUntilDestroyed())
    .subscribe(() => this.updateNameErrorMessage());
  }

  updateNameErrorMessage() {
    if (this.nameFormControl.hasError('required')) {
      this.errorMessage = 'You must enter a value';
    }
    else {
      this.errorMessage = '';
    }
  }

  onSubmit() {
    this._sharedFormService.emitOnFormValidation(this.isFormValid());
    this.author.name = this.nameFormControl.value

    this.newAuthorEvent.emit(this.author)
  }

  private clearForm() {
      this.nameFormControl.reset();
      this.author.id = 0;
      this.author.name = '';
  }

  private isFormValid() : boolean {
    return this.nameFormControl.valid
  }
}

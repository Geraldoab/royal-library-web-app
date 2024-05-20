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
import { SharedActionService } from '../../../services/shared-action.service';
import { Publisher } from '../../../model/publisher';

@Component({
  selector: 'app-base-publisher-form',
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
  templateUrl: './base-publisher-form.component.html',
  styleUrl: './base-publisher-form.component.css'
})
export class BasePublisherFormComponent {

  @Input()
  publisher: Publisher = {
    id: 0,
    name: ''
  }

  isDisabled: Boolean = false
  @Output() newPublisherEvent = new EventEmitter<Publisher>()

  errorMessage: string = ''

  nameFormControl = new FormControl('', [Validators.required])

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

  ngOnChanges(changes: SimpleChanges) {
    this.nameFormControl.setValue(this.publisher.name);
  }

  onSubmit() {
    this._sharedFormService.emitOnFormValidation(this.isFormValid());
    this.publisher.name = this.nameFormControl.value

    this.newPublisherEvent.emit(this.publisher)
  }

  private clearForm() {
      this.nameFormControl.reset();
      this.publisher.id = 0;
      this.publisher.name = '';
  }

  private isFormValid() : boolean {
    return this.nameFormControl.valid
  }
}

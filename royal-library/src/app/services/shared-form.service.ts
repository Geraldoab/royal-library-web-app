import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedFormService {

  constructor() { }

  onFormValidation = new Subject<Boolean>();
  onClearForm = new Subject<Boolean>();

  emitOnFormValidation(isValid: Boolean) {
    this.onFormValidation.next(isValid)
  }

  emitOnClearForm(shouldClear: Boolean) {
    this.onClearForm.next(shouldClear)
  }
}

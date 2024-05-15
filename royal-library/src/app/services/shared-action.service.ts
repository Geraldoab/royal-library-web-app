import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionEnum } from '../model/enum/actionEnum';

@Injectable({
  providedIn: 'root'
})
export class SharedActionService {

  constructor() { }

  change =  new Subject<ActionEnum>();

  emitValue(value: ActionEnum){
    this.change.next(value);
  }
}

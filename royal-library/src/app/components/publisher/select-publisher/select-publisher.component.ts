import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Publisher } from '../../../model/publisher';

@Component({
  selector: 'app-select-publisher',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-publisher.component.html',
  styleUrl: './select-publisher.component.css'
})
export class SelectPublisherComponent {

  publishers: Publisher[] = [
    {
      id: 1,
      name: 'publisher 1'
    },
    {
      id: 2,
      name: 'publisher 2'
    }
  ]

  @Input()
  selectedPublisherId: string = '0'

  @Output() newSelectedPublisherIdEvent = new EventEmitter<string>();

  onChange() {
    this.newSelectedPublisherIdEvent.emit(this.selectedPublisherId)
  }
}

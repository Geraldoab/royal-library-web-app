import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Publisher } from '../../../model/publisher';
import { PublisherService } from '../../../services/publisher/publisher.service';

@Component({
  selector: 'app-select-publisher',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select-publisher.component.html',
  styleUrl: './select-publisher.component.css'
})
export class SelectPublisherComponent {

  constructor(private publisherService: PublisherService) {}

  publishers: Publisher[];

  ngOnInit() {
    this.getAllPublishers()
  }

  @Input()
  selectedPublisherId: string = '0'

  @Output() newSelectedPublisherIdEvent = new EventEmitter<string>();

  onChange() {
    this.newSelectedPublisherIdEvent.emit(this.selectedPublisherId)
  }

  getAllPublishers() {
    this.publisherService.getAll().subscribe((publishersResponse) => {
      this.publishers = publishersResponse
    })
  }
}

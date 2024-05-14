import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPublisherComponent } from './list-publisher.component';

describe('ListPublisherComponent', () => {
  let component: ListPublisherComponent;
  let fixture: ComponentFixture<ListPublisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPublisherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

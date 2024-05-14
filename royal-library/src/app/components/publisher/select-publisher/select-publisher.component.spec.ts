import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPublisherComponent } from './select-publisher.component';

describe('SelectPublisherComponent', () => {
  let component: SelectPublisherComponent;
  let fixture: ComponentFixture<SelectPublisherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPublisherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

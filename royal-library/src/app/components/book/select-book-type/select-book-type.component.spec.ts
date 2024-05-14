import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBookTypeComponent } from './select-book-type.component';

describe('SelectBookTypeComponent', () => {
  let component: SelectBookTypeComponent;
  let fixture: ComponentFixture<SelectBookTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBookTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectBookTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

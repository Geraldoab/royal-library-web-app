import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBookCategoryComponent } from './select-book-category.component';

describe('SelectBookCategoryComponent', () => {
  let component: SelectBookCategoryComponent;
  let fixture: ComponentFixture<SelectBookCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBookCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectBookCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

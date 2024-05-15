import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBookBottomSheetComponent } from './select-book-bottom-sheet.component';

describe('SelectBookBottomSheetComponent', () => {
  let component: SelectBookBottomSheetComponent;
  let fixture: ComponentFixture<SelectBookBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectBookBottomSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectBookBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAuthorBottomSheetComponent } from './select-author-bottom-sheet.component';

describe('SelectAuthorBottomSheetComponent', () => {
  let component: SelectAuthorBottomSheetComponent;
  let fixture: ComponentFixture<SelectAuthorBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAuthorBottomSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectAuthorBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

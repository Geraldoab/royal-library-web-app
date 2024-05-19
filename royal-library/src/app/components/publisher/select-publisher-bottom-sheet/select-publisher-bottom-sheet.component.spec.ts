import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPublisherBottomSheetComponent } from './select-publisher-bottom-sheet.component';

describe('SelectPublisherBottomSheetComponent', () => {
  let component: SelectPublisherBottomSheetComponent;
  let fixture: ComponentFixture<SelectPublisherBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPublisherBottomSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectPublisherBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormBookComponent } from './base-book-form.component';

describe('BaseFormBookComponent', () => {
  let component: BaseFormBookComponent;
  let fixture: ComponentFixture<BaseFormBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFormBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFormBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseAuthorFormComponent } from './base-author-form.component';

describe('BaseAuthorFormComponent', () => {
  let component: BaseAuthorFormComponent;
  let fixture: ComponentFixture<BaseAuthorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseAuthorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BaseAuthorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

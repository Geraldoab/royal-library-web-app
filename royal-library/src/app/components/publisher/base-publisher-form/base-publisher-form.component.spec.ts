import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePublisherFormComponent } from './base-publisher-form.component';

describe('BasePublisherFormComponent', () => {
  let component: BasePublisherFormComponent;
  let fixture: ComponentFixture<BasePublisherFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasePublisherFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasePublisherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

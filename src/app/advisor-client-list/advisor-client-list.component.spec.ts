import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorClientListComponent } from './advisor-client-list.component';

describe('AdvisorClientListComponent', () => {
  let component: AdvisorClientListComponent;
  let fixture: ComponentFixture<AdvisorClientListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvisorClientListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvisorClientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

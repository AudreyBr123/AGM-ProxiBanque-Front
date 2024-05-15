import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorListComponent } from './advisor-list.component';

describe('AdvisorListComponent', () => {
  let component: AdvisorListComponent;
  let fixture: ComponentFixture<AdvisorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdvisorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdvisorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

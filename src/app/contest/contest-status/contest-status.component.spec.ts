import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestStatusComponent } from './contest-status.component';

describe('ContestStatusComponent', () => {
  let component: ContestStatusComponent;
  let fixture: ComponentFixture<ContestStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

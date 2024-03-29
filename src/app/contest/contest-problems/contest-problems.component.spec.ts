import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestProblemsComponent } from './contest-problems.component';

describe('ContestProblemsComponent', () => {
  let component: ContestProblemsComponent;
  let fixture: ComponentFixture<ContestProblemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestProblemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestProblemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

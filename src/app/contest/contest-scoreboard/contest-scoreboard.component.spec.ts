import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestScoreboardComponent } from './contest-scoreboard.component';

describe('ContestScoreboardComponent', () => {
  let component: ContestScoreboardComponent;
  let fixture: ComponentFixture<ContestScoreboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestScoreboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

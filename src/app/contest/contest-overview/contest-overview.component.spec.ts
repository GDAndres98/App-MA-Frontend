import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestOverviewComponent } from './contest-overview.component';

describe('ContestOverviewComponent', () => {
  let component: ContestOverviewComponent;
  let fixture: ComponentFixture<ContestOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

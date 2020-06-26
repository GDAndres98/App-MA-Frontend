import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestOutletComponent } from './contest-outlet.component';

describe('ContestOutletComponent', () => {
  let component: ContestOutletComponent;
  let fixture: ComponentFixture<ContestOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

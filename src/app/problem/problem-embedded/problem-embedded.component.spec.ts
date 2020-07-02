import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemEmbeddedComponent } from './problem-embedded.component';

describe('ProblemEmbeddedComponent', () => {
  let component: ProblemEmbeddedComponent;
  let fixture: ComponentFixture<ProblemEmbeddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProblemEmbeddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemEmbeddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

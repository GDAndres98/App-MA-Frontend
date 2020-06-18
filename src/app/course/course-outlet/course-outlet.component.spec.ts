import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseOutletComponent } from './course-outlet.component';

describe('CourseOutletComponent', () => {
  let component: CourseOutletComponent;
  let fixture: ComponentFixture<CourseOutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseOutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseOutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

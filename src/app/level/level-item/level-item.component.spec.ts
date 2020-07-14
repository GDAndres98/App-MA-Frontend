import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelItemComponent } from './level-item.component';

describe('LevelItemComponent', () => {
  let component: LevelItemComponent;
  let fixture: ComponentFixture<LevelItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

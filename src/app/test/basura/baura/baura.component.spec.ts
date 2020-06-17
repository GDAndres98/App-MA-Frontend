import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BauraComponent } from './baura.component';

describe('BauraComponent', () => {
  let component: BauraComponent;
  let fixture: ComponentFixture<BauraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BauraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BauraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

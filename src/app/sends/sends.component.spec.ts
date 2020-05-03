import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendsComponent } from './sends.component';

describe('SendsComponent', () => {
  let component: SendsComponent;
  let fixture: ComponentFixture<SendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

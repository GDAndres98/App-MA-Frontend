import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendTableEmbeddedComponent } from './send-table-embedded.component';

describe('SendTableEmbeddedComponent', () => {
  let component: SendTableEmbeddedComponent;
  let fixture: ComponentFixture<SendTableEmbeddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendTableEmbeddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendTableEmbeddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalDialogComponent } from './signal-dialog.component';

describe('SignalDialogComponent', () => {
  let component: SignalDialogComponent;
  let fixture: ComponentFixture<SignalDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignalDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

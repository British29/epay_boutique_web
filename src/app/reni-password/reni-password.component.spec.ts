import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReniPasswordComponent } from './reni-password.component';

describe('ReniPasswordComponent', () => {
  let component: ReniPasswordComponent;
  let fixture: ComponentFixture<ReniPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReniPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReniPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

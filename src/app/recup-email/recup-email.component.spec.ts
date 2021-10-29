import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupEmailComponent } from './recup-email.component';

describe('RecupEmailComponent', () => {
  let component: RecupEmailComponent;
  let fixture: ComponentFixture<RecupEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecupEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecupEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

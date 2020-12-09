import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSimComponent } from './login-sim.component';

describe('LoginSimComponent', () => {
  let component: LoginSimComponent;
  let fixture: ComponentFixture<LoginSimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginSimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

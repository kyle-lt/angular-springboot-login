import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoRegisterComponent } from './auto-register.component';

describe('AutoRegisterComponent', () => {
  let component: AutoRegisterComponent;
  let fixture: ComponentFixture<AutoRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

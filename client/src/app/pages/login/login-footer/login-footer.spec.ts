import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFooter } from './login-footer';

describe('LoginFooter', () => {
  let component: LoginFooter;
  let fixture: ComponentFixture<LoginFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

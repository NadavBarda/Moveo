import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginForm } from './login-form';

fdescribe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should not emit loginTrigger if form is invalid', () => {
    spyOn(component.loginTrigger, 'emit');
    component.loginForm.setValue({ email: '', password: '' });
    component.onSubmit();
    expect(component.loginTrigger.emit).not.toHaveBeenCalled();
  });

  fit('should emit loginTrigger with correct values if form is valid', () => {
    spyOn(component.loginTrigger, 'emit');
    component.loginForm.setValue({ email: 'test@example.com', password: '123456a' });
    component.onSubmit();
    expect(component.loginTrigger.emit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '123456a',
    });
  });

  fit('should not emit loginTrigger with correct values if form is invalid', () => {
    spyOn(component.loginTrigger, 'emit');
    component.loginForm.setValue({ email: 'test@example.com', password: '123456' });
    component.onSubmit();
    expect(component.loginTrigger.emit).not.toHaveBeenCalled();
  });
});

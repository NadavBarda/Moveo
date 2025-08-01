import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterForm } from './register-form';
import { RegisterInput } from '../../../models/auth-interface';

fdescribe('RegisterForm', () => {
  let component: RegisterForm;
  let fixture: ComponentFixture<RegisterForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create the component and the form', () => {
    expect(component).toBeTruthy();
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  fit('should emit registerTrigger with correct value if form is valid', () => {
    spyOn(component.registerTrigger, 'emit');

    component.registerForm.patchValue({
      email: 'test@email.com',
      password: 'password123',
      name: 'Test User',
      birthDate: '2000-01-01',
      address: {
        country: 'Israel',
        city: 'City1',
        street: 'Street',
        houseNumber: 1,
      },
    });

    expect(component.registerForm.valid).toBeTruthy();

    component.onSubmit();

    expect(component.registerTrigger.emit).toHaveBeenCalledWith(
      component.registerForm.value as RegisterInput
    );
  });

  fit('should not emit registerTrigger if form is invalid', () => {
    spyOn(component.registerTrigger, 'emit');

    
    component.registerForm.patchValue({
      email: '', 
      password: '12', 
      name: '', 
      birthDate: '', 
      address: {
        country: '', 
        city: '', 
        street: '',
        houseNumber: null,
      },
    });

    expect(component.registerForm.valid).toBeFalsy();
    component.onSubmit();
    expect(component.registerTrigger.emit).not.toHaveBeenCalled();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFooter } from './register-footer';

describe('RegisterFooter', () => {
  let component: RegisterFooter;
  let fixture: ComponentFixture<RegisterFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFooter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

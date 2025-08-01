import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressField } from './address-field';

describe('AddressField', () => {
  let component: AddressField;
  let fixture: ComponentFixture<AddressField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

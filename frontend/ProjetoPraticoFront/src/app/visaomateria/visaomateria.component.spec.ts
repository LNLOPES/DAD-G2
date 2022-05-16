import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaomateriaComponent } from './visaomateria.component';

describe('VisaomateriaComponent', () => {
  let component: VisaomateriaComponent;
  let fixture: ComponentFixture<VisaomateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaomateriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisaomateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

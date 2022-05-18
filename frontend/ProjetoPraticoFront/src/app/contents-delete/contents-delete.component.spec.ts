import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsDeleteComponent } from './contents-delete.component';

describe('ContentsDeleteComponent', () => {
  let component: ContentsDeleteComponent;
  let fixture: ComponentFixture<ContentsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

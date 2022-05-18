import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsUploadComponent } from './contents-upload.component';

describe('ContentsUploadComponent', () => {
  let component: ContentsUploadComponent;
  let fixture: ComponentFixture<ContentsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentsUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

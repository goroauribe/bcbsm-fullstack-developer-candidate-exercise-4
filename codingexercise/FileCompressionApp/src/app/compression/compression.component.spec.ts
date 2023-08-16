import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompressionComponent } from './compression.component';

describe('CompressionComponent', () => {
  let component: CompressionComponent;
  let fixture: ComponentFixture<CompressionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompressionComponent]
    });
    fixture = TestBed.createComponent(CompressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

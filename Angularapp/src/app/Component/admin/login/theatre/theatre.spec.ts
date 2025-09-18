import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Theatre } from './theatre';

describe('Theatre', () => {
  let component: Theatre;
  let fixture: ComponentFixture<Theatre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Theatre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Theatre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

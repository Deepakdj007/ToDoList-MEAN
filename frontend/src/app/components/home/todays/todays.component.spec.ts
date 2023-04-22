import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysComponent } from './todays.component';

describe('TodaysComponent', () => {
  let component: TodaysComponent;
  let fixture: ComponentFixture<TodaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodaysComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

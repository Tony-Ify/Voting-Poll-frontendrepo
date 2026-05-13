import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PollForm } from './poll-form';

describe('PollForm', () => {
  let component: PollForm;
  let fixture: ComponentFixture<PollForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PollForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PollForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

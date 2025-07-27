import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowBoard } from './flow-board';

describe('FlowBoard', () => {
  let component: FlowBoard;
  let fixture: ComponentFixture<FlowBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateReports } from './generate-reports';

describe('GenerateReports', () => {
  let component: GenerateReports;
  let fixture: ComponentFixture<GenerateReports>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateReports]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateReports);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { SurgeryCaseService } from '../surgery case/surgery-case.service';
import { SurgeryCase } from '../surgery case/surgery-case';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-generate-reports',
  standalone: true,
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './generate-reports.html',
  styleUrl: './generate-reports.css'
})
export class GenerateReports implements OnInit{

	private surgeryService = inject(SurgeryCaseService);

	public allCases: SurgeryCase[] = [];
	public filteredCases: SurgeryCase[] = [];

	public generatedAt: Date = new Date();

	filterDatesForm = new FormGroup({
		startDate: new FormControl(''),
		endDate: new FormControl('')
	});

	ngOnInit(): void {
		this.generatedAt = new Date();
		this.surgeryService.getSurgeryCases().subscribe(cases => {
			this.allCases = cases;
			this.applyFilters();
		});
	}

	public applyFilters(): void {
		const formValue = this.filterDatesForm.value;
		const startDate = formValue.startDate ? new Date(formValue.startDate) : null;
		const endDate = formValue.endDate ? new Date(formValue.endDate) : null;

		this.filteredCases = this.allCases.filter(c => {
			const isLate = c.actualStartTime && c.scheduledStartTime && (c.actualStartTime > c.scheduledStartTime);
			const dateOfCase = c.dateOfCase ? new Date(c.dateOfCase) : null;
			
			const isWithinDateRange = (!startDate || (dateOfCase && dateOfCase >= startDate)) &&
									(!endDate || (dateOfCase && dateOfCase <= endDate));

			return isLate && isWithinDateRange;
		})

		// Sort DESC by dates, then actual start times
		.sort((a, b) => {
			const dateA = new Date(a.dateOfCase).getTime();
			const dateB = new Date(b.dateOfCase).getTime();

			if (dateA !== dateB) {
				return dateB - dateA;
			}

			const timeA = a.actualStartTime ?? '';
			const timeB = b.actualStartTime ?? '';

			return timeB.localeCompare(timeA);
		})
	}

	public getVariance(scheduledStartTime: string, actualStartTime: string | null): string {
		if (!actualStartTime || !scheduledStartTime) return 'Times not charted';

		const [schedHour, schedMin] = scheduledStartTime.split(':').map(Number);
		const [actHour, actMin] = actualStartTime.split(':').map(Number);
		
		const diff = (actHour * 60 + actMin) - (schedHour * 60 + schedMin);
		return diff > 0 ? `${diff} min` : `${diff} min`;
	}

}

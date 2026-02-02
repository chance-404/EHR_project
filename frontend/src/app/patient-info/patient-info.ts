import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Patient } from '../patient/patient';
import { PatientService } from '../patient/patient.service';
import { CommonModule } from '@angular/common';
import { LAB_CONFIG } from '../lab-config/lab-config';

@Component({
  	selector: 'app-patient-info',
  	standalone: true,
  	imports: [Header, CommonModule],
  	templateUrl: './patient-info.html',
  	styleUrl: './patient-info.css'
})

export class PatientInfo implements OnInit {
  	patientMrn!: string;
  	patient?: Patient;
	allergies: any[] = [];
	medications: any[] = [];
	conditions: any[] = [];
	observations: any;
	vitals: any;
	encounters: any;
	procedures: any;
	imagingStudies: any[] = [];
	cbc: any;
	cmp: any;
	lipids: any;
	hgba1c: any;

	// vitals using LOINC codes
	vitalLabels = [
		{ label: 'Systolic', code: '8480-6' },
		{ label: 'Diastolic', code: '8462-4' },
		{ label: 'HR', code: '8867-4' },
		{ label: 'Temp', code: '8310-5' },
		{ label: 'Resp Rate', code: '9279-1' },
		{ label: 'Pain', code: '72514-3' },
		{ label: 'Height', code: '8302-2' },
		{ label: 'Weight', code: '29463-7' },
		{ label: 'BMI', code: '39156-5' }
	];
	vitalSets: any[] = [];

	// vitals using LOINC codes
	cbcLabels = [
		{ label: 'WBC', code: '6690-2' }, { label: 'RBC', code: '789-8' },
		{ label: 'Hgb', code: '718-7' }, { label: 'Hct', code: '4544-3' },
		{ label: 'MCV', code: '787-2' }, { label: 'MCH', code: '785-6' },
		{ label: 'MCHC', code: '786-4' }, { label: 'RDW', code: '788-0' },
		{ label: 'Plt', code: '777-3' }
	];
	cbcSets: any[] = [];

	cmpLabels = [
		{ label: 'Glucose', code: '2345-7' }, { label: 'BUN', code: '3094-0' },
		{ label: 'Creat', code: '2160-0' }, { label: 'Na', code: '2951-2' },
		{ label: 'K', code: '2823-3' }, { label: 'Cl', code: '2075-0' },
		{ label: 'CO2', code: '2028-9' }, { label: 'Ca', code: '17861-6' },
		{ label: 'Alb', code: '1751-7' }, { label: 'Prot', code: '2885-2' },
		{ label: 'ALT', code: '1742-6' }, { label: 'AST', code: '1920-8' },
		{ label: 'ALP', code: '6768-6' }, { label: 'Tbili', code: '1975-2' }
	];
	cmpSets: any[] = [];

	lipidLabels = [
		{ label: 'Chol', code: '2093-3' }, { label: 'HDL', code: '2085-9' },
		{ label: 'LDL', code: '18262-6' }, { label: 'Trig', code: '2571-8' },
		{ label: 'A1c', code: '4548-4' }
	];
	lipidSets: any[] = [];

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private patientService: PatientService
	) {}

	ngOnInit(): void {
		this.route.paramMap.subscribe({
			next: (params) => {
				const mrnParam = params.get('mrn');
				if (!mrnParam) {
					console.error('No MRN provided in URL');
					this.router.navigate(['/dashboard']);
					return;
				}
				this.patientMrn = mrnParam;
				this.loadPatientData(this.patientMrn);
			},
			error: (error) => {
				console.error('Error getting patient MRN:', error);
				this.router.navigate(['/dashboard']);
			}
			});
  	}

  	private loadPatientData(mrn: string): void {
    	this.patientService.getClinicalView(mrn).subscribe({
			next: (data: any) => {
				this.patient = data.patient;
				this.allergies = data.allergies.map((a: any) => ({
					substance: a.substance, 
					reaction: a.description
				}));
				this.medications = data.medications.map((m: any) => ({
					medication: m.medication,
					reason: m.reason
				}));
				this.conditions = data.conditions.map((c: any) => ({
					label: c.description,
					dateOfDx: c.startDate
				}));
				this.observations = data.observations.map((o: any) => ({
					date: o.date
				}))
				
				const vitalsByDate = new Map<string, any>();
				const vitalsCodes = this.vitalLabels.map(v => v.code);
				const labsByDate = new Map<string, any>();

				data.observations.forEach((obs: any) => {
					if (vitalsCodes.includes(obs.code)) {
						if (!vitalsByDate.has(obs.date)) {
							vitalsByDate.set(obs.date, {});
						}
						vitalsByDate.get(obs.date)[obs.code] = `${obs.value} ${obs.units}`;
					}
				});

				// process vitals, newest to oldest
				this.vitalSets = Array.from(vitalsByDate.keys())
					.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
					.map(date => ({
						date: date,
						values: vitalsByDate.get(date)
					}));

				
				data.observations.forEach((obs: any) => {
					if (!labsByDate.has(obs.date)) {
						labsByDate.set(obs.date, {});
					}
					labsByDate.get(obs.date)[obs.code] = obs;
				});

				// process CBC sets, newest to oldest
				this.cbcSets = Array.from(labsByDate.keys())
					.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
					.map(date => {
						const values: any = {};
						this.cbcLabels.forEach(config => {
							values[config.code] = this.findLab(labsByDate.get(date)[config.code], config.code);
						});
						return { date, values };
					})
					// filter to only include sets that actually have CBC data 
					.filter(set => Object.values(set.values).some((v: any) => v.value !== '--'));

				// process CMP sets
				this.cmpSets = Array.from(labsByDate.keys())
					.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
					.map(date => ({
						date,
						values: this.mapValuesForLabels(this.cmpLabels, labsByDate.get(date))
					}))
					.filter(set => this.hasData(set.values));

				// process lipid sets
				this.lipidSets = Array.from(labsByDate.keys())
					.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
					.map(date => ({
						date,
						values: this.mapValuesForLabels(this.lipidLabels, labsByDate.get(date))
					}))
					.filter(set => this.hasData(set.values));

				this.hgba1c = [
					this.findLab(data.observations, '4548-4')
				];

				this.encounters = data.encounters.map((e: any) => e.description);
				this.procedures = data.procedures.map((p: any) => p.description);
	
				this.imagingStudies = data.imagingStudies.map((i: any) => ({
					studyDescription: i.studyDescription,
					siteOnBody: i.siteOnBody, 
					date: i.date
				}))
				.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime());
				
				// console.log('Imaging data:', data.imagingStudies);
			},

			error: (error: any) => {
				console.error('Error loading patient data:', error);
				this.router.navigate(['/patient-list']);
			} 
			});
  	}

	private findObs(observations: any[], code: string): string {
		const match = observations.find(obs => obs.code === code);
		return match ? `${match.value} ${match.units}` : 'N/A';
	}

	private findLab(match: any, code: string) {
		const config = LAB_CONFIG[code];
		
		if (Array.isArray(match)) {
			match = match.find(obs => obs.code === code);
		}

		if (!match || !config) {
			return { value: '--', units: '', abnormal: false, critical: false };
		}

		const val = parseFloat(match.value);
		const isAbnormal = val < config.min || val > config.max;
		const isCritical = (config.criticalMin && val <= config.criticalMin) ||
						(config.criticalMax && val >= config.criticalMax);

		return {
			label: config.label,
			value: val,
			units: match.units,
			reference: `${config.min} - ${config.max}`,
			abnormal: isAbnormal,
			critical: isCritical
		};
	}

	private mapValuesForLabels(labels: any[], dayData: any) {
		const values: any = {};
		labels.forEach(row => {
			values[row.code] = this.findLab(dayData[row.code], row.code);
		});
		return values;
	}

	private hasData(values: any): boolean {
		return Object.values(values).some((v: any) => v.value !== '--');
	}

}

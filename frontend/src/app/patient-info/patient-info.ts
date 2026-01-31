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
	allergies: any;
	medications: any;
	conditions: any;
	vitals: any;
	encounters: any;
	procedures: any;
	imagingStudies: any;
	cbc: any;
	cmp: any;
	lipids: any;
	hgba1c: any;

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

				console.log(this.allergies);
				console.log(this.medications);

				// extract vitals and labs from observations list using LOINC codes
				this.vitals = [
					{ label: 'Systolic', value: this.findObs(data.observations, '8480-6') },
					{ label: 'Diastolic', value: this.findObs(data.observations, '8462-4') },
					{ label: 'HR', value: this.findObs(data.observations, '8867-4') },
					{ label: 'Temp', value: this.findObs(data.observations, '8310-5') },
					{ label: 'Resp Rate', value: this.findObs(data.observations, '9279-1') },
					{ label: 'Pain', value: this.findObs(data.observations, '72514-3') },
					{ label: 'Height', value: this.findObs(data.observations, '8302-2') },
					{ label: 'Weight', value: this.findObs(data.observations, '29463-7') },
					{ label: 'BMI', value: this.findObs(data.observations, '39156-5') },
				];

				this.cbc = [
					this.findLab(data.observations, '6690-2'),
					this.findLab(data.observations, '789-8'),
					this.findLab(data.observations, '718-7'),
					this.findLab(data.observations, '4544-3'),
					this.findLab(data.observations, '787-2'),
					this.findLab(data.observations, '785-6'),
					this.findLab(data.observations, '786-4'),
					this.findLab(data.observations, '788-0'),
					this.findLab(data.observations, '777-3')
				];

				this.cmp = [
					this.findLab(data.observations, '2345-7'),
					this.findLab(data.observations, '3094-0'),
					this.findLab(data.observations, '2160-0'),
					this.findLab(data.observations, '2951-2'),
					this.findLab(data.observations, '2823-3'),
					this.findLab(data.observations, '2075-0'),
					this.findLab(data.observations, '2028-9'),
					this.findLab(data.observations, '17861-6'),
					this.findLab(data.observations, '1751-7'),
					this.findLab(data.observations, '2885-2'),
					this.findLab(data.observations, '1742-6'),
					this.findLab(data.observations, '1920-8'),
					this.findLab(data.observations, '6768-6'),
					this.findLab(data.observations, '1975-2')
				];

				this.lipids = [
					this.findLab(data.observations, '2093-3'),
					this.findLab(data.observations, '2085-9'),
					this.findLab(data.observations, '18262-6'),
					this.findLab(data.observations, '2571-8')
				];

				this.hgba1c = [
					this.findLab(data.observations, '4548-4')
				];

				this.encounters = data.encounters.map((e: any) => e.description);
				this.procedures = data.procedures.map((p: any) => p.description);
				this.imagingStudies = data.imagingStudies.map((i: any) => i.description);
			},

			error: (error: any) => {
				console.error('Error loading patient data:', error);
				this.router.navigate(['/dashboard']);
			} 
			});
  	}

	private findObs(observations: any[], code: string): string {
		const match = observations.find(obs => obs.code === code);
		return match ? `${match.value} ${match.units}` : 'N/A';
	}

	private findLab(observations: any[], code: string) {
		const match = observations.find(obs => obs.code === code);
		const config = LAB_CONFIG[code];

		if (!match || !config) {
			return { label: config?.label || 'N/A', value: '--', 
					abnormal: false, critical: false 
			};
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

}

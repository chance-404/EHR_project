export const LAB_CONFIG: Record<string, { 
						min: number, max: number, 
						label: string, 
						criticalMin?: number, criticalMax?: number 
						}> = {
	// --- CBC (Complete Blood Count) ---
	'6690-2':  { label: 'WBC', min: 4.5, max: 11.0, criticalMin: 2.0, criticalMax: 30.0 },
	'789-8':   { label: 'RBC', min: 4.2, max: 5.4 },
	'718-7':   { label: 'Hgb', min: 12.0, max: 16.0, criticalMin: 7.0, criticalMax: 20.0 },
	'4544-3':  { label: 'Hct', min: 36.0, max: 48.0, criticalMin: 21.0, criticalMax: 60.0 },
	'787-2':   { label: 'MCV', min: 80, max: 100 },
	'785-6':   { label: 'MCH', min: 27, max: 34 },
	'786-4':   { label: 'MCHC', min: 32, max: 36 },
	'788-0':   { label: 'RDW', min: 11.5, max: 14.5 },
	'777-3':   { label: 'Plt', min: 150, max: 450, criticalMin: 50, criticalMax: 1000 },

	// --- CMP (Comprehensive Metabolic Panel) ---
	'2345-7':  { label: 'Glucose', min: 70, max: 110, criticalMin: 50, criticalMax: 400 },
	'3094-0':  { label: 'BUN', min: 7, max: 20 },
	'2160-0':  { label: 'Creat', min: 0.6, max: 1.2 },
	'2951-2':  { label: 'Na', min: 135, max: 145, criticalMin: 120, criticalMax: 160 },
	'2823-3':  { label: 'K', min: 3.5, max: 5.1, criticalMin: 2.8, criticalMax: 6.0 },
	'2075-0':  { label: 'Cl', min: 96, max: 106 },
	'2028-9':  { label: 'CO2', min: 23, max: 29 },
	'17861-6': { label: 'Ca', min: 8.5, max: 10.5, criticalMin: 6.0, criticalMax: 13.0 },
	'1751-7':  { label: 'Alb', min: 3.5, max: 5.0 },
	'2885-2':  { label: 'Prot', min: 6.0, max: 8.3 },
	'1742-6':  { label: 'ALT', min: 4, max: 36 },
	'1920-8':  { label: 'AST', min: 8, max: 33 },
	'6768-6':  { label: 'ALP', min: 20, max: 130 },
	'1975-2':  { label: 'Tbili', min: 0.1, max: 1.2 },

	// --- Lipids & Endocrine ---
	'2093-3':  { label: 'Chol', min: 0, max: 200 },
	'2085-9':  { label: 'HDL', min: 40, max: 100 },
	'18262-6': { label: 'LDL', min: 0, max: 100 },
	'2571-8':  { label: 'Trig', min: 0, max: 150 },
	'4548-4':  { label: 'A1c', min: 0, max: 5.7 }
};
	
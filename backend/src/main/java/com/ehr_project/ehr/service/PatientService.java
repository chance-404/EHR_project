package com.ehr_project.ehr.service;

import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.ehr_project.ehr.dto.DashboardDTO;
import com.ehr_project.ehr.exceptions.UserNotFoundException;
import com.ehr_project.ehr.model.Allergy;
import com.ehr_project.ehr.model.Patient;
import com.ehr_project.ehr.repo.AllergyRepo;
import com.ehr_project.ehr.repo.ConditionRepo;
import com.ehr_project.ehr.repo.EncounterRepo;
import com.ehr_project.ehr.repo.ImagingStudyRepo;
import com.ehr_project.ehr.repo.MedicationRepo;
import com.ehr_project.ehr.repo.ObservationRepo;
import com.ehr_project.ehr.repo.PatientRepo;
import com.ehr_project.ehr.repo.ProcedureRepo;

@Service
public class PatientService {

    private final ImagingStudyRepo imagingStudyRepo;

    private final ProcedureRepo procedureRepo;

    private final EncounterRepo encounterRepo;

    private final ObservationRepo observationRepo;

    private final ConditionRepo conditionRepo;

    private final MedicationRepo medicationRepo;

    private final AllergyRepo allergyRepo;

    private final PatientRepo patientRepo;

    public PatientService(PatientRepo patientRepo, AllergyRepo allergyRepo, MedicationRepo medicationRepo, 
						ConditionRepo conditionRepo, ObservationRepo observationRepo, EncounterRepo encounterRepo, 
						ProcedureRepo procedureRepo, ImagingStudyRepo imagingStudyRepo) {
        this.patientRepo = patientRepo;
        this.allergyRepo = allergyRepo;
        this.medicationRepo = medicationRepo;
        this.conditionRepo = conditionRepo;
        this.observationRepo = observationRepo;
        this.encounterRepo = encounterRepo;
        this.procedureRepo = procedureRepo;
        this.imagingStudyRepo = imagingStudyRepo;
    }


    @SuppressWarnings("null")
	public Patient addPatient(Patient patient){
		setPatientMrn(patient);
        return patientRepo.save(patient);
    }

	public UUID setPatientMrn(Patient patient) {
		UUID newPatientMrn = UUID.randomUUID();
		return newPatientMrn;
	}


    public List<Patient> findAllPatients() {
        List<Patient> patients = patientRepo.findAll();
        // sets calculated age for every patient
        patients.forEach(this::setPatientAgeString);
        return patients;
    }


    public Patient findPatientByMrn(UUID mrn) {
        Optional<Patient> patientOptional = patientRepo.findPatientByMrn(mrn);
        
        if (patientOptional.isEmpty()) {
            throw new UserNotFoundException("Patient by MRN " + mrn + " was not found.");
        }
        
        Patient patient = patientOptional.get();
        // sets calculated age for the single patient
        setPatientAgeString(patient);
        return patient;
    }

    private void setPatientAgeString(Patient patient) {
        String ageString = calculatePatientAge(patient.getDateOfBirth());
        patient.setAgeString(ageString);
    }

    public static String calculatePatientAge(LocalDate dateOfBirth) {
        if (dateOfBirth == null) {
            return "N/A";
        }

        LocalDate today = LocalDate.now();
        Period period = Period.between(dateOfBirth, today);

        if (period.getYears() >= 1) {
            return period.getYears() + " yrs";
        }
        
        if (period.getMonths() >= 1) {
            long totalMonths = ChronoUnit.MONTHS.between(dateOfBirth, today);
            return totalMonths + " months";
        }

        long days = ChronoUnit.DAYS.between(dateOfBirth, today);
        if (days >= 0) {
            return days + " days";
        }
        
        // Should only happen if DOB is in the future
        return "Future DOB";
    }


	public List<DashboardDTO> getFullPatientList() {
		return patientRepo.findAll().stream()
			.map(patient -> new DashboardDTO(
				patient.getMrn(),
				patient.getFirstName(),
				patient.getMiddleName(),
				patient.getLastName(),
				patient.getDateOfBirth(),
				patient.getSex(),
				patient.getAge()
			))
			.collect(Collectors.toList());
	}


	public Map<String, Object> getClinicalView(UUID mrn) {

		Patient patient = findPatientByMrn(mrn);
		Map<String, Object> record = new HashMap<>();

		String removeTextInParentheses = "\\s*\\([^)]*\\)";

		List<Allergy> rawAllergies = allergyRepo.findByPatientMrn(mrn);
		rawAllergies.removeIf(a -> a.getSubstance() != null &&
									a.getSubstance().toLowerCase().contains("disposition"));
		rawAllergies.forEach(a -> {
			if (a.getSubstance() != null) {
				a.setSubstance(a.getSubstance().replaceAll(removeTextInParentheses, "").trim());
			}
			if (a.getDescription() != null) {
				a.setDescription(a.getDescription().replaceAll(removeTextInParentheses, "").toLowerCase().trim());
			}
		});

		List<com.ehr_project.ehr.model.Condition> rawConditions = conditionRepo.findActiveConditions(mrn);
		// filters out some conditions irrelevant to peri-op setting
		rawConditions.removeIf(c -> c.getDescription() != null &&
								c.getDescription().toLowerCase().matches(".*(education|employment|unemployed|crime|criminal|military|housing|homeless|refugee|victim|activity|social|force|transport|medication).*"));
		rawConditions.forEach(c -> {
			if (c.getDescription() != null) {
				c.setDescription(c.getDescription().replaceAll(removeTextInParentheses, "").trim());
			}
		});

		record.put("patient", patient);
		record.put("allergies", rawAllergies);
		record.put("medications", medicationRepo.findActiveByPatientMrn(mrn));
		record.put("conditions", rawConditions);
		record.put("observations", observationRepo.findByPatientMrn(mrn, PageRequest.of(0, 100)));
		record.put("encounters", encounterRepo.findEncounterByPatientMrn(mrn, PageRequest.of(0, 20)));
		record.put("procedures", procedureRepo.findByPatientMrn(mrn, PageRequest.of(0, 20)));
		record.put("imagingStudies", imagingStudyRepo.findImagingStudyByPatientMrn(mrn, PageRequest.of(0, 20)));

		return record;
	}
}

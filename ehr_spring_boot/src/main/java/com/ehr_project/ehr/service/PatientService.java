package com.ehr_project.ehr.service;

import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ehr_project.ehr.exceptions.UserNotFoundException;
import com.ehr_project.ehr.model.Patient;
import com.ehr_project.ehr.repo.PatientRepo;

@Service
public class PatientService {
    private final PatientRepo patientRepo;

    @Autowired
    public PatientService(PatientRepo patientRepo) {
        this.patientRepo = patientRepo;
    }

    public Patient addPatient(Patient patient){
        return patientRepo.save(patient);
    }

    public List<Patient> findAllPatients() {
        List<Patient> patients = patientRepo.findAll();
        // sets calculated age for every patient
        patients.forEach(this::setPatientAgeString);
        return patients;
    }

    public Patient updatePatient(Patient patient) {
        return patientRepo.save(patient);
    }

    public Patient findPatientByMrn(Long mrn) {
        Optional<Patient> patientOptional = patientRepo.findPatientByMrn(mrn);
        
        if (patientOptional.isEmpty()) {
            throw new UserNotFoundException("Patient by MRN " + mrn + " was not found.");
        }
        
        Patient patient = patientOptional.get();
        // sets calculated age for the single patient
        setPatientAgeString(patient);
        return patient;
    }

    public void deletePatient(Long mrn) {
        patientRepo.deletePatientByMrn(mrn);
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


}

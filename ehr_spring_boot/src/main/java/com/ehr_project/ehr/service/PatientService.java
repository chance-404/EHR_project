package com.ehr_project.ehr.service;

import java.util.List;

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
        return patientRepo.findAll();
    }

    public Patient updatePatient(Patient patient) {
        return patientRepo.save(patient);
    }

    public Patient findPatientByMrn(Long mrn) {
        return patientRepo.findPatientByMrn(mrn)
                .orElseThrow(() -> new UserNotFoundException("Patient by MRN " + mrn + " was not found."));
    }

    public void deletePatient(Long mrn) {
        patientRepo.deletePatientByMrn(mrn);
    }

    
}

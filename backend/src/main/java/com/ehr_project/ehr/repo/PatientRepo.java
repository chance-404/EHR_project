package com.ehr_project.ehr.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ehr_project.ehr.model.Patient;

public interface PatientRepo extends JpaRepository<Patient, Long> {

    Optional<Patient> findPatientByMrn(Long mrn);

    public void deletePatientByMrn(Long mrn);
}
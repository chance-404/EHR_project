package com.ehr_project.ehr.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ehr_project.ehr.model.Medication;

@Repository
public interface MedicationRepo extends JpaRepository<Medication, Long> {

	@Query("SELECT m FROM Medication m WHERE m.patient.mrn = :mrn")
	List<Medication> findByPatientMrn(UUID mrn);

	// finds only active medications
	@Query("SELECT m FROM Medication m WHERE m.patient.mrn = :mrn AND m.stopDate IS NULL")
	List<Medication> findActiveByPatientMrn(@Param("mrn") UUID mrn);

}

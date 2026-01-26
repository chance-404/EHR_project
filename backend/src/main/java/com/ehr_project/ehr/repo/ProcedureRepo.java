package com.ehr_project.ehr.repo;


import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ehr_project.ehr.model.Observation;
import com.ehr_project.ehr.model.Procedure;

@Repository
public interface ProcedureRepo extends JpaRepository<Procedure, Long> {
	
	List<Observation> findByPatientMrn(UUID patientMrn, Pageable pageable);
}

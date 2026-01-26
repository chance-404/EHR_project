package com.ehr_project.ehr.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ehr_project.ehr.model.Condition;

@Repository
public interface ConditionRepo extends JpaRepository<Condition, Long> {

	List<Condition> findByPatientMrn(UUID mrn);

	// list only active problems
	@Query("SELECT c FROM Condition c WHERE c.patient.id = :mrn AND c.stopDate IS NULL")
	List<Condition> findActiveConditions(@Param("mrn") UUID mrn);
}

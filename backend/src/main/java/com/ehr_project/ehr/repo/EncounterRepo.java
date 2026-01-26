package com.ehr_project.ehr.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ehr_project.ehr.model.Encounter;

@Repository
public interface EncounterRepo extends JpaRepository<Encounter, UUID>{

	List<Encounter> findEncounterByPatientMrn(UUID mrn);
}

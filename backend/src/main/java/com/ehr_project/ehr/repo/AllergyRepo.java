package com.ehr_project.ehr.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ehr_project.ehr.model.Allergy;


@Repository
public interface AllergyRepo extends JpaRepository<Allergy, Long>{
	List<Allergy> findByPatientMrn(UUID patientMrn);
}

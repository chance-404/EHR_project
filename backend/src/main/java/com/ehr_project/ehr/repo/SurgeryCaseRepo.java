package com.ehr_project.ehr.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ehr_project.ehr.model.SurgeryCase;

@Repository
public interface SurgeryCaseRepo extends JpaRepository<SurgeryCase, Long> {
  
  	Optional<SurgeryCase> findSurgeryCaseBySurgeryCaseId(Long surgeryCaseId);

  	public void deleteSurgeryCaseBySurgeryCaseId(Long surgeryCaseId);
}

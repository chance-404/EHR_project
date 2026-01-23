package com.ehr_project.ehr.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ehr_project.ehr.model.SurgeryCase;

public interface SurgeryCaseRepo extends JpaRepository<SurgeryCase, Long> {
  
  	Optional<SurgeryCase> findSurgeryCaseBySurgeryCaseId(Long surgeryCaseId);

  	public void deleteSurgeryCaseBySurgeryCaseId(Long surgeryCaseId);
}

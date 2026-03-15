package com.ehr_project.ehr.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ehr_project.ehr.model.SurgeryCase;
import com.ehr_project.ehr.repo.SurgeryCaseRepo;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class SurgeryCaseService {
  private final SurgeryCaseRepo surgeryCaseRepo;  

  public SurgeryCaseService(SurgeryCaseRepo surgeryCaseRepo) {
    this.surgeryCaseRepo = surgeryCaseRepo;
  }

@SuppressWarnings("null")
public SurgeryCase addSurgeryCase(SurgeryCase surgeryCase) {
    return surgeryCaseRepo.save(surgeryCase);
  }

public List<SurgeryCase> findAllSurgeryCases() {
    return surgeryCaseRepo.findAll();
  }

@SuppressWarnings("null")
public SurgeryCase updateSurgeryCase(SurgeryCase surgeryCase) {
    return surgeryCaseRepo.save(surgeryCase);
  }

// @Transactional will automatically rollback if a RuntimeException is thrown and will
// automatically commit to the DB at the end of the function (no need for repo.save(entity)).
// I was getting a 403 error when the "Delete Case" button was clicked without adding this.
@Transactional
public void deleteSurgeryCase(Long surgeryCaseId) {
    surgeryCaseRepo.deleteSurgeryCaseBySurgeryCaseId(surgeryCaseId);
  }

public SurgeryCase findSurgeryCaseBySurgeryCaseId(Long surgeryCaseId) {
    return surgeryCaseRepo.findSurgeryCaseBySurgeryCaseId(surgeryCaseId)
        .orElseThrow(() -> new EntityNotFoundException("Surgery case with id: " + surgeryCaseId + " was not found."));
  }

}

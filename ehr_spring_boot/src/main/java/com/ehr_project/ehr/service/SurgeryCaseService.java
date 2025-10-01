package com.ehr_project.ehr.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ehr_project.ehr.model.SurgeryCase;
import com.ehr_project.ehr.repo.SurgeryCaseRepo;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SurgeryCaseService {
  private final SurgeryCaseRepo surgeryCaseRepo;  

  @Autowired
  public SurgeryCaseService(SurgeryCaseRepo surgeryCaseRepo) {
    this.surgeryCaseRepo = surgeryCaseRepo;
  }

  public SurgeryCase addSurgeryCase(SurgeryCase surgeryCase) {
    return surgeryCaseRepo.save(surgeryCase);
  }

  public List<SurgeryCase> findAllSurgeryCases() {
    return surgeryCaseRepo.findAll();
  }

  public SurgeryCase updateSurgeryCase(SurgeryCase surgeryCase) {
    return surgeryCaseRepo.save(surgeryCase);
  }

  public void deleteSurgeryCase(Long surgeryCaseId) {
    surgeryCaseRepo.deleteSurgeryCaseBySurgeryCaseId(surgeryCaseId);
  }

  public SurgeryCase findSurgeryCaseBySurgeryCaseId(Long surgeryCaseId) {
    return surgeryCaseRepo.findSurgeryCaseBySurgeryCaseId(surgeryCaseId)
        .orElseThrow(() -> new EntityNotFoundException("Surgery case with id: " + surgeryCaseId + " was not found."));
  }

}

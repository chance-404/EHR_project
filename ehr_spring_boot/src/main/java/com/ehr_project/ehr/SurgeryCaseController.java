package com.ehr_project.ehr;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ehr_project.ehr.model.SurgeryCase;
import com.ehr_project.ehr.service.SurgeryCaseService;

@RestController
@RequestMapping("/surgeryCases")
@CrossOrigin(origins = "http://localhost:4200")
public class SurgeryCaseController {
    private final SurgeryCaseService surgeryCaseService;

    public SurgeryCaseController(SurgeryCaseService surgeryCaseService) {
        this.surgeryCaseService = surgeryCaseService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<SurgeryCase>> getAllSurgeryCases() {
        List<SurgeryCase> surgeryCase = surgeryCaseService.findAllSurgeryCases();
        return new ResponseEntity<>(surgeryCase, HttpStatus.OK);
    }

    @GetMapping("/find/{surgeryCaseId}")
    public ResponseEntity<SurgeryCase> getPatientByMrn (@PathVariable("suregeryCaseId") Long surgeryCaseId) {    
        SurgeryCase surgeryCase = surgeryCaseService.findSurgeryCaseBySurgeryCaseId(surgeryCaseId);
        return new ResponseEntity<>(surgeryCase, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<SurgeryCase> addSurgeryCase(@RequestBody SurgeryCase surgeryCase) {
        SurgeryCase newSurgeryCase = surgeryCaseService.addSurgeryCase(surgeryCase);
        return new ResponseEntity<>(newSurgeryCase, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<SurgeryCase> updateSurgeryCase(@RequestBody SurgeryCase surgeryCase) {
        SurgeryCase updateSurgeryCase = surgeryCaseService.updateSurgeryCase(surgeryCase);
        return new ResponseEntity<>(updateSurgeryCase, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{surgeryCaseId}")
    public ResponseEntity<?> deleteSurgeryCase(@PathVariable("surgeryCaseId") Long surgeryCaseId) {
        surgeryCaseService.deleteSurgeryCase(surgeryCaseId);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}

package com.ehr_project.ehr.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ehr_project.ehr.dto.DashboardDTO;
import com.ehr_project.ehr.model.Patient;
import com.ehr_project.ehr.service.PatientService;


@RestController
@RequestMapping("/patients")
@CrossOrigin(origins = "")
public class PatientController {
    private final PatientService patientService;

    public PatientController(PatientService patientService) {
        this.patientService = patientService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Patient>> getAllPatients() {
        List<Patient> patients = patientService.findAllPatients();
        return new ResponseEntity<>(patients, HttpStatus.OK);
    }

	@GetMapping("/all-dashboard")
	public ResponseEntity<List<DashboardDTO>> getAllPatientsForDashboard() {
		List<DashboardDTO> patients = patientService.getPatientListForDashboard();
		return new ResponseEntity<>(patients, HttpStatus.OK);
	}

    @GetMapping("/find/{mrn}")
    public ResponseEntity<Patient> getPatientByMrn(@PathVariable("mrn") UUID mrn) {    
        Patient patient = patientService.findPatientByMrn(mrn);
        return new ResponseEntity<>(patient, HttpStatus.OK);
    }

	@GetMapping("/clinical-view/{mrn}")
	public ResponseEntity<Map<String, Object>> getPatientClinicalView(@PathVariable("mrn") UUID mrn) {
		Map<String,Object> patientData = patientService.getClinicalView(mrn);
		return new ResponseEntity<>(patientData, HttpStatus.OK);
	}
	

    // only admin login can add patients, just to prevent shenanigans in live
    @PostMapping("/add")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<Patient> addPatient(@RequestBody Patient patient) {
        Patient newPatient = patientService.addPatient(patient);
        return new ResponseEntity<>(newPatient, HttpStatus.CREATED);
    }


}

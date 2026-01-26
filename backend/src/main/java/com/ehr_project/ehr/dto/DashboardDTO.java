package com.ehr_project.ehr.dto;

import java.time.LocalDate;
import java.util.UUID;

public record DashboardDTO( 
	UUID mrn,
	String firstName,
	String middleName,
	String lastName, 
	LocalDate dateOfBirth,
	String sex,
	Integer age
) {}

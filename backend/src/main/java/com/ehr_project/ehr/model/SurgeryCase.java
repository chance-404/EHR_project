package com.ehr_project.ehr.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "surgeryCases")
@Data
public class SurgeryCase implements Serializable{
  
  	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  	@Column(nullable = false, updatable = false)
  	private Long surgeryCaseId;

  	@Column(nullable = false)
  	private String procedure;

  	@Column(nullable = false)
  	private String surgeon;

  	@Column(nullable = false)
  	private String anesthesia;

  	@Column
  	private String nurse;

  	@Column 
  	private String scrub;

  	@Column
  	private String patient;

  	@Column 
  	private Integer roomId;

  	@Column(nullable= false)
  	private LocalTime scheduledStartTime;

  	@Column(nullable= false) 
  	private LocalTime endTime;

  	@Column
  	private String surgeryCaseStatus;

	@Column
	private LocalTime actualStartTime;

	@Column
	private LocalTime actualEndTime;

	@Column
	@CreationTimestamp
	private LocalDate dateOfCase;

	@Column(length = 500)
	private String notes;

}

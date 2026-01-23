package com.ehr_project.ehr.model;

import java.io.Serializable;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "surgeryCases")
@Data
public class SurgeryCase implements Serializable{
  
  	@Id
  	@Column(nullable = false, unique = true)
  	private Long surgeryCaseId = null;

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

  	@Column
  	private LocalTime startTime;

  	@Column 
  	private LocalTime endTime;

  	@Column
  	private String surgeryCaseStatus;


}

package com.ehr_project.ehr.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "staging_medications")
@Data
public class Medication {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long internalId;

	@Column(name = "start_time")
	private LocalDate startDate;

	@Column(name = "stop_time")
	private LocalDate stopDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "patient", referencedColumnName = "id")
	private Patient patient;

	@Column(name = "description", columnDefinition = "text")
	private String medication;

	@Column(name = "reason_description", columnDefinition = "text")
	private String reason;
}

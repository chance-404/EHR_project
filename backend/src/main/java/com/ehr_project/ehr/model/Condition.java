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
@Table(name = "staging_conditions")
@Data
public class Condition {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long internalId;

	@Column(name = "start_date")
	private LocalDate startDate;

	@Column(name = "stop_date")
	private LocalDate stopDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "patient", referencedColumnName = "id")
	private Patient patient;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "encounter", referencedColumnName = "id")
	private Encounter encounter;

	@Column(name = "description", columnDefinition = "text")
	private String description;
}

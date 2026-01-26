package com.ehr_project.ehr.model;

import java.time.LocalDateTime;

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
@Table(name = "staging_observations")
@Data
public class Observation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long internalId;

	private LocalDateTime date;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "patient", referencedColumnName = "id")
	private Patient patient;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "enconter", referencedColumnName = "id")
	private Encounter encounter;

	private String category;

	@Column(name = "description", columnDefinition = "TEXT")
	private String description;

	private String value;

	private String units;
}

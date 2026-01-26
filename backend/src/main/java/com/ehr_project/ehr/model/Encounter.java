package com.ehr_project.ehr.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "staging_encounters")
@Data
public class Encounter {

	@Id
	private UUID id;

	@Column(name = "start_time")
	private LocalDateTime startTime;

	@Column(name = "stop_time")
	private LocalDateTime stopTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "patent", referencedColumnName = "id")
	private Patient patient;

	@Column(name = "provider_id")
	private UUID providerId;

	private String description;

	@Column(name = "reason_description")
	private String reasonDescription;
}

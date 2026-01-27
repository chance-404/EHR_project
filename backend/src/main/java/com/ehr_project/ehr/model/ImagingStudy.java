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
@Table(name = "staging_imaging_studies")
@Data
public class ImagingStudy {

	@Id
	private UUID id;

	private LocalDateTime date;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "patient_id", referencedColumnName = "id")
	private Patient patient;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "encounter", referencedColumnName = "id")
	private Encounter encounter;

	@Column(name = "bodysite_description")
	private String siteOnBody;

	@Column(name = "modality_description", columnDefinition = "text")
	private String studyDescription;
}

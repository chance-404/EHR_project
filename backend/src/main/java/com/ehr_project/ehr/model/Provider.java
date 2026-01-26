package com.ehr_project.ehr.model;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "staging_providers")
@Data
public class Provider {

	@Id
	private UUID id;

	private String name;

	private String specialty;

	private String address;

	private String city;

	private String state;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
		name = "patient_provider",
		joinColumns = @JoinColumn(name = "provider_id"),
		inverseJoinColumns = @JoinColumn(name = "patient_id"
		)
	)
	private List<Patient> patients;

}
